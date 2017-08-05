let getters = {
  hostName: state => state.hostName,
  translations: state => state.translations,
  isMobile: state => state.isMobile,
  pointerIsTouch: state => state.pointerIsTouch,
  windowSize: state => state.windowSize,
  showActivityIndicator: state => state.showActivityIndicator,
  mainMenu: state => state.mainMenu,
  secondaryMenu: state => state.secondaryMenu,
  pages: state => state.pages,
  posts: state => state.posts,
  makeries: state => state.makeries
}

export default getters
