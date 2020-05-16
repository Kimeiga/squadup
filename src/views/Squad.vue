<template>
  <div class="page-wrapper">
    <div class="title">
      <h1 v-if="currentSquad" class="squad-name">
        Squad: {{ currentSquad.game }}
      </h1>
      <div
        v-if="user === null && notFull()"
        class="add-user-by-name"
      >
        <input
          type="text"
          class="squad-user-input"
          :placeholder=idName
          :value="squadUserToCreate"
          @input="setSquadUserToCreate($event.target.value)"
        />
        <div
          class="accept-btn"
          @click="join(currentSquad.id)"
        >
          Join
        </div>
      </div>
      <div
        v-if="user && userCanLeave(user.displayName)"
        class="delete-btn"
        @click="leaveSquad(currentSquad.id)"
      >
        Leave
      </div>
      <div
        v-if="user && userCanJoin(user.displayName) && notFull()"
        class="accept-btn"
        @click="joinSquad(currentSquad.id)"
      >
        Join
      </div>
      <div 
        v-if="!notFull() && !(user && userCanLeave(user.displayName))" 
        class="full"
      >
        Squad Full
      </div>
    </div>
    <hr />
    <h2>Players</h2>
    <h3 v-for="usr in currentSquad.users" :key="usr.id">{{ usr }}</h3>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

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
  methods: {
    ...mapActions("squads", ["joinSquad", "leaveSquad", "join"]),
    ...mapMutations("squads", ["setSquadUserToCreate"]),
    userCanLeave(user) {
      return (this.currentSquad.users.indexOf(user) > -1);
    },
    userCanJoin(user) {
      return (this.currentSquad.users.indexOf(user) === -1);
    },
    notFull() {
      if(this.currentSquad.game === "Valorant") return this.currentSquad.users.length < 5;
      if(this.currentSquad.game === "League of Legends") return this.currentSquad.users.length < 5;
      if(this.currentSquad.game === "DOTA 2") return this.currentSquad.users.length < 5;
      if(this.currentSquad.game === "Fortnite") return this.currentSquad.users.length < 4;
      if(this.currentSquad.game === "Counter-Strike") return this.currentSquad.users.length < 5;
      if(this.currentSquad.game === "Minecraft") return true;
      return this.currrentSquad.users.length < 5;
    }
  },
  created() {
    this.$store.dispatch("squads/clearCurrentSquad");
    this.$store.dispatch("squads/getCurrentSquad", this.$route.params.id);
  },
  computed: {
    ...mapState("app", ["appTitle"]),
    ...mapState("authentication", ["user"]),
    ...mapState("squads", ["squads", "currentSquad", "squadUserToCreate"]),
    ...mapGetters("squads", ["getSquadById"]),
    idName() {
      if(this.currentSquad.game === "Valorant") return "Riot ID";
      if(this.currentSquad.game === "League of Legends") return "Riot ID";
      if(this.currentSquad.game === "DOTA 2") return "Dota Username";
      if(this.currentSquad.game === "Fortnite") return "Epic Games Username";
      if(this.currentSquad.game === "Counter-Strike") return "Steam Username";
      if(this.currentSquad.game === "Minecraft") return "Mojang ID";
      return "Game Username"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.squad-user-input {
  padding: 5px 10px;
  width: 50%;
  outline: none;
  font: inherit;
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
  display: inline;
  margin-right: 20px;
}

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

.add-user-by-name {
  display: inline-block;
}

.full {
  color: #fff;
  background-color: $vue-color;
  border-radius: 3px;
  padding: 5px;
}
</style>
