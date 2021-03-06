<template>
  <div class="page-wrapper">
    <div class="title">
      <h1 v-if="currentSquad" class="squad-name">
        Squad: {{ currentSquad.game }}
      </h1>
      <div v-if="notFull() && (!user || userCanJoin(user.id))" class="add-user-by-name">
        <input
          type="text"
          class="squad-user-input"
          :placeholder="idName"
          :value="squadUserToCreate"
          @input="setSquadUserToCreate($event.target.value)"
        />
        <div class="accept-btn" @click="join(currentSquad.id)">Join</div>
      </div>
      <div
        v-if="user && userCanLeave(user.id)"
        class="delete-btn"
        @click="leaveSquad(currentSquad.id)"
      >
        Leave
      </div>
      <div
        v-if="!notFull() && !(user && userCanLeave(user.id))"
        class="full"
      >
        Squad Full
      </div>
    </div>
    <h3>{{ currentSquad.day }} {{ currentSquad.hour }}</h3>
    <p v-if="currentSquad.message">{{ currentSquad.message }}</p>
    <hr />
    <h2>Players</h2>
    <div v-for="usr in currentSquad.users" :key="usr.id" class="user-entry">
      <h3 v-if="usr.name === undefined" class="no-account">{{ usr }}</h3>
      <img
        v-if="usr.photo"
        class="user-picture"
        :src="usr.photo"
      />
      <h3 v-if="usr.name" class="name">{{ usr.name }}</h3>
      <h3 v-if="usr.userid" class="userid">{{ usr.userid }}</h3>
      <div
        v-if="usr.id && user && user.id != usr.id && !isFriend(usr.id)"
        class="accept-btn"
        @click="sendUserRequest(usr.id)"
      >
        add friend
      </div>
    </div>
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
    ...mapActions("requests", ["sendUserRequest"]),
    ...mapMutations("squads", ["setSquadUserToCreate"]),
    userCanLeave(user) {
      let joined = false;
      this.currentSquad.users.forEach(e => {
        if(e.id === user) joined = true;
      });
      return joined;
    },
    userCanJoin(user) {
      let joined = false;
      this.currentSquad.users.forEach(e => {
        if(e.id === user) joined = true;
      });
      return !joined;
    },
    notFull() {
      if (this.currentSquad.game === "Valorant")
        return this.currentSquad.users.length < 5;
      if (this.currentSquad.game === "League of Legends")
        return this.currentSquad.users.length < 5;
      if (this.currentSquad.game === "DOTA 2")
        return this.currentSquad.users.length < 5;
      if (this.currentSquad.game === "Fortnite")
        return this.currentSquad.users.length < 4;
      if (this.currentSquad.game === "Counter-Strike")
        return this.currentSquad.users.length < 5;
      if (this.currentSquad.game === "Minecraft") return true;
      return this.currrentSquad.users.length < 5;
    },
    isFriend(uid) {
      if(!this.user) return true;
      let friend = false;
      console.log(this.user);
      this.friends.forEach(e => {
        if(e.friendId === uid) friend = true;
      });
      return friend;
    }
  },
  created() {
    this.$store.dispatch("squads/clearCurrentSquad");
    this.$store.dispatch("squads/getCurrentSquad", this.$route.params.id);
  },
  computed: {
    ...mapState("app", ["appTitle"]),
    ...mapState("friends", ["friends"]),
    ...mapState("authentication", ["user"]),
    ...mapState("squads", ["squads", "currentSquad", "squadUserToCreate"]),
    ...mapGetters("squads", ["getSquadById"]),
    idName() {
      if (this.currentSquad.game === "Valorant") return "Riot ID";
      if (this.currentSquad.game === "League of Legends") return "Riot ID";
      if (this.currentSquad.game === "DOTA 2") return "Dota Username";
      if (this.currentSquad.game === "Fortnite") return "Epic Games Username";
      if (this.currentSquad.game === "Counter-Strike") return "Steam Username";
      if (this.currentSquad.game === "Minecraft") return "Mojang ID";
      return "Game Username";
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

.user-entry {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .no-account {
    margin-left: 52px;
  }

  .user-picture {
    max-height: 32px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 20px;
  }
  
  .name {
    display: inline-block;
  }
  
  .userid {
    margin-left: 10px;
    font-weight: 300;
    display: inline-block;
  }

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
