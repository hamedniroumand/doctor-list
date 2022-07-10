<template>
  <div class="multi_select" v-click-outside="outsideClicked">
    <div
      class="multi_select__input input"
      @click="changeDropdownVisibility(!isDropdownOpened)"
    >
      {{ selectInputText }}
      <span class="input__arrow" :class="{'input__arrow--active': isDropdownOpened}"></span>
    </div>
    <transition name="fade">
      <div v-if="isDropdownOpened" class="multi_select__list_wrapper">
        <input
          ref="dropdownSearch"
          type="text"
          v-model.trim="dropdownSearch"
          placeholder="find item"
          class="multi_select__search"
        />
        <ul class="multi_select__list">
          <template v-if="filteredDropdownItems.length">
            <li
              v-for="option in filteredDropdownItems"
              :key="option.id"
              class="select_option"
              @click="selectOption(option.id)"
            >
              <p class="select_option__title">{{ option.title }}</p>
              <input
                type="checkbox"
                class="select_option__checkbox"
                :checked="checkOptionSelected(option.id)"
              />
            </li>
          </template>
          <li v-else class="select_option select_option--not_found">
            <p class="select_option__title">No items found</p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data: () => ({
    isDropdownOpened: false,
    dropdownSearch: "",
  }),

  computed: {
    selectInputText() {
      const isMoreThanOneSelected = this.selectedOptionsCount > 1;
      return this.selectedOptionsCount
        ? `${this.selectedOptionsCount} item${
            isMoreThanOneSelected ? "s" : ""
          } selected`
        : "Select items";
    },
    selectedOptionsCount() {
      return this.value.length;
    },
    filteredDropdownItems() {
      if (!this.dropdownSearch) {
        return this.options;
      }
      return this.options.filter((option) =>
        option.title
          .toLocaleLowerCase()
          .includes(this.dropdownSearch.toLocaleLowerCase())
      );
    },
  },

  watch: {
    isDropdownOpened(isDropdownOpened) {
      if (isDropdownOpened) {
        this.$nextTick(() => {
          this.$refs.dropdownSearch.focus();
        });
      } else {
        this.dropdownSearch = "";
      }
    },
  },

  methods: {
    checkOptionSelected(optionId) {
      return this.value.includes(optionId);
    },
    changeDropdownVisibility(status) {
      this.isDropdownOpened = status;
    },
    outsideClicked() {
      this.changeDropdownVisibility(false);
    },
    selectOption(optionId) {
      let newSelectedOptionsList;
      if (this.checkOptionSelected(optionId)) {
        newSelectedOptionsList = this.value.filter((id) => id !== optionId);
      } else {
        newSelectedOptionsList = [...this.value, optionId];
      }
      this.$emit("input", newSelectedOptionsList);
      this.$emit("change");
    },
  },
};
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
.fade-enter-to,
fade-leave {
  opacity: 1;
  transform: scaleY(1);
}
.fade-enter-active {
  transition: all 0.4s ease;
}
.fade-leave-active {
  transition: all 0.2s ease;
}

.multi_select {
  position: relative;
  width: 100%;
  background-color: white;
}
.multi_select__input {
  cursor: pointer;
  color: black;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.input__arrow {
  width: 5px;
  height: 5px;
  background: transparent;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  transform: rotate(45deg);
  transition: transform .3s;
}
.input__arrow--active {
  transform: rotate(225deg);
}
.multi_select__list_wrapper {
  transform-origin: top;
  display: flex;
  flex-direction: column;
  z-index: 10;
  border-top: 1px solid rgb(219, 219, 219);
  background-color: white;
  position: absolute;
  border-radius: 0 0 5px 5px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.multi_select__search {
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #e3e0e0;
  padding: 10px 10px;
}
.multi_select__list {
  list-style: none;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  max-height: 160px;
  height: 100%;
}
.select_option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  transition: background 0.4s;
  user-select: none;
}
.select_option--not_found {
  cursor: auto;
}
.select_option--not_found .select_option__title {
  font-size: 0.8rem;
}
.select_option:hover {
  background-color: #eee;
}
.select_option__title {
  font-size: 1rem;
  margin: 0;
}
</style>
