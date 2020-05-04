<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>
    <img
      alt="logo-bento"
      class="logo"
      src="@/assets/img/squad_up_logo_dark.png"
    />

    <h2>Current Squads</h2>
    <p v-if="squads === null" class="infos-label">Loading...</p>
    <p v-if="squads && !squads.length" class="infos-label">
      You don't have any squads yet
    </p>
    <div v-for="squad in squads" :key="squad.id">
      <router-link
        class="product-link"
        :to="{ name: 'squad', params: { id: squad.id } }"
      >
        {{ squad.game }}
        Creator:
        <p v-if="squadToCreator && squadToCreator[squad.id]">
          {{ squadToCreator[squad.id].displayName }}
        </p>
      </router-link>
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
