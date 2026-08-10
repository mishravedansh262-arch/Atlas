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
import { loginSchema, type LoginFormValues } from "../../lib/validation/auth";
import { useAuth } from "../../hooks/useAuth";
import { extractApiError } from "../../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await login(values);
      toast.success("Welcome back!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const apiError = extractApiError(error);
      toast.error(apiError.message);
    }
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back"
        subtitle="Log in to continue to your workspace."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          autoFocus
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          id="password"
          label="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <AuthSubmitButton
          label="Log in"
          loadingLabel="Signing In..."
          isSubmitting={isSubmitting}
        />
      </form>

      <AuthFooter
        prompt="Don't have an account?"
        linkLabel="Register"
        linkTo="/register"
      />
    </AuthCard>
  );
}
