const validateEmail = (value: string) => {
  if (!value) {
    return "Email is required";
  }

  const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(value)) {
    return "Please enter a valid email address!";
  }

  return true;
};

export default validateEmail;
