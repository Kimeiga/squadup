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
    <p class="helper-text" v-if="!isUserLoggedIn && squadGameToCreate === 'Valorant' || squadGameToCreate === 'League of Legends'">Enter your RiotID:</p>
    <p class="helper-text" v-if="!isUserLoggedIn && squadGameToCreate === 'Fortnite'">Enter your Epic Games username:</p>
    <p class="helper-text" v-if="!isUserLoggedIn && squadGameToCreate === 'DOTA 2'">Enter your DOTA 2 username:</p>
    <p class="helper-text" v-if="!isUserLoggedIn && squadGameToCreate === 'Counter-Strike'">Enter your Steam username:</p>
    <p class="helper-text" v-if="!isUserLoggedIn && squadGameToCreate === 'Minecraft'">Enter your Mojang ID:</p>
    <input
      v-if="!isUserLoggedIn && squadGameToCreate != ''"
      type="text"
      class="squad-user-input"
      :value="squadUserToCreate"
      @input="setSquadUserToCreate($event.target.value)"
    />
    </div>
    <p class="date-chooser" >Date:
      <select
        :value="squadDayToCreate"
        @input="updateDay($event.target.value)"
      >
        <option disabled value="">Date</option>
        <option 
          v-for="day in days"
          :key="day.timestamp"
          :value="day.timestamp"
        >
          {{ day.readable }}
        </option>
      </select>
      <select
        v-if="squadDayToCreate != ''"
        :value="squadTimeToCreate"
        @input="setSquadTimeToCreate($event.target.value)"
      >
        <option disabled value="">Time</option>
        <option 
          v-for="time in times"
          :key="time.timestamp"
          :value="time.timestamp"
        >
          {{ time.readable }}
        </option>
      </select>
    </p>
    <p>Optional message ( {{ squadMessageToCreate.length }}/250 ):</p>
    <textarea
      :value="squadMessageToCreate"
      @input="setSquadMessageToCreate($event.target.value)"
    >
    </textarea>
    <button 
      class="squad-button"
      v-if="squadUserToCreate != '' && squadTimeToCreate != '' && squadMessageToCreate.length <= 250"
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("squads", [
      "squadGameToCreate",
      "squadUserToCreate",
      "squadTimeToCreate",
      "squadDayToCreate",
      "squadMessageToCreate",
      "times",
      "days",
      "creatingSquad"
    ]),
    ...mapGetters("authentication", ["isUserLoggedIn"])
    },
  methods: {
    ...mapMutations("squads", ["setSquadUserToCreate", "setSquadGameToCreate", "setSquadTimeToCreate", "setSquadMessageToCreate", "updateDay"]),
    ...mapActions("squads", ["newSquad", "clearSquadCreating"])
  },
  created() {
    this.$store.dispatch("squads/setupDateSelection");
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
  margin-bottom: 10px;
}

select {
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
  padding: 5px;
}

textarea {
  border: 1px solid #2c3e50;
  border-radius: 3px;
  width: 100%;
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

.date-chooser select {
  margin-right: 5px;
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
