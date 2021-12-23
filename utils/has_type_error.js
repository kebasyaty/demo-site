/*
  Usage:
  import hasTypeError from "~/utils/has_type_error.js";
  const isDev = process.env.NODE_ENV === "development";
  if (isDev && hasTypeError(text, "string")) return;
*/

import Vue from "vue";

export default function (data, type, msg = "Invalid data type") {
  try {
    switch (type) {
      case "undefined":
        if (!Vue.$_.isUndefined(data)) throw new TypeError(msg);
        break;
      case "null":
        if (!Vue.$_.isNull(data)) throw new TypeError(msg);
        break;
      case "string":
        if (!Vue.$_.isString(data)) throw new TypeError(msg);
        break;
      case "number":
        if (!Vue.$_.isInteger(data) && !Vue.$_.isFloat(data))
          throw new TypeError(msg);
        break;
      case "boolean":
        if (!Vue.$_.isBoolean(data)) throw new TypeError(msg);
        break;
      case "array":
        if (!Vue.$_.isArray(data)) throw new TypeError(msg);
        break;
      case "object":
        if (!Vue.$_.isPlainObject(data)) throw new TypeError(msg);
        break;
    }
  } catch (err) {
    console.log(err);
    return true;
  }
  return false;
}
