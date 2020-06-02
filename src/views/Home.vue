gcam<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>
    <img
      alt="logo-bento"
      class="logo"
      src="@/assets/img/squad_up_logo_dark.png"
    />
    <p>
      Welcome to <strong>Squad Up</strong>, a site designed to give gamers the
      ability to form squads and meet friends.
    </p>
    <p>Click a squad below to join and meet gamers.</p>
    <p>Log in to connect with your squad and autofill usernames.</p>

    <h2>Current Squads</h2>

    <br />

    <p v-if="squads === null" class="infos-label">Loading...</p>
    <p v-if="squads && !squads.length" class="infos-label">
      You don't have any squads yet
    </p>

    <!-- Squad Grid -->
    <div class="squad-container">
      <div class="squad-item">
        <img src="/img/csgo.png" alt="csgo" />
        <h3>CS:GO</h3>
        <button
          v-for="squad in csgoSquads"
          :key="squad.id"
          class="squad-button"
        >
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            <div v-if="squad.time != NaN" class="date-info right-border">
              <p>{{ squad.day }} <br>
              {{ squad.hour }}</p>
            </div>
            <div class="fill-info">
            {{ squad.users.length }}/5
            </div>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/league_of_legends.png" alt="league_of_legends" />
        <h3>League of Legends</h3>
        <button
          v-for="squad in leagueOfLegendsSquads"
          :key="squad.id"
          class="squad-button"
        >
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            <div v-if="squad.time != NaN" class="date-info right-border">
              <p>{{ squad.day }} <br>
              {{ squad.hour }}</p>
            </div>
            <div class="fill-info">
            {{ squad.users.length }}/5
            </div>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/dota.png" alt="dota" />
        <h3>DOTA 2</h3>
        <button
          v-for="squad in dotaSquads"
          :key="squad.id"
          class="squad-button"
        >
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            <div v-if="squad.time != NaN" class="date-info right-border">
              <p>{{ squad.day }} <br>
              {{ squad.hour }}</p>
            </div>
            <div class="fill-info">
            {{ squad.users.length }}/5
            </div>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/minecraft.png" alt="minecraft" />
        <h3>Minecraft</h3>
        <button
          v-for="squad in minecraftSquads"
          :key="squad.id"
          class="squad-button"
        >
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            <div v-if="squad.time != NaN" class="date-info">
              <p>{{ squad.day }} <br>
              {{ squad.hour }}</p>
            </div>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/valorant.png" alt="valorant" />
        <h3>Valorant</h3>
        <button
          v-for="squad in valorantSquads"
          :key="squad.id"
          class="squad-button"
        >
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            <div v-if="squad.time != NaN" class="date-info right-border">
              <p>{{ squad.day }} <br>
              {{ squad.hour }}</p>
            </div>
            <div class="fill-info">
            {{ squad.users.length }}/5
            </div>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/fortnite.png" alt="fortnite" />
        <h3>Fortnite</h3>
        <button
          v-for="squad in fortniteSquads"
          :key="squad.id"
          class="squad-button"
        >
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            <div v-if="squad.time != NaN" class="date-info right-border">
              <p>{{ squad.day }} <br>
              {{ squad.hour }}</p>
            </div>
            <div class="fill-info">
            {{ squad.users.length }}/4
            </div>
          </router-link>
        </button>
      </div>
    </div>

    <br />

    <h3 v-if="creatingSquad === false" >Wanna start your own squad?</h3>
    <button
      v-if="creatingSquad === false" 
      class="squad-button"
      @click="setSquadCreating(true)"
    >
      Create Squad
    </button>
    <create-squad></create-squad>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import CreateSquad from "@/components/CreateSquad";

export default {
  components: { CreateSquad },
  head() {
    return {
      title: {
        inner: "Home"
      },
      meta: [
        {
          name: "description",
          content: `${this.appTitle} home page`,
          id: "desc"
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("squads/getSquads");
  },
  computed: {
    ...mapState("app", ["appTitle"]),
    ...mapState("squads", ["squads", "creatingSquad"]),
    csgoSquads() {
      return this.squads.filter(squad => squad.game === "Counter-Strike");
    },
    valorantSquads() {
      return this.squads.filter(squad => squad.game === "Valorant");
    },
    minecraftSquads() {
      return this.squads.filter(squad => squad.game === "Minecraft");
    },
    dotaSquads() {
      return this.squads.filter(squad => squad.game === "DOTA 2");
    },
    fortniteSquads() {
      return this.squads.filter(squad => squad.game === "Fortnite");
    },
    leagueOfLegendsSquads() {
      return this.squads.filter(squad => squad.game === "League of Legends");
    }
  },
  methods: {
    ...mapMutations("squads", ["setSquadCreating"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.squad-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr [col-start]);
  width: 100%;
}

.squad-item {
  display: flex;
  flex-direction: column;
  align-items: center;

  // p {
  //   font-weight: bold;
  //   font-size: 1.4rem;
  // }
}

.squad-button {
  border-color: #46bd87;
  color: #fff;
  box-shadow: 0 0 40px 40px #46bd87 inset, 0 0 0 0 #46bd87;
  transition: all 150ms ease-in-out;

  .date-info {
    float: left;
    padding-right: 10px;
    justify-content: center;
    
    p {
      font-weight: 500;
    }
  }

  .right-border {
    border-right: 1px solid white;
  }

  .fill-info {
    padding-left: 10px;
    justify-content: center;
  }

  &:hover {
    box-shadow: 0 0 10px 0 #46bd87 inset, 0 0 10px 4px #46bd87;
  }
  
  a {
    display: flex;
    align-items: center;
  }

  box-sizing: border-box;
  appearance: none;
  background-color: #000;
  border-radius: 0.6em;
  cursor: pointer;
  display: flex;
  align-self: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1.2em 1.2em;
  /*padding: 1.2em 2.8em;*/
  text-decoration: none;
  text-align: center;
  font-weight: 700;

  &:hover,
  &:focus {
    color: #fff;
    outline: 0;
  }
}

.squad-button a {
  color: #fff !important;
}
.squad-button p {
  margin: 0;
  font-weight: 300;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: 3rem;
    height: 100px;
  }

  .home-page-title {
    text-align: center;
  }

  .documentation-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #5d6788;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
  }
}
</style>
