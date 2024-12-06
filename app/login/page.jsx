// src/components/LoginForm.js

"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

import {
  validateFormFields,
  validateEmail,
  validatePassword,
} from "@/lib/utils/validation";
import { signIn } from "next-auth/react";
import AuthForm from "@/components/auth/AuthForm";
import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredData = Object.fromEntries(formData.entries());

    // Validasi menggunakan fungsi dari validation.js
    const validations = {
      email: validateEmail,
      password: validatePassword,
    };

    const errors = validateFormFields(enteredData, validations);
    setErrorMessage(errors);

    if (Object.values(errors).some((err) => err)) return;

    setIsLoggingIn(true);
    const result = await signIn("credentials", {
      redirect: false,
      ...enteredData,
    });
    setIsLoggingIn(false);

    if (!result.ok) {
      setErrorMessage((prev) => ({
        ...prev,
        email: result.error || "Authentication failed.",
      }));
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <AuthForm
      title="Log in to your account"
      inputs={[
        {
          id: "email",
          name: "email",
          type: "email",
          placeholder: "example@example.com",
          "data-testid": "email-input",
        },
        {
          id: "password",
          name: "password",
          type: "password",
          placeholder: "••••••••",
          "data-testid": "password-input",
        },
      ]}
      errorMessage={errorMessage}
      onSubmit={submit}
      isLoading={isLoggingIn}
      buttonText="Login"
    >
      <p className="text-white font-light">
        Don't have an account?{" "}
        <Link href="/signup">
          <button className="text-custom-teal">Sign Up</button>
        </Link>
      </p>
    </AuthForm>
  );
};

export default LoginForm;
