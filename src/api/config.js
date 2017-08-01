/**
 * Created by cristi on 01/08/2017.
 */

var config = {
  // @TODO: use a predefined api url from here instead of getting it from url param to avoid matm attack
  apiUrlBase: '/',
  paths: {
    config: () => '/config',
    reviews: () => '/reviews',
    status: (reviewId) => `/reviews/${reviewId}/users/current/status`,
    users: (reviewId, userId = '') => `/reviews/${reviewId}/users/${userId}`,
    searchUsers: (reviewId, query) => `/reviews/${reviewId}/users/search?q=${query}`,
    remindUser: (reviewId, userId) => `/reviews/${reviewId}/users/${userId}/remind`,
    annotations: (reviewId, annotationId = '') => `/reviews/${reviewId}/annotations/${annotationId}`,
    comments: (reviewId, annotationId, commentId = '') => `/reviews/${reviewId}/annotations/${annotationId}/comments/${commentId}`
  }
}

export { config }
