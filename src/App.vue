<template>
  <div id="app" class="row">
    <div class="col-xs-12">
      <jgm-header/>
      <jgm-menu/>
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
      <jgm-notification/>
      <ga-analytics/>
      <jgm-footer/>
      <div id="showActivityIndicator" v-show="showActivityIndicator"
           :class="showActivityIndicator ? 'loading' : 'loaded'">
        <i class="icon-circle-o-notch"/>
      </div>
    </div>
  </div>
</template>

<script>
  import jgmHeader from './components/layout/jgm-header.vue'
  import jgmMenu from './components/layout/jgm-menu.vue'
  import jgmFooter from './components/layout/jgm-footer.vue'
  import jgmNotification from './components/layout/jgm-notification.vue'
  import gaAnalytics from './components/layout/ga-analytics.vue'

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Just Got Made successfully initialized',
        showActivityIndicator: false
      }
    },
    components: {
      'jgm-header': jgmHeader,
      'jgm-menu': jgmMenu,
      'jgm-footer': jgmFooter,
      'jgm-notification': jgmNotification,
      'ga-analytics': gaAnalytics
    },
    computed: {}
  }
</script>
