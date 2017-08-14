let getters = {
  hostName: state => state.hostName,
  translations: state => state.translations,
  isMobile: state => state.isMobile,
  pointerIsTouch: state => state.pointerIsTouch,
  windowSize: state => state.windowSize,
  showActivityIndicator: state => state.showActivityIndicator,
  mainMenu: state => state.mainMenu,
  secondaryMenu: state => state.secondaryMenu,
  categories: state => state.categories,
  pages: state => state.pages,
  posts: state => state.posts,
  archivedYears: state => state.archivedYears,
  sliderPosts: state => state.sliderPosts,
  bannerPosts: state => state.bannerPosts,
  directory: state => state.directory,
  directoryFilterData: state => state.directoryFilterData,
  directoryAZ: state => state.directoryAZ,
  viewType: state => state.viewType,
  searchCriteria: state => state.searchCriteria,
  route: state => state.route
}

export default getters
