export default class Validation {
  constructor(form, validationForm) {
    const _form = JSON.parse(JSON.stringify(form));
    const errors = {};
    Object.keys(validationForm).forEach(function (field) {
      for (const rule of validationForm[field]) {
        if (typeof rule !== "function")
          throw Error("The rule function is not valid.");
        const executedRule = rule(_form[field]);
        const { isValid, payload } =
          typeof executedRule === "function" ? rule()(_form[field]) : executedRule;
        if (!isValid) {
          errors[field] = {
            ...errors[field],
            [rule.name]: generateErrorMessage(rule, payload),
          };
        }
      }
    });
    return getResult(errors);
  }
}

const generateErrorMessage = (rule, payload) => {
  switch (rule.name) {
    case "required":
      return "this field is required.";
    case "email":
      return "this field should be type of email.";
    case "english":
      return "this field should have english chars only.";
    case "min":
      return `this field should contains at least ${payload} characters.`;
    case "array":
      return "this field should be an array.";
    default:
      return "this field is invalid.";
  }
};

const getResult = (errors) => {
  return {
    $isValid: !Object.keys(errors).length,
    $errors: errors,
  };
};
