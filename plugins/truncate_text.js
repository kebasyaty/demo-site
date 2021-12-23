/*
  Usage:
  {{ bike.title | truncate(20) }}
*/

import Vue from "vue";

export default () => {
  Vue.filter("truncate", function (text, length, suffix) {
    suffix = suffix || "...";
    if (text.length > length) {
      return text.substring(0, length) + suffix;
    } else {
      return text;
    }
  });
};
