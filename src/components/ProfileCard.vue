<template>
  <div class="profile">
    <div class="card">
      <DoctorIcon class="avatar"/>
      <div class="data">
        <div class="profile-content">
          <div>
            <strong>{{profile.name}}</strong>
            <a :href="profile.email" class="email">{{profile.email}}</a>
          </div>
          <div class="description">{{profile.description}}</div>
          <div class="description">{{ selectedSpecializationsName | arrayToStringWithComma}}</div>
        </div>
        <div class="flex items-center justify-between">
          <div class="likes">
            <span class="likes-icon">💚</span>
            <span class="likes-value">{{ profile.likes }}</span>
          </div>
          <div class="flex items-center gap-2">
            <button class="like-btn">
              <DislikeIcon size="20" />
            </button>
            <button class="like-btn">
              <LikeIcon size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="comment">
      <input
        :value="comment"
        class="comment-input"
        placeholder="Write your comment..."
        @input="$emit('update:comment', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import DoctorIcon from "./icons/DoctorIcon";
import LikeIcon from "./icons/LikeIcon.vue";
import DislikeIcon from "./icons/DislikeIcon.vue";

export default {
  name: "ProfileCard",

  components: {
    DoctorIcon,
    LikeIcon,
    DislikeIcon
},

  props: {
    profile: {
      type: Object,
      required: true
    },
    comment: {
      type: String,
      required: true,
      default: "",
    },
  },

  computed: {
    selectedSpecializationsName() {
      return this.profile.specializations.map((specialization) => specialization.title)
    }
  }
};
</script>

<style>
.card {
  display: flex;
  align-items: center;
  border: solid 1px rgb(172, 172, 172);
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  color: rgb(82, 82, 82);
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  gap: 1rem;
}

.avatar {
  width: 64px;
  min-width: 64px;
  height: 64px;
  border: 1px solid rgb(172, 172, 172);
  border-radius: 100%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22);
}

.data {
  flex: 1;
}

.profile-content {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 0.5rem;
}

.email {
  margin-left: 15px;
}

.description {
  margin-top: 5px;
}

.likes-value {
  margin-left: 5px;
}

.comment {
  display: flex;
  width: 100%;
}

.comment-input {
  width: 100%;
}
</style>
