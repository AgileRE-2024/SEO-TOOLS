"use client";

import MainButton from "@/components/buttons/main-button";
import FormInput from "@/components/form/FormInput";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredData = Object.fromEntries(formData.entries());

    const { email, password } = enteredData;

    // Validasi email
    if (!email) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "Email is required",
      }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, email: "" }));
    }

    // Validasi password
    if (!password) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else if (password.length < 6) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    }

    // Cek apakah ada error
    if (!errorMessage.email && !errorMessage.password) {
      console.log("Form data: ", enteredData);
      // Lakukan proses login (misalnya navigasi atau API call)
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
          <MainButton
            classes="w-full font-bold"
            layoutId="login-button"
            style={{ originY: "0px" }}
          >
            Login
          </MainButton>
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
