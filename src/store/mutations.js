var mutations = {
  mutateActivityIndicatorVisibility: (state, showActivityIndicator) => {
    state.showActivityIndicator = showActivityIndicator
  },
  mutateViewPort: (state, viewPort) => {
    if (viewPort.width && viewPort.height && viewPort.originalWidth && viewPort.originalHeight) {
      state.viewPort = viewPort
    } else {
      console.warn('viewPort properties missing! Needed for auto scale. ', JSON.stringify(viewPort))
    }
  },
  mutatePointerIsTouch: (state, isTouch) => {
    state.pointerIsTouch = !!isTouch
  },
  mutateIsMobile: (state, isMobile) => {
    state.isMobile = !!isMobile
  },
  mutateWindowSize: (state, windowSize) => {
    if (windowSize && windowSize.width && windowSize.height) {
      state.windowSize = windowSize
    }
  },
  mutateTranslations: (state, translations) => {
    state.translations = translations
  }
}
export default mutations
