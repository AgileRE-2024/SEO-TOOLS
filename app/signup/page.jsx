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

  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredData = Object.fromEntries(formData.entries());

    const { userName, email, password, confirmPassword } = enteredData;

    // Validasi nama
    if (!userName) {
      setErrorMessage((prev) => ({
        ...prev,
        userName: "Name is required",
      }));
    } else if (userName.length < 3 || userName.length > 50) {
      setErrorMessage((prev) => ({
        ...prev,
        userName: "Name must be between 3 and 50 characters long",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, userName: "" }));
    }

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
    if (password.length < 6) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters long",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, password: "" }));
    }

    // Validasi confirm password
    if (password !== confirmPassword) {
      setErrorMessage((prev) => ({
        ...prev,
        confirm: "Passwords do not match",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, confirm: "" }));
    }

    // Cek apakah ada error
    if (
      !errorMessage.userName &&
      !errorMessage.email &&
      !errorMessage.password &&
      !errorMessage.confirm
    ) {
      console.log("Form data: ", enteredData);
      // Lakukan proses submit data (misalnya navigasi atau API call)
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
