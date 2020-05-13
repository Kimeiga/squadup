<template>
  <div class="add-squad-form" v-if="creatingSquad">
    <p>Select your game:
      <select 
        :value="squadGameToCreate"
        @input="setSquadGameToCreate($event.target.value)"
      >
        <option disabled value="">Please select one</option>
        <option>Counter-Strike</option>
        <option>League of Legends</option> 
        <option>DOTA 2</option> 
        <option>Minecraft</option> 
        <option>Valorant</option> 
        <option>Fortnite</option> 
      </select>
    </p>
    <div>
    <p class="helper-text" v-if="squadGameToCreate === 'Valorant' || squadGameToCreate === 'League of Legends'">Enter your RiotID:</p>
    <p class="helper-text" v-if="squadGameToCreate === 'Fortnite'">Enter your Epic Games username:</p>
    <p class="helper-text" v-if="squadGameToCreate === 'DOTA 2'">Enter your DOTA 2 username:</p>
    <p class="helper-text" v-if="squadGameToCreate === 'Counter-Strike'">Enter your Steam username:</p>
    <p class="helper-text" v-if="squadGameToCreate === 'Minecraft'">Enter your Mojaang ID:</p>
    <input
      v-if="squadGameToCreate != ''"
      type="text"
      class="squad-user-input"
      :value="squadUserToCreate"
      @input="setSquadUserToCreate($event.target.value)"
    />
    </div>
    <button 
      class="squad-button"
      v-if="squadUserToCreate != ''"
      @click="newSquad"
    >
      Squad Up!
    </button>
    <button
      class="delete-btn"
      @click="clearSquadCreating"
    >
      Cancel
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: mapState("squads", [
    "squadGameToCreate",
    "squadUserToCreate",
    "creatingSquad"
  ]),
  methods: {
    ...mapMutations("squads", ["setSquadUserToCreate", "setSquadGameToCreate"]),
    ...mapActions("squads", ["newSquad", "clearSquadCreating"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";
.squad-user-input {
  padding-left: 5px;
  height: 30px;
  width: 100%;
  outline: none;
  font: inherit;
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
}

select {
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
  padding: 5px;
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
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
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

.add-squad-form {
  width: 50%;
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
  padding: 20px;
}

.delete-btn {
  display: flex;
  align-self: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid;
  border-radius: 3px;
  color: $danger-color;
  border-color: $danger-color;
}

</style>
