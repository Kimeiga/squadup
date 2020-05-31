<template>
  <div class="page-half-wrap">
    <h1 class="profile-page-title">Profile Page</h1>
    <div class="entry">
      <h3>Steam ID:</h3>
      <input
        type="text"
        :value="user.steamId"
        @input="setSteam($event.target.value)"
      />
    </div>
    <div class="entry">
      <h3>Riot ID:</h3>
      <input
        type="text"
        :value="user.riotId"
        @input="setRiot($event.target.value)"
      />
    </div>
    <div class="entry">
      <h3>Dota 2 username:</h3>
      <input
        type="text"
        :value="user.dotaId"
        @input="setDota($event.target.value)"
      />
    </div>
    <div class="entry">
      <h3>Mojang/Microsoft ID:</h3>
      <input
        type="text"
        :value="user.mojangId"
        @input="setMojang($event.target.value)"
      />
    </div>
    <div class="entry">
      <h3>Epic Games username:</h3>
      <input
        type="text"
        :value="user.epicId"
        @input="setEpic($event.target.value)"
      />
    </div>
    <div
      class="accept-btn"
      @click="saveIds"
    >
      save
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: mapState("authentication", ["user"]),
  methods: {
    ...mapMutations("authentication", ["setSteam", "setRiot", "setDota", "setMojang", "setEpic"]),
    ...mapActions("authentication", ["saveIds"])
  }
}
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.page-half-wrap {
  width: 50%;
  margin: auto;
}

h1 {
  text-align: center;
}

.accept-btn {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid;
  display: inline-block;
  border-radius: 3px;
  margin-top: 20px;
  color: $accept-color;
  border-color: $accept-color;
}

.accept-btn:active {
  background-color: $accept-color;
  color: #ffffff;
}

input {
  padding-left: 5px;
  height: 30px;
  outline: none;
  font: inherit;
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
  margin: auto;
  margin-bottom: 10px;
  display: inline-block;
  float: right;
}

h3 {
  display: inline-block;
  padding: 10px;
}

</style>
