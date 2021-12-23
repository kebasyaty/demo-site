<template>
  <v-container fluid class="mb-6">
    <v-row class="d-flex justify-center">
      <v-col cols="auto">
        <v-card flat tile :width="1200" color="rgba(0, 0, 0, 0)" class="mt-6">
          <v-form ref="form" @submit.prevent="submit()">
            <v-card-text>
              <h4
                class="
                  text-center text-h5
                  mt-2
                  mb-4
                  blue-grey--text
                  text--lighten-4
                "
              >
                {{ title }}
              </h4>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    label="Your name"
                    name="Your name"
                    color="blue-grey lighten-4"
                    :counter="150"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="Your Email"
                    name="Your Email"
                    color="blue-grey lighten-4"
                    :counter="320"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="message"
                    :error-messages="messageErrors"
                    outlined
                    label="Message"
                    name="message"
                    color="blue-grey lighten-4"
                    :counter="600"
                    required
                    @input="$v.message.$touch()"
                    @blur="$v.message.$touch()"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="pb-4">
              <v-spacer></v-spacer>
              <v-btn color="green darken-3" type="submit"
                ><span class="blue-grey--text text--lighten-4"
                  >Submit</span
                ></v-btn
              >
              <v-btn color="red darken-4" class="ml-4" @click="clear()"
                ><span class="blue-grey--text text--lighten-4"
                  >Clear</span
                ></v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  name: "ContactForm",

  validations: {
    name: { required, maxLength: maxLength(150) },
    email: { required, maxLength: maxLength(320), email },
    message: { required, maxLength: maxLength(600) },
  },

  data() {
    return {
      title: "Contact Form",
      name: String(),
      email: String(),
      message: String(),
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 150 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.maxLength &&
        errors.push("Email must be at most 320 characters long");
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    messageErrors() {
      const errors = [];
      if (!this.$v.message.$dirty) return errors;
      !this.$v.message.maxLength &&
        errors.push("Message must be at most 600 characters long");
      !this.$v.message.required && errors.push("Message is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    //
    clear() {
      this.name = String();
      this.email = String();
      this.message = String();
      this.$v.$reset();
    },
  },
};
</script>
