<template>
  <div class="page-wrapper">
    <div class="title">
      <h1 v-if="currentSquad" class="squad-name">
        Squad: {{ currentSquad.game }}
      </h1>
      <p v-if="user === null" class="infos-label">Please login to join</p>
      <div
        v-if="userCanLeave(user.displayName)"
        class="delete-btn"
        @click="leaveSquad(currentSquad.id)"
      >
        Leave
      </div>
      <div
        v-if="userCanJoin(user.displayName)"
        class="accept-btn"
        @click="joinSquad(currentSquad.id)"
      >
        Join
      </div>
    </div>
    <hr />
    <h2>Players</h2>
    <h3 v-for="usr in currentSquad.users" :key="usr.id">{{ usr }}</h3>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  head() {
    return {
      title: {
        inner: "Squad"
      },
      meta: [
        {
          name: "description",
          content: `${this.appTitle} squad page`,
          id: "desc"
        }
      ]
    };
  },
  computed: {
    ...mapState("app", ["appTitle"]),
    ...mapState("authentication", ["user"]),
    ...mapState("squads", ["squads"]),
    ...mapState("squads", ["squadToCreator"]),
    currentSquad() {
      console.log(this.$route.params.id);
      return this.getSquadById(this.$route.params.id);
    },
    ...mapGetters("squads", ["getSquadById"])
  },
  methods: {
    ...mapActions("squads", ["joinSquad", "leaveSquad"]),
    userCanLeave(user) {
      return this.getSquadById(this.$route.params.id).users.indexOf(user) > -1;
    },
    userCanJoin(user) {
      return (
        this.getSquadById(this.$route.params.id).users.indexOf(user) === -1
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.squad-name {
  display: inline-block;
}

.infos-label {
  display: inline-block;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
}

.accept-btn {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid;
  display: inline-block;
  border-radius: 3px;
  margin-left: auto;
  color: $vue-color;
  border-color: $vue-color;
}

.delete-btn {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid;
  display: inline-block;
  border-radius: 3px;
  margin-left: auto;
  color: $danger-color;
  border-color: $danger-color;
}
</style>
