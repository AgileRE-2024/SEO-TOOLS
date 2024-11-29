// src/components/SignUpForm.js
"use client"

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import {
  validateFormFields,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/utils/validation";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

const SignUpForm = () => {
  const router = useRouter();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    userName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredData = Object.fromEntries(formData.entries());

    // Validasi menggunakan fungsi dari validation.js
    const validations = {
      userName: (name) => (!name ? "Name is required" : ""),
      email: validateEmail,
      password: validatePassword,
      confirmPassword: (confirm) =>
        validateConfirmPassword(enteredData.password, confirm),
    };

    const errors = validateFormFields(enteredData, validations);
    setErrorMessage(errors);

    if (Object.values(errors).some((err) => err)) return;

    setIsSigningUp(true);
    try {
      const { userName, email, password } = enteredData;
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password }),
      });

      const result = await response.json();
      setIsSigningUp(false);

      if (response.ok) {
        router.push("/login");
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          email: result.message || "Something went wrong.",
        }));
      }
    } catch (error) {
      setIsSigningUp(false);
      setErrorMessage((prev) => ({
        ...prev,
        email: "Failed to sign up. Please try again later.",
      }));
    }
  };

  return (
    <AuthForm
      title="Register a new account"
      inputs={[
        {
          id: "userName",
          name: "userName",
          type: "text",
          placeholder: "User name",
        },
        {
          id: "email",
          name: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        {
          id: "password",
          name: "password",
          type: "password",
          placeholder: "••••••••",
        },
        {
          id: "confirmPassword",
          name: "confirmPassword",
          type: "password",
          placeholder: "••••••••",
        },
      ]}
      errorMessage={errorMessage}
      onSubmit={submit}
      isLoading={isSigningUp}
      buttonText="Sign Up"
    >
      <p className="text-white font-light">
        Already have an account?{" "}
        <Link href="/login">
          <button className="text-custom-teal">Log in</button>
        </Link>
      </p>
    </AuthForm>
  );
};

export default SignUpForm;
