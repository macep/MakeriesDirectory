export default {
  serverRegistrationErrorMessage: state => state.serverRegistrationErrorMessage,
  serverRegistrationSuccessMessage: state => state.serverRegistrationSuccessMessage,
  serverLoginErrorMessage: state => state.serverLoginErrorMessage,
  serverResetPassErrorMessage: state => state.serverResetPassErrorMessage,
  serverResetPassSuccessMessage: state => state.serverResetPassSuccessMessage,
  passwordResetResult: state => state.passwordResetResult,
  hostName: state => state.hostName,
  isMobile: state => state.isMobile,
  isTablet: state => state.isTablet,
  isDesktop: state => state.isDesktop,
  pointerIsTouch: state => state.pointerIsTouch,
  mobileMenuVisibile: state => state.mobileMenuVisibile,
  windowSize: state => state.windowSize,
  showActivityIndicator: state => state.showActivityIndicator,

  mainMenu: state => state.mainMenu,
  secondaryMenu: state => state.secondaryMenu,

  directory: state => state.directory,
  directoryBannersPosts: state => state.directoryBannersPosts,
  directoryFeaturedList: state => state.directoryFeaturedList,
  directoryStats: state => state.directoryStats,
  directoryAZ: state => state.directoryAZ,
  directoryActiveFilter: state => state.directoryActiveFilter,
  showAllSuppliers: state => state.showAllSuppliers,

  resultsPerPage: state => state.resultsPerPage,

  viewType: state => state.viewType,
  searchCriteria: state => state.searchCriteria,
  route: state => state.route
}
