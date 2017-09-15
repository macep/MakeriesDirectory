<template>
  <div id="app" class="row" :class="{'is-mobile': isMobile, 'is-touch': pointerIsTouch, 'no-scroll': mobileMenuVisibile}">
    <div class="col-xs-12">
      <jgm-header/>
      <jgm-menu v-if="!isMobile" :authenticated="authenticated"/>
      <template v-if="isMobile">
        <jgm-mobile-menu/>
        <v-touch tag="i" @tap="toggleMobileMenuVisibility" :class="{'icon-dehaze': !mobileMenuVisibile, 'icon-close': mobileMenuVisibile}"/>
      </template>
      <transition name="slide" mode="out-in">
        <router-view :auth="auth" :authenticated="authenticated"/>
      </transition>
      <jgm-footer/>
      <activity-indicator :show="showActivityIndicator"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {stopZoomingWhenDoubleTapped} from './modules/utils'
  import activityIndicator from './components/common/activity-indicator.vue'
  import jgmHeader from './components/layout/jgm-header.vue'
  import jgmMenu from './components/layout/jgm-menu.vue'
  import jgmMobileMenu from './components/layout/jgm-mobile-menu.vue'
  import jgmFooter from './components/layout/jgm-footer.vue'
  import Config from './api/app.config'
  import AuthService from './api/auth.service'

  const auth = new AuthService()
  const {login, logout, authenticated, authNotifier} = auth

  const pageClassSuffix = '-page'

  let makeBodyClass = (fromRoute) => {
    let currentRoute = fromRoute.path.replace(/\//g, '')
    currentRoute += (currentRoute !== '') ? pageClassSuffix : ''
    document.querySelector('body').classList = currentRoute
  }

  export default {
    name: 'app',
    components: {jgmHeader, jgmMenu, jgmMobileMenu, jgmFooter, activityIndicator},
    data () {
      authNotifier.$on('authChange', authState => {
        this.authenticated = authState.authenticated
      })
      return {
        activityLoaderImg: Config.activityLoaderImg,
        currentUser: {
          name: 'Cristi',
          id: 7
        },
        auth,
        authenticated
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
      ...mapGetters(['isMobile', 'pointerIsTouch', 'showActivityIndicator', 'mobileMenuVisibile', 'posts', 'pages']),
      postsAndPages () {
        this.posts
        this.pages
        return Date.now()
      }
    },
    methods: {
      ...mapActions(['loadProject', 'setIsMobile', 'setWindowSize', 'setPointerIsTouch']),
      toggleMobileMenuVisibility () {
        this.$store.commit('mutateMobileMenuVisibile', !this.mobileMenuVisibile)
      },
      login,
      logout
    },
    metaInfo: {
      title: Config.titles.defaultSalutation,
      titleTemplate: `%s | ${Config.appTitle}`
    },
    watch: {
      '$route' (to) {
        makeBodyClass(to)
      },
      postsAndPages () {
        if (this.posts.length > 0 && this.pages.length > 0) {
          this.$store.commit('mutateActivityIndicator', false)
        }
      }
    }
  }
</script>
