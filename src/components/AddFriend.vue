<template>
  <div class="request-action-bar">
    <input
      placeholder="friend name..."
      class="request-name-input"
      type="text"
      :value="requestNameToCreate"
      @input="setRequestNameToCreate($event.target.value)"
      @keypress.enter="triggerAddRequestAction"
    />
    <div
      :class="{ disabled: requestCreationPending }"
      class="create-request-btn"
      @click="triggerAddRequestAction"
    >
      add friend
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  computed: mapState("requests", [
    "requestNameToCreate",
    "requestCreationPending"
  ]),
  methods: {
    ...mapMutations("requests", ["setRequestNameToCreate"]),
    ...mapActions("requests", ["triggerAddRequestAction"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.request-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .request-name-input {
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }

  .create-request-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    border-color: #2c3e50;

    &.disabled {
      pointer-events: none;
      background-color: #aaa;
    }

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
