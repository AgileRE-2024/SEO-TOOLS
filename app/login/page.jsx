"use client";

import { useRouter } from "nextjs-toploader/app";
import MainButton from "@/components/buttons/main-button";
import FormInput from "@/components/form/FormInput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Initialize useRouter

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredData = Object.fromEntries(formData.entries());

    const { email, password } = enteredData;

    // Validasi email dan password di frontend
    let hasError = false;
    if (!email) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
      hasError = true;
    } else {
      setErrorMessage((prev) => ({ ...prev, email: "" }));
    }

    if (!password) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password is required",
      }));
      hasError = true;
    } else if (password.length < 6) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
      hasError = true;
    } else {
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    }

    if (hasError) return;
    setIsLoggingIn(true);
    // Kirim data ke backend melalui signIn
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setIsLoggingIn(false);
    if (!result.ok) {
      // Tangkap error dari backend dan update state errorMessage
      if (result.error === "User with this email does not exist.") {
        setErrorMessage((prev) => ({
          ...prev,
          email: "User with this email does not exist.",
        }));
      } else if (result.error === "Invalid password.") {
        setErrorMessage((prev) => ({
          ...prev,
          password: "Invalid password.",
        }));
      } else {
        setErrorMessage((prev) => ({
          email: "",
          password: "Authentication failed. Please try again.",
        }));
      }
    } else {
      // Redirect to /dashboard on successful login
      router.push("/dashboard");
    }
  };

  return (
    <main className="bg-gradient-to-b from-custom-black to-neutral-800 min-h-[100svh] flex items-center justify-center">
      <form onSubmit={submit}>
        <article className="bg-transparent px-10 md:px-16 py-8 text-center flex flex-col items-center justify-center gap-[1rem] max-w-[32rem]">
          <h1 className="mx-auto w-full text-center font-bold text-2xl text-white">
            Log in to your account
          </h1>

          <FormInput
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            isError={!!errorMessage.email}
            errorMessage={errorMessage.email}
          />
          <FormInput
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            isError={!!errorMessage.password}
            errorMessage={errorMessage.password}
          />
          {isLoggingIn ? (
            <MainButton
              classes="w-full font-normal opacity-50"
              layoutId="login-button"
              style={{ originY: "0px" }}
              disabled
            >
              Loading...
            </MainButton>
          ) : (
            <MainButton
              classes="w-full font-bold"
              layoutId="login-button"
              style={{ originY: "0px" }}
            >
              Login
            </MainButton>
          )}
          <p className="text-white font-light">
            Don't have an account?{" "}
            <Link href="signup">
              <button className="text-custom-teal">Sign Up</button>
            </Link>
          </p>
        </article>
      </form>
    </main>
  );
}
