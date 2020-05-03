import { find } from "lodash";

export default {
  /**
   * Check if a squad has deletion pending
   */
  isSquadDeletionPending: state => squadID =>
    state.squadDeletionPending.includes(squadID),

  /**
   * Get squad by id
   */
  getSquadById: state => squadID =>
    find(state.squads, squad => squad.id === squadID)
};
