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
      <MultiSelectBox
        v-model="form.specializations"
        :options="specializationList"
      />
    </div>
    <slot name="footer" />
  </form>
</template>

<script>
import MultiSelectBox from "../ui/MultiSelectBox.vue";

export default {
  components: { MultiSelectBox },

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
