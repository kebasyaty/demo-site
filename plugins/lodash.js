/*
  https://lodash.com/
  https://www.npmjs.com/package/lodash
  https://github.com/lodash/lodash

  Usage:
  this.$_.random(20)
*/

import Vue from "vue";
import VueLodash from "vue-lodash";
import lodash from "lodash";

Vue.use(VueLodash, { name: "$_", lodash });
