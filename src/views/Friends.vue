<template>
  <div class="page-wrapper">
    <h1 class="friends-page-title">Friends page</h1>
    <add-friend v-if="networkOnLine"></add-friend>
    <request-list class="request-list"></request-list>
    <friend-list class="friend-list"></friend-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FriendList from "@/components/FriendList";
import AddFriend from "@/components/AddFriend";
import RequestList from "@/components/RequestList";

export default {
  components: { FriendList, AddFriend, RequestList},
  computed: mapState("app", ["networkOnLine"])
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.friends-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.friend-list {
  margin: 20px 0;
}

.request-list {
  margin: 20px 0;
}
</style>
