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
        <button v-for="squad in squads" :key="squad.id" class="squad-button">
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            {{ squad.game }}
            <p v-if="squadToCreator && squadToCreator[squad.id]">
              Creator:
              {{ squadToCreator[squad.id].displayName }}
            </p>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/league_of_legends.png" alt="league_of_legends" />
        <h3>League of Legends</h3>
        <button v-for="squad in squads" :key="squad.id" class="squad-button">
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            {{ squad.game }}
            <p v-if="squadToCreator && squadToCreator[squad.id]">
              Creator:
              {{ squadToCreator[squad.id].displayName }}
            </p>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/dota.png" alt="dota" />
        <h3>DOTA 2</h3>
        <button v-for="squad in squads" :key="squad.id" class="squad-button">
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            {{ squad.game }}
            <p v-if="squadToCreator && squadToCreator[squad.id]">
              Creator:
              {{ squadToCreator[squad.id].displayName }}
            </p>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/minecraft.png" alt="minecraft" />
        <h3>Minecraft</h3>
        <button v-for="squad in squads" :key="squad.id" class="squad-button">
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            {{ squad.game }}
            <p v-if="squadToCreator && squadToCreator[squad.id]">
              Creator:
              {{ squadToCreator[squad.id].displayName }}
            </p>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/valorant.png" alt="valorant" />
        <h3>Valorant</h3>
        <button v-for="squad in squads" :key="squad.id" class="squad-button">
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            {{ squad.game }}
            <p v-if="squadToCreator && squadToCreator[squad.id]">
              Creator:
              {{ squadToCreator[squad.id].displayName }}
            </p>
          </router-link>
        </button>
      </div>
      <div class="squad-item">
        <img src="/img/fortnite.png" alt="fortnite" />
        <h3>Fortnite</h3>
        <button v-for="squad in squads" :key="squad.id" class="squad-button">
          <router-link
            class="product-link"
            :to="{ name: 'squad', params: { id: squad.id } }"
          >
            {{ squad.game }}
            <p v-if="squadToCreator && squadToCreator[squad.id]">
              Creator:
              {{ squadToCreator[squad.id].displayName }}
            </p>
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
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
  computed: {
    ...mapState("app", ["appTitle"]),
    ...mapState("squads", ["squads"]),
    ...mapState("squads", ["squadToCreator"])
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

  &:hover {
    box-shadow: 0 0 10px 0 #46bd87 inset, 0 0 10px 4px #46bd87;
  }

  box-sizing: border-box;
  appearance: none;
  background-color: #000;
  border-radius: 0.6em;
  cursor: pointer;
  display: flex;
  align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1.2em 2.8em;
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
