export default {
  setUser: (state, value) => (state.user = value),
  setSteam: (state, value) => (state.user.steamId = value),
  setRiot: (state, value) => (state.user.riotId = value),
  setDota: (state, value) => (state.user.dotaId = value),
  setMojang: (state, value) => (state.user.mojangId = value),
  setEpic: (state, value) => (state.user.epicId = value),
};
