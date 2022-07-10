export const arrayToStringWithComma = (Vue) => {
  Vue.filter("arrayToStringWithComma", (value) => {
    if (!value) return "";
    return Array.isArray(value) ? value.join(", ") : value;
  });
};
