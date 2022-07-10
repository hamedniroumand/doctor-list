<template>
  <LikeIcon class="rotate-180" v-bind="$props" />
</template>

<script>
import iconMixin from "../../core/mixins/iconMixin";
import LikeIcon from "./LikeIcon.vue";

export default {
  mixins: [iconMixin],
  components: { LikeIcon },
};
</script>
