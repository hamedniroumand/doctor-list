<template>
  <div class="section">
    <p class="header">Profiles List:</p>
    <div class="flex-row">
      <label class="label" for="filter">Find profile:</label>
      <input v-model="search" class="input" />
    </div>
    <div v-if="filteredProfiles.length" class="buttons">
      <button :class="{ 'active': checkSortState('asc') }" @click="sortAsc">▲</button>
      <button :class="{ 'active': checkSortState('desc') }" @click="sortDesc">▼</button>
    </div>

    <transition-group name="slide-up">
      <ProfileCard
        v-for="(profile, index) in filteredProfiles"
        :key="index"
        :profile="profile"
        :comment.sync="comments[profile.id]"
        class="profile"
      />
    </transition-group>

    <div class="icons-note">
      Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  </div>
</template>

<script>
import { SORT_STATES } from '../core/constants';
import ProfileService from "../services/ProfileService";
import ProfileCard from "./ProfileCard.vue";

export default {
  components: { ProfileCard },

  data() {
    return {
      search: "",
      profiles: ProfileService.all(),
      comments: {},
      sortState: null,
    };
  },

  computed: {
    filteredProfiles() {
      if (this.search) {
        return this.profiles.filter((profile) =>
          profile.name
            .toLocaleLowerCase()
            .includes(this.search.toLocaleLowerCase())
        );
      }
      return this.profiles;
    },
  },

  methods: {
    checkSortState(state) {
      return state === this.sortState;
    },
    sortAsc() {
      ProfileService.sort(SORT_STATES.ASC);
      this.sortState = ProfileService._currentSortState;
    },
    sortDesc() {
      ProfileService.sort(SORT_STATES.DESC);
      this.sortState = ProfileService._currentSortState;
    },
  },
};
</script>

<style scoped>
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.slide-up-enter-to, slide-up-leave {
  transform: translateX(0);
  opacity: 1;
}
.slide-up-enter-active, .slide-up-leave-active {
  transition: all .3s ease;
}
</style>