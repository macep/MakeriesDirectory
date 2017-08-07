let mutations = {
  mutateTranslations: (state, translations) => {
    state.translations = translations
  },
  mutateIsMobile: (state, isMobile) => {
    state.isMobile = !!isMobile
  },
  mutatePointerIsTouch: (state, isTouch) => {
    state.pointerIsTouch = !!isTouch
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
  mutatePages: (state, pages) => {
    state.pages = pages
  },
  mutatePosts: (state, posts) => {
    state.posts = posts
  },
  mutateSliderPosts: (state, sliderPosts) => {
    state.sliderPosts = sliderPosts
  },
  mutateBannerPosts: (state, bannerPosts) => {
    state.bannerPosts = bannerPosts
  },
  mutateMakeries: (state, makeries) => {
    state.makeries = makeries
  }
}

export default mutations
