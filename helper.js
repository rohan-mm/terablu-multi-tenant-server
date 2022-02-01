module.exports.testCondition = (value1, value2, operator) => {
  switch (operator) {
    case ">=":
      return value1 >= value2;

    case "<=":
      return value1 <= value2;

    case "<":
      return value1 < value2;

    case ">":
      return value1 > value2;

    case "=":
      return value1 == value2;

    default:
      return false;
  }
};
