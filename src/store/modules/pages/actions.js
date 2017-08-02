import apiService from '../../../api/app.service'

const getPage = ({commit, state}, slug) => {
  return apiService.getPage(null, slug).then((page) => {
    commit('PAGE_UPDATED', page)
  }).catch(error => {
    console.log('ERROR:', error)
  })
}

export {
  getPage
}
