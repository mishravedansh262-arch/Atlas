import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthCard from "../../components/auth/AuthCard";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import FormField from "../../components/auth/FormField";
import PasswordInput from "../../components/auth/PasswordInput";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../lib/validation/auth";
import { useAuth } from "../../hooks/useAuth";
import { extractApiError } from "../../lib/api";

export default function Register() {
  const navigate = useNavigate();
  const { register: registerAccount } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      // confirmPassword is a form-only field; the service never receives it.
      await registerAccount({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
      toast.success("Account created. Welcome to ATLAS!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const apiError = extractApiError(error);
      toast.error(apiError.message);
    }
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        subtitle="Start organizing your work with ATLAS."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          autoFocus
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          id="password"
          label="Password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <AuthSubmitButton
          label="Create account"
          loadingLabel="Creating Account..."
          isSubmitting={isSubmitting}
        />
      </form>

      <AuthFooter
        prompt="Already have an account?"
        linkLabel="Log in"
        linkTo="/login"
      />
    </AuthCard>
  );
}
