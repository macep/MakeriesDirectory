<template>
  <div id="app" class="row">
    <div class="col-xs-12">
      <jgm-header/>
      <jgm-menu/>
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
      <jgm-notification/>
      <jgm-footer/>
      <ga-analytics/>
      <div id="showActivityIndicator" v-show="showActivityIndicator"
           :class="showActivityIndicator ? 'loading' : 'loaded'">
        <i class="icon-circle-o-notch"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import jgmHeader from './components/layout/jgm-header.vue'
  import jgmMenu from './components/layout/jgm-menu.vue'
  import jgmFooter from './components/layout/jgm-footer.vue'
  import jgmNotification from './components/layout/jgm-notification.vue'
  import gaAnalytics from './components/layout/ga-analytics.vue'

  export default {
    name: 'app',
    components: {
      'jgm-header': jgmHeader,
      'jgm-menu': jgmMenu,
      'jgm-footer': jgmFooter,
      'jgm-notification': jgmNotification,
      'ga-analytics': gaAnalytics
    },
    data () {
      return {}
    },
    mounted () {
      this.setIsMobile()

      this.loadProject().then((data) => {
        if (data) {
          console.log('loaded project: ', data)
        }
      }).catch((error) => {
        console.warn(error.response.data.Message || error)
      })

      window.addEventListener('resize', () => {
        clearTimeout(this.debounceWindowResizeId)
        this.debounceWindowResizeId = setTimeout(() => {
          this.setIsMobile()
        }, 500)
      })
    },
    computed: {
      ...mapGetters(['translations', 'isMobile', 'showActivityIndicator'])
    },
    methods: {
      ...mapActions(['loadProject', 'setIsMobile', 'setWindowSize'])
    }
  }
</script>
