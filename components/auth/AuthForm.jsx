// src/components/AuthForm.js

import MainButton from "../buttons/main-button";
import FormInput from "../form/FormInput";

const AuthForm = ({
  title,
  inputs,
  errorMessage,
  onSubmit,
  isLoading,
  buttonText,
  children,
}) => {
  return (
    <main className="bg-gradient-to-b from-custom-black to-neutral-800 min-h-[100svh] flex items-center justify-center">
      <form onSubmit={onSubmit}>
        <article className="bg-transparent px-10 md:px-16 py-8 text-center flex flex-col items-center justify-center gap-[1rem] max-w-[32rem]">
          <h1 className="mx-auto w-full text-center font-bold text-2xl text-white">
            {title}
          </h1>

          {inputs.map(({ id, ...props }) => (
            <FormInput
              key={id}
              id={id}
              isError={!!errorMessage[id]}
              errorMessage={errorMessage[id]}
              {...props}
            />
          ))}

          <MainButton
            classes="w-full font-bold"
            layoutId="auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : buttonText}
          </MainButton>

          {children}
        </article>
      </form>
    </main>
  );
};

export default AuthForm;
