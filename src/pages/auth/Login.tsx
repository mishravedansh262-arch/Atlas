import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthCard from "../../components/auth/AuthCard";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import FormField from "../../components/auth/FormField";
import PasswordInput from "../../components/auth/PasswordInput";
import { loginSchema, type LoginFormValues } from "../../lib/validation/auth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit() {
    // Simulated submission — real authentication arrives in a later milestone.
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
