let mutations = {
  mutateTranslations: (state, translations) => {
    state.translations = translations
  },
  mutateIsMobile: (state, isMobile) => {
    state.isMobile = !!isMobile
  },
  mutateWindowSize: (state, windowSize) => {
    if (windowSize && windowSize.width && windowSize.height) {
      state.windowSize = windowSize
    }
  },
  mutateActivityIndicator: (state, showActivityIndicator) => {
    state.showActivityIndicator = showActivityIndicator
  },
  mutatePages: (state, pages) => {
    state.pages = pages
  },
  mutatePosts: (state, posts) => {
    state.posts = posts
  },
  mutateMakeries: (state, makeries) => {
    state.makeries = makeries
  }
}

export default mutations
