export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const validatePassword = (password) => {
  const passwordPattern = /^(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordPattern.test(password);
};
