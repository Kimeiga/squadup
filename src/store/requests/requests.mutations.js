export default {
  /* Request input name */
  setRequestNameToCreate: (state, requestNameToCreate) =>
    (state.requestNameToCreate = requestNameToCreate),

  /* Requests */
  setRequests: (state, requests) => (state.requests = requests),
  addRequest: (state, request) => state.requests.push(request),
  removeRequestById: (state, requestId) => {
    const index = state.requests.findIndex(request => request.id === requestId);
    state.requests.splice(index, 1);
  },

  /* Requests deletion */
  addRequestDeletionPending: (state, requestId) =>
    state.requestDeletionPending.push(requestId),
  removeRequestDeletionPending: (state, requestId) => {
    const index = state.requests.findIndex(request => request.id === requestId);
    state.requestDeletionPending.splice(index, 1);
  },

  /* Request creation */
  setRequestCreationPending: (state, value) =>
    (state.requestCreationPending = value)
};
