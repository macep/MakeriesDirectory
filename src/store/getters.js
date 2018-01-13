export default {
  serverRegistrationErrorMessage: state => state.serverRegistrationErrorMessage,
  serverRegistrationSuccessMessage: state => state.serverRegistrationSuccessMessage,
  serverLoginErrorMessage: state => state.serverLoginErrorMessage,
  serverResetPassErrorMessage: state => state.serverResetPassErrorMessage,
  serverResetPassSuccessMessage: state => state.serverResetPassSuccessMessage,
  passwordResetResult: state => state.passwordResetResult,
  hostName: state => state.hostName,
  isMobile: state => state.isMobile,
  pointerIsTouch: state => state.pointerIsTouch,
  mobileMenuVisibile: state => state.mobileMenuVisibile,
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
  directoryBannersPosts: state => state.directoryBannersPosts,
  directory: state => state.directory,
  showAllSuppliers: state => state.showAllSuppliers,
  directoryDisabled: state => state.directoryDisabled,
  directoryFilterData: state => state.directoryFilterData,
  directoryAZ: state => state.directoryAZ,
  viewType: state => state.viewType,
  searchCriteria: state => state.searchCriteria,
  route: state => state.route
}
