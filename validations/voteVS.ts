const { body } = require("express-validator");

//Cast vote has body like this voteTopic: "string", option : Array<String>
const validateCastVote = [
  body("voteTopic").isString().notEmpty().withMessage("Vote topic is required"),
  body("option").isString().notEmpty().withMessage("Option is required"),
];

const validateCreateVote = [
  body("voteTopic").isString().notEmpty().withMessage("Vote topic is required"),
  body("options").isArray().withMessage("Option should be an array"),
  body("options.*").isString().withMessage("Option should be a string"),
];

export { validateCastVote, validateCreateVote };
