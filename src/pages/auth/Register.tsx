import type { FormEvent } from "react";

import AuthCard from "../../components/auth/AuthCard";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthSubmitButton from "../../components/auth/AuthSubmitButton";
import FormField from "../../components/auth/FormField";
import PasswordInput from "../../components/auth/PasswordInput";

export default function Register() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        subtitle="Start organizing your work with ATLAS."
      />

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormField
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />

        <PasswordInput
          id="password"
          label="Password"
          autoComplete="new-password"
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          autoComplete="new-password"
        />

        <AuthSubmitButton label="Create account" />
      </form>

      <AuthFooter
        prompt="Already have an account?"
        linkLabel="Log in"
        linkTo="/login"
      />
    </AuthCard>
  );
}
