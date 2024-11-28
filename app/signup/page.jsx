"use client";

import MainButton from "@/components/buttons/main-button";
import FormInput from "@/components/form/FormInput";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState({
    userName: "",
    email: "",
    password: "",
    confirm: "",
  });

  // Fungsi validasi
  const validateForm = (data) => {
    const errors = {
      userName: "",
      email: "",
      password: "",
      confirm: "",
    };

    const { userName, email, password, confirmPassword } = data;

    // Validasi nama
    if (!userName) {
      errors.userName = "Name is required";
    } else if (userName.length < 3 || userName.length > 50) {
      errors.userName = "Name must be between 3 and 50 characters long";
    }

    // Validasi email
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email format";
    }

    // Validasi password
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Validasi confirm password
    if (password !== confirmPassword) {
      errors.confirm = "Passwords do not match";
    }

    return errors;
  };

  // Fungsi submit
  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredData = Object.fromEntries(formData.entries());

    // Validasi data
    const errors = validateForm(enteredData);
    setErrorMessage(errors);

    // Jika ada error, hentikan proses
    if (Object.values(errors).some((err) => err)) return;

    // Kirim data ke API
    try {
      const { userName, email, password } = enteredData;
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Sign up successful", result);
        // Navigasi atau beri feedback ke pengguna
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          email: result.message || "Something went wrong",
        }));
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setErrorMessage((prev) => ({
        ...prev,
        email: "Failed to sign up. Please try again later.",
      }));
    }
  };

  return (
    <main className="bg-gradient-to-b from-custom-black to-neutral-800 min-h-[100svh] flex items-center justify-center">
      <form onSubmit={submit}>
        <article className="bg-transparent px-10 md:px-16 py-8 text-center flex flex-col items-center justify-center gap-[1rem] max-w-[32rem]">
          <h1 className="mx-auto w-full text-center font-bold text-2xl text-white">
            Register a new account
          </h1>

          <FormInput
            id="userName"
            name="userName"
            type="text"
            placeholder="User name"
            isError={!!errorMessage.userName}
            errorMessage={errorMessage.userName}
          />
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
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            isError={!!errorMessage.confirm}
            errorMessage={errorMessage.confirm}
          />
          <MainButton
            classes="w-full font-bold"
            layoutId="login-button"
            style={{ originY: "0px" }}
          >
            Sign Up
          </MainButton>
          <p className="text-white font-light">
            Already have an account?{" "}
            <Link href="login">
              <button className="text-custom-teal">Log in</button>
            </Link>
          </p>
        </article>
      </form>
    </main>
  );
}
