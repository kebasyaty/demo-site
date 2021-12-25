/*
  https://lodash.com/
  https://www.npmjs.com/package/lodash
  https://github.com/lodash/lodash

  Usage:
  this.$_.random(20)
*/

import Vue from "vue";
import VueLodash from "vue-lodash";
import isUndefined from "lodash/isUndefined";
import isNull from "lodash/isNull";
import isString from "lodash/isString";
import isInteger from "lodash/isInteger";
import isBoolean from "lodash/isBoolean";
import isArray from "lodash/isArray";
import isPlainObject from "lodash/isPlainObject";

Vue.use(VueLodash, {
  name: "$_",
  lodash: {
    isUndefined,
    isNull,
    isString,
    isInteger,
    isBoolean,
    isArray,
    isPlainObject,
  },
});
