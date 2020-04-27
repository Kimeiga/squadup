<template>
  <div class="friend-item">
    <img
      class="user-picture"
      :src="data.friendPhoto"
    />
    <p>{{ data.friendName }}</p>
    <div
      v-if="!disableActions"
      class="delete-btn"
      @click="$emit('deleteUserFriend', data.id)"
    >
      delete
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    isFriendDeletionPending: Boolean,
    disableActions: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .friend-link {
    color: $vue-color;
  }

  .delete-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    color: $danger-color;
    border-color: $danger-color;
  }

  .user-picture {
    max-height: 32px;
    margin-left: 1.5rem;
    border-radius: 50%;
  }
}
</style>
