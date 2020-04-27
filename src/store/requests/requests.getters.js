import { find } from "lodash";

export default {
  /**
   * Check if a request has deletion pending
   */
  isRequestDeletionPending: state => requestId =>
    state.requestDeletionPending.includes(requestId),

  /**
   * Get request by id
   */
  getRequestById: state => requestId =>
    find(state.requests, request => request.id === requestId)
};
