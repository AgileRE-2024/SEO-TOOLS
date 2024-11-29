// src/lib/utils/validation.js

// Validasi email
export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format";
  }
  return "";
};

// Validasi password
export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return "";
};

// Validasi konfirmasi password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};

// Validasi form fields secara umum
export const validateFormFields = (fields, validations) => {
  const errors = {};

  for (const [field, value] of Object.entries(fields)) {
    if (validations[field]) {
      errors[field] = validations[field](value, fields.password); // Optional: gunakan tambahan password jika dibutuhkan
    }
  }

  return errors;
};
