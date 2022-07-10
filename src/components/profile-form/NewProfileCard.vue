<template>
  <ProfileForm
    v-model="form"
    :errors="errors"
    class="new-profile"
    @input-change="validateInput"
    @submit="saveProfile"
  >
    <template #header>
      <p class="header">Add new profile:</p>
    </template>
    <template #footer>
      <button type="submit">Add</button>
    </template>
  </ProfileForm>
</template>

<script>
import validation from "../../validation";
import { array, email, english, min, required } from "../../validation/rules";
import ProfileForm from "./ProfileForm.vue";

const EMPTY_FORM_TEMPLATE = {
  name: "",
  email: "",
  description: "",
  specializations: [],
};

export default {
  components: { ProfileForm },

  data: () => ({
    form: { ...EMPTY_FORM_TEMPLATE },
    errors: {},
  }),

  methods: {
    validateInput(inputName) {
      const { $errors } = this.validateForm(inputName);
      this.errors[inputName] = $errors[inputName];
    },
    validateForm(input) {
      const allFormRules = {
        name: [required, english, min(3)],
        email: [required, email],
        description: [required, min(5)],
        specializations: [required, array],
      };
      const rulesToValidate = input ? { [input]: allFormRules[input] } : allFormRules;
      return new validation(this.form, rulesToValidate);
    },
    saveProfile() {
      const { $isValid, $errors } = this.validateForm();
      if ($isValid) {
        const { name, email,description, specializations } = this.form;
        this.$emit("save-profile", {
          name,
          email,
          description,
          specializationIds: specializations,
        });
      } else {
        this.errors = $errors;
      }
    },
    resetForm() {
      this.form = { ...EMPTY_FORM_TEMPLATE };
    },
  },
};
</script>

<style scoped>
.new-profile {
  position: sticky;
  top: 1rem;
}
</style>
