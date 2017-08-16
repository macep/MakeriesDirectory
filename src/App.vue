<template>
  <div id="app" class="row" :class="{'is-mobile': isMobile, 'is-touch': pointerIsTouch, 'no-scroll': mobileMenuVisibile}">
    <div class="col-xs-12">
      <jgm-header/>
      <jgm-menu v-if="!isMobile"/>
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
      <jgm-notification/>
      <jgm-footer/>
      <ga-analytics/>
      <transition name="fade" mode="out-in">
        <div id="showActivityIndicator" v-show="showActivityIndicator" :class="showActivityIndicator ? 'loading' : 'loaded'">
          <span class="activityImg">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="110" height="110" viewBox="0 0 90 90" style="enable-background:new 0 0 90 90;" xml:space="preserve">
            <g>
              <path d="M64.4,11.4L83.8,45L64.4,78.6H25.6L6.2,45l19.4-33.6H64.4 M65,10.4H25L5,45l20,34.6h40L85,45L65,10.4L65,10.4z"/>
              <path d="M45,6.2l33.6,19.4v38.8L45,83.8L11.4,64.4V25.6L45,6.2 M45,5L10.4,25v40L45,85l34.6-20V25L45,5L45,5z"/>
            </g>
            </svg>
          </span>
          <span class="activityTag" v-html="activityTag"/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {stopZoomingWhenDoubleTapped} from './modules/utils'
  import jgmHeader from './components/layout/jgm-header.vue'
  import jgmMenu from './components/layout/jgm-menu.vue'
  import jgmMobileMenu from './components/layout/jgm-mobile-menu.vue'
  import jgmFooter from './components/layout/jgm-footer.vue'
  import jgmNotification from './components/layout/jgm-notification.vue'
  import gaAnalytics from './components/layout/ga-analytics.vue'
  import Config from './api/app.config'

  const pageClassSuffix = '-page'

  function makeBodyClass (fromRoute) {
    let currentRoute = fromRoute.path.replace(/\//g, '')
    currentRoute += (currentRoute !== '') ? pageClassSuffix : ''
    document.querySelector('body').classList = currentRoute
  }

  export default {
    name: 'app',
    components: {jgmHeader, jgmMenu, jgmMobileMenu, jgmFooter, jgmNotification, gaAnalytics},
    data () {
      return {
        activityLoaderImg: Config.activityLoaderImg,
        activityTag: Config.appTitleShort
      }
    },
    mounted () {
      this.setIsMobile()
      this.loadProject()
      this.setPointerIsTouch('ontouchstart' in window)
      if (this.pointerIsTouch) {
        stopZoomingWhenDoubleTapped()
      }
      this.setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
      window.addEventListener('resize', () => {
        clearTimeout(this.debounceWindowResizeId)
        this.debounceWindowResizeId = setTimeout(() => {
          this.setIsMobile()
          this.setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }, 500)
      })
      makeBodyClass(this.$route)
    },
    computed: {
      ...mapGetters(['translations', 'isMobile', 'pointerIsTouch', 'showActivityIndicator', 'mobileMenuVisibile'])
    },
    methods: {
      ...mapActions(['loadProject', 'setIsMobile', 'setWindowSize', 'setPointerIsTouch'])
    },
    watch: {
      '$route' (to) {
        makeBodyClass(to)
      }
    }
  }
</script>
