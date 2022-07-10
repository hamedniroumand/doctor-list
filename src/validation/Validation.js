export default class Validation {
  constructor(form, ValidationForm) {
    const _form = JSON.parse(JSON.stringify(form));
    const errors = {};
    Object.keys(ValidationForm).forEach(function (field) {
      for (const rule of ValidationForm[field]) {
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
  if (rule.name === "required") return "this field is required.";
  if (rule.name === "email") return "this field should be type of email.";
  if (rule.name === "english")
    return "this field should have english chars only.";
  if (rule.name === "min")
    return `this field should contains at least ${payload} characters.`;
  if (rule.name === "array") return "this field should be an array.";
  return "this field is invalid.";
};

const getResult = (errors) => {
  return {
    $isValid: !Object.keys(errors).length,
    $errors: errors,
  };
};
