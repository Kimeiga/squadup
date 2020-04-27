<template>
  <div>
    <h2 class="requests-list-title">Pending Friend Requests</h2>
    <p v-if="requests === null" class="infos-label">Loading...</p>
    <p v-if="requests && !requests.length" class="infos-label">
      You don't have any friend requests
    </p>
    <request-item
      v-for="request in requests"
      :key="request.id"
      class="request-row"
      :disable-actions="!networkOnLine"
      :data="request"
      @deleteUserRequest="deleteUserRequest"
      @acceptUserRequest="acceptUserRequest"
    ></request-item>
  </div>
</template>

<script>
import RequestItem from "@/components/RequestItem";
import { mapState, mapActions } from "vuex";

export default {
  components: { RequestItem },
  computed: {
    ...mapState("requests", ["requests"]),
    ...mapState("app", ["networkOnLine"])
  },
  methods: mapActions("requests", ["acceptUserRequest", "deleteUserRequest"])
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.infos-label {
  text-align: center;
}

.requests-list-title {
  text-align: center;
};

.request-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
