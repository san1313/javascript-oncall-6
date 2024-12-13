const InputValidator = {
  validateDate(input) {
    const regex = /^[0-9]{1,2},[월화수목금토일]$/;
    return input.match(regex);
  },
  validateEmployeeName(input) {
    const regex = /^[a-zA-Z가-힣0-9,]+$/;
    return input.match(regex);
  },
};

export default InputValidator;
