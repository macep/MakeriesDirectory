<template>
  <div id="app" class="row" :class="[isMobile ? 'is-mobile' : '', isTablet ? 'is-tablet' : '', isDesktop ? 'is-desktop' : '', pointerIsTouch ? 'is-touch' : '', mobileMenuVisibile ? 'no-scroll' : '']">
    <div class="col-xs-12">

      <jgm-header/>

      <jgm-menu v-if="!isMobile" :auth="auth" :authenticated="authenticated"/>

      <template v-else>
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
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {stopZoomingWhenDoubleTapped} from './modules/utils'
  import activityIndicator from './components/common/activity-indicator.vue'
  import jgmHeader from './components/layout/jgm-header.vue'
  import jgmMenu from './components/layout/jgm-menu.vue'
  import jgmMobileMenu from './components/layout/jgm-mobile-menu.vue'
  import jgmFooter from './components/layout/jgm-footer.vue'
  import Config from './api/app.config'
  import AuthService from './api/auth.service'

  const auth = new AuthService()
  const {login, socialLogin, logout, authenticated, authNotifier} = auth

  export default {
    name: 'app',

    components: {
      jgmHeader,
      jgmMenu,
      jgmMobileMenu,
      jgmFooter,
      activityIndicator
    },

    data () {
      authNotifier.$on('authChange', authState => {
        this.authenticated = authState.authenticated
      })
      return {
        activityLoaderImg: Config.activityLoaderImg,
        auth,
        authenticated
      }
    },

    computed: {
      ...mapGetters([
        'isMobile',
        'isTablet',
        'isDesktop',
        'pointerIsTouch',
        'showActivityIndicator',
        'mobileMenuVisibile',
        'pages',
        'windowSize'
      ])
    },

    watch: {
      $route (to, from) {
        const fromRoute = this.baseRoute(from)
        const toRoute = this.baseRoute(to)
        document.body.classList.replace(fromRoute, toRoute)
      },
      windowSize () {
        this.mutateIsMobile()
        this.mutateIsTablet()
        this.mutateIsDesktop()
      },
      pages () {
        this.stopActivityIndicator()
      }
    },

    mounted () {
      const initialRoute = this.baseRoute(this.$route)
      document.body.classList.add(initialRoute)

      this.mutateIsMobile()
      this.mutateIsTablet()
      this.mutateIsDesktop()
      this.mutateResultsPerPage(this.isDesktop ? 24 : 12)

      this.setPointerIsTouch('ontouchstart' in window)

      if (this.pages.length < 1) this.loadProject()

      if (this.pointerIsTouch) stopZoomingWhenDoubleTapped()

      this.setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })

      window.addEventListener('resize', () => {
        clearTimeout(this.debounceWindowResizeId)
        this.debounceWindowResizeId = setTimeout(() => {
          this.setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }, 1e3)
      })
    },

    methods: {
      ...mapActions([
        'loadProject',
        'setWindowSize',
        'setPointerIsTouch'
      ]),

      ...mapMutations([
        'mutateIsMobile',
        'mutateIsTablet',
        'mutateIsDesktop',
        'mutateResultsPerPage',
        'mutateMobileMenuVisibile',
        'mutateActivityIndicator'
      ]),

      toggleMobileMenuVisibility () {
        this.mutateMobileMenuVisibile(!this.mobileMenuVisibile)
      },

      stopActivityIndicator () {
        if (this.pages.length > 0) this.mutateActivityIndicator(false)
      },

      baseRoute (str) {
        const baseRoute = str.path.split('/')[1]
        return `${(baseRoute === '' ? 'home' : baseRoute)}-page`
      },

      login,
      socialLogin,
      logout
    },

    metaInfo: {
      title: Config.titles.defaultSalutation,
      titleTemplate: `%s | ${Config.appTitle}`
    }
  }
</script>
