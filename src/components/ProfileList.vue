<template>
  <div class="section">
    <div class="flex-row">
      <label class="label" for="filter">Find profile:</label>
      <input v-model="search" class="input" />
    </div>
    <div v-if="filteredProfiles.length" class="buttons">
      <button @click="sortAsc">▲</button>
      <button @click="sortDesc">▼</button>
    </div>

    <ProfileCard
      v-for="(profile, index) in filteredProfiles"
      :key="index"
      :profile="profile"
      :comment.sync="comments[profile.id]"
      class="profile"
    />

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
import ProfileService from "../core/services/ProfileService";
import ProfileCard from "./ProfileCard.vue";
export default {
  components: { ProfileCard },

  data() {
    return {
      search: "",
      profiles: ProfileService.all(),
      comments: {},
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
    sortAsc() {
      this.profiles.sort(function (a, b) {
        return a.likes - b.likes;
      });
    },

    sortDesc() {
      this.profiles.sort(function (a, b) {
        return b.likes - a.likes;
      });
    },
  },
};
</script>
