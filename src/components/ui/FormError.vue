<template>
  <transition name="slide">
    <ul v-if="errorMessages.length" class="error-container">
      <li v-for="(message, index) in errorMessages" :key="index" class="error">
        {{ message }}
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    errorMessages() {
      return Object.values(this.errors);
    },
  },
};
</script>

<style>
.slide-enter, .slide-leave-to {
  transform: scaleY(0);
}
.slide-enter-to, slide-leave {
  transform: scaleY(1);
}
.slide-enter-active {
  transform-origin: top;
  transition: transform .15s;
}
.slide-leave-active {
  transform-origin: top;
  transition: transform .2s;
}

.error-container {
  padding: 0.5rem;
  text-align: left;
  background-color: #10070757;
  list-style: none;
}
.error {
  font-size: 0.8rem;
  color: #f04747;
}
</style>
