<template>
  <form class="section" @submit.prevent="$emit('submit')">
    <slot name="header" />
    <div class="flex-row">
      <label class="label">Name:</label>
      <input v-model="form.name" class="input" />
    </div>
    <div class="flex-row">
      <label class="label" for="filter">Email:</label>
      <input v-model="form.email" class="input" />
    </div>
    <div class="flex-row">
      <label class="label" for="filter">Description:</label>
      <input v-model="form.description" class="input" />
    </div>
    <div class="flex-row">
      <label class="label">Specialisation:</label>
      <input v-model="form.specializations" class="input" />
    </div>
    <slot name="footer" />
  </form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        email: "",
        description: "",
        specializations: "",
      }),
    },
  },

  computed: {
    form: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
