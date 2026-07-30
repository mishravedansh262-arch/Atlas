import type { FormEvent } from "react";

import AuthCard from "../../components/auth/AuthCard";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import FormField from "../../components/auth/FormField";
import PasswordInput from "../../components/auth/PasswordInput";

export default function Login() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Welcome back"
        subtitle="Log in to continue to your workspace."
      />

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />

        <PasswordInput id="password" label="Password" />

        <AuthSubmitButton label="Log in" />
      </form>

      <AuthFooter
        prompt="Don't have an account?"
        linkLabel="Register"
        linkTo="/register"
      />
    </AuthCard>
  );
}
