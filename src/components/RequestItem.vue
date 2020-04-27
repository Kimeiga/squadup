<template>
  <div class="request-item">
    <img
      class="user-picture"
      :src="data.senderPhoto"
    />
    <p>{{ data.senderName }}</p>
    <div
      v-if="!disableActions"
      class="accept-btn"
      @click="$emit('acceptUserRequest', data.id)"
    >
      accept
    </div>
    <div
        v-if="!disableActions"
        class="delete-btn"
        @click="$emit('deleteUserRequest', data.id)"
    >
      delete
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    disableActions: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.request-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .delete-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    dispay: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    color: $danger-color;
    border-color: $danger-color;
  }

  .accept-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    dispay: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    color: $accept-color;
    border-color: $accept-color;
  }

  .user-picture {
    max-height: 32px;
    margin-left: 1.5rem;
    border-radius: 50%;
  }

}
</style>
