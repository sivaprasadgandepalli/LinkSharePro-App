export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  const minLengthRegex = /^.{8,}$/;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!minLengthRegex.test(password)) {
    return { valid: false, message: "Password must be at least 8 characters long." };
  }


  if (!hasUpperCase) {
    return { valid: false, message: "Password must contain at least one uppercase letter." };
  }
  if (!hasLowerCase) {
    return { valid: false, message: "Password must contain at least one lowercase letter." };
  }
  if (!hasNumber) {
    return { valid: false, message: "Password must contain at least one number." };
  }
  if (!hasSpecialChar) {
    return { valid: false, message: "Password must contain at least one special character." };
  }

  return { valid: true, message: "Password is strong." };
}

export const validateURL = (url) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');
  return !!urlPattern.test(url);
};

