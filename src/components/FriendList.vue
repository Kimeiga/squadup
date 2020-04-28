<template>
  <div>
    <h2 class="friend-list-title">Friends List</h2>
    <p v-if="friends === null" class="infos-label">Loading...</p>
    <p v-if="friends && !friends.length" class="infos-label">
      You don't have any friends yet
    </p>
    <friend-item
      v-for="friend in friends"
      :key="friend.friendId"
      class="friend-row"
      :is-friend-deletion-pending="isFriendDeletionPending(friend.friendId)"
      :disable-actions="!networkOnLine"
      :data="friend"
      @deleteUserFriend="deleteUserFriend"
    ></friend-item>
  </div>
</template>

<script>
import FriendItem from "@/components/FriendItem";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: { FriendItem },
  computed: {
    ...mapGetters("friends", ["isFriendDeletionPending"]),
    ...mapState("friends", ["friends"]),
    ...mapState("app", ["networkOnLine"])
  },
  methods: mapActions("friends", ["deleteUserFriend"])
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.infos-label {
  text-align: center;
}

.friend-list-title {
  text-align: center;
}

.friend-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
