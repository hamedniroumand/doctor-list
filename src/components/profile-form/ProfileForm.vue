<template>
  <form class="section" @submit.prevent="$emit('submit')">
    <slot name="header" />
    <div class="flex-row">
      <label class="label">Name:</label>
      <input v-model="form.name" class="input" @input="$emit('input-change', 'name')" />
    </div>
    <FormError :errors="errors.name" />
    <div class="flex-row">
      <label class="label" for="filter">Email:</label>
      <input v-model="form.email" class="input" @input="$emit('input-change', 'email')" />
    </div>
    <FormError :errors="errors.email" />
    <div class="flex-row">
      <label class="label" for="filter">Description:</label>
      <input v-model="form.description" class="input" @input="$emit('input-change', 'description')" />
    </div>
    <FormError :errors="errors.description" />
    <div class="flex-row">
      <label class="label">Specialisation:</label>
      <MultiSelectBox
        v-model="form.specializations"
        :options="specializationList"
        @change="$emit('input-change', 'specializations')"
      />
    </div>
    <FormError :errors="errors.specializations" />
    <slot name="footer" />
  </form>
</template>

<script>
import MultiSelectBox from "../ui/MultiSelectBox.vue";
import FormError from "../ui/FormError.vue";

export default {
  components: { MultiSelectBox, FormError },

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
    specializationList: {
      type: Array,
      default:() => ([
        { id: 1, title: 'Surgeon' },
        { id: 2, title: 'Radiologist' },
        { id: 3, title: 'Cardiologist' },
        { id: 4, title: 'Psychiatrist' },
        { id: 5, title: 'Dermatologist' },
      ]),
    },
    errors: {
      type: Object,
      default: () => ({}),
    }
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
