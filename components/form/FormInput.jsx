import { motion } from "framer-motion";
import { useState } from "react";
const FormInput = ({
  id,
  type = "text",
  placeholder,
  isError,
  errorMessage,
  ...props
}) => {
  const isPassword = type === "password";
  const [isHidden, setIsHidden] = useState(true);
  return (
    <motion.div
      className="w-full h-full"
      animate={isError ? { y: [0, -5, 5, -5, 5, 0] } : { y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-fit relative text-left text-white ">
        {isPassword &&
          (!isHidden ? (
            <div
              className="absolute right-4 bottom-1/2 translate-y-1/2 text-white z-20"
              onClick={() => setIsHidden(true)}
            >
              <i class="fa fa-eye"></i>
            </div>
          ) : (
            <div
              className="absolute right-4 bottom-1/2 translate-y-1/2 text-white z-20"
              onClick={() => setIsHidden(false)}
            >
              <i class="fa fa-eye-slash"></i>
            </div>
          ))}
        <input
          type={!isPassword ? type : isHidden ? type : "text"}
          name={id}
          id={id}
          placeholder={placeholder}
          className={`block w-full px-4 py-2 rounded-lg bg-transparent border border-teal-50 text-white focus:outline-none focus:border-custom-teal ${
            isError && "text-red-400 border-red-400"
          }`}
          {...props}
        />
      </div>
      {isError && (
        <p
          className="text-xs text-red-400 text-left  p-1"
          data-testid="error-message"
        >
          {errorMessage}
        </p>
      )}
    </motion.div>
  );
};

export default FormInput;
