<template>
  <div class="page-wrapper">
    <h1 v-if="currentSquad">Squad: {{ currentSquad }}</h1>
    {{ $route.params }}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
      return this.getSquadById(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions({ getSquadById: "squads/getSquadById" })
  }
};
</script>

<style></style>
