<template>
  <div id="wrapper" class="row">
    <div class="col-xs-12">
      <jgm-header/>
      <jgm-menu/>
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
  import jgmHeader from './layout/jgm-header.vue'
  import jgmMenu from './layout/jgm-menu.vue'
  import jgmFooter from './layout/jgm-footer.vue'
  import jgmNotification from './layout/jgm-notification.vue'
  import gaAnalytics from './layout/ga-analytics.vue'

  export default {
    name: 'main',
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
