export default {
  mutateServerRegistrationErrorMessage: (state, serverRegistrationErrorMessage) => {
    state.serverRegistrationErrorMessage = serverRegistrationErrorMessage
  },
  mutateServerRegistrationSuccessMessage: (state, serverRegistrationSuccessMessage) => {
    state.serverRegistrationSuccessMessage = serverRegistrationSuccessMessage
  },
  mutateServerLoginErrorMessage: (state, serverLoginErrorMessage) => {
    state.serverLoginErrorMessage = serverLoginErrorMessage
  },
  mutateServerResetPassErrorMessage: (state, serverResetPassErrorMessage) => {
    state.serverResetPassErrorMessage = serverResetPassErrorMessage
  },
  mutateServerResetPassSuccessMessage: (state, serverResetPassSuccessMessage) => {
    state.serverResetPassSuccessMessage = serverResetPassSuccessMessage
  },
  mutatePasswordResetResult: (state, passwordResetResult) => {
    state.passwordResetResult = passwordResetResult
  },
  mutateIsMobile: state => {
    state.isMobile = !!window.matchMedia('only screen and (max-width: 767px)').matches
  },
  mutateIsTablet: state => {
    state.isTablet = !!window.matchMedia('only screen and (min-width: 768px) and (max-width: 991px)').matches
  },
  mutateIsDesktop: state => {
    state.isDesktop = !!window.matchMedia('only screen and (min-width: 992px)').matches
  },
  mutatePointerIsTouch: (state, isTouch) => {
    state.pointerIsTouch = !!isTouch
  },
  mutateMobileMenuVisibile: (state, mobileMenuVisibile) => {
    state.mobileMenuVisibile = mobileMenuVisibile
  },
  mutateWindowSize: (state, windowSize) => {
    state.windowSize = windowSize
  },
  mutateActivityIndicator: (state, showActivityIndicator) => {
    state.showActivityIndicator = showActivityIndicator
  },
  mutateMainMenu: (state, mainMenu) => {
    state.mainMenu = mainMenu
  },
  mutateSecondaryMenu: (state, secondaryMenu) => {
    state.secondaryMenu = secondaryMenu
  },
  mutateDirectoryBannersPosts: (state, directoryBannersPosts) => {
    state.directoryBannersPosts = directoryBannersPosts
  },
  mutateDirectory: (state, directory) => {
    state.directory = directory
  },
  mutateDirectoryFeaturedList: (state, directoryFeaturedList) => {
    state.directoryFeaturedList = directoryFeaturedList
  },
  mutateDirectoryStats: (state, directoryStats) => {
    state.directoryStats = directoryStats
  },
  mutateDirectoryAZ: (state, directoryAZ) => {
    state.directoryAZ = directoryAZ
  },
  mutateDirectoryActiveFilter: (state, directoryActiveFilter) => {
    state.directoryActiveFilter = directoryActiveFilter
  },
  mutateShowAllSuppliers: (state, showAllSuppliers) => {
    state.showAllSuppliers = showAllSuppliers
  },
  mutateResultsPerPage: (state, resultsPerPage) => {
    state.resultsPerPage = resultsPerPage
  },
  mutateViewType: (state, viewType) => {
    state.viewType = viewType
  },
  mutateSearchCriteria: (state, searchCriteria) => {
    state.searchCriteria = searchCriteria
  }
}
