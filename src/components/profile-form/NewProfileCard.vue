<template>
  <ProfileForm v-model="form" class="new-profile" @submit="saveProfile">
    <template #title>
      <p class="header">Add new profile:</p>
    </template>
    <template #footer>
      <button type="submit">Add</button>
    </template>
  </ProfileForm>
</template>

<script>
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
  }),

  methods: {
    saveProfile() {
      this.$emit("save-profile", this.form);
    },
    resetForm() {
      this.form = EMPTY_FORM_TEMPLATE;
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