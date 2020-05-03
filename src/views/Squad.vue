<template>
  <div class="page-wrapper">
    <h1 v-if="currentSquad">Squad: {{ currentSquad }}</h1>
    {{ $route.params }}
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

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
    ...mapState("squads", ["squads"]),
    ...mapState("squads", ["squadToCreator"]),
    currentSquad() {
      console.log(this.$route.params.id);
      return this.getSquadById(this.$route.params.id);
    },
    ...mapGetters("squads", ["getSquadById"])
  }
};
</script>

<style></style>
