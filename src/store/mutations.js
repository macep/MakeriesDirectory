let mutations = {
  mutateAuthenticated: (state, authenticated) => {
    state.authenticated = authenticated
  },
  mutateTranslations: (state, translations) => {
    state.translations = translations
  },
  mutateIsMobile: (state, isMobile) => {
    state.isMobile = !!isMobile
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
  mutateCategories: (state, categories) => {
    state.categories = categories
  },
  mutatePages: (state, pages) => {
    state.pages = pages
  },
  mutatePosts: (state, posts) => {
    state.posts = posts
  },
  mutateArchivedYears: (state, archivedYears) => {
    state.archivedYears = archivedYears
  },
  mutateSliderPosts: (state, sliderPosts) => {
    state.sliderPosts = sliderPosts
  },
  mutateBannerPosts: (state, bannerPosts) => {
    state.bannerPosts = bannerPosts
  },
  mutateDirectory: (state, directory) => {
    state.directory = directory
  },
  mutateDirectoryDisabled: (state, directoryDisabled) => {
    state.directoryDisabled = directoryDisabled
  },
  mutateDirectoryFilterData: (state, directoryFilterData) => {
    state.directoryFilterData = directoryFilterData
  },
  mutateDirectoryAZ: (state, directoryAZ) => {
    state.directoryAZ = directoryAZ
  },
  mutateViewType: (state, viewType) => {
    state.viewType = viewType
  },
  mutateSearchCriteria: (state, searchCriteria) => {
    state.searchCriteria = searchCriteria
  }
}

export default mutations
