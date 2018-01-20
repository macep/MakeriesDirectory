<template>
  <div>
    <activity-indicator :show="true"/>
    <div id="social-user-hidden-form-wrapper"/>
  </div>
</template>

<script>
  import activityIndicator from '../../components/common/activity-indicator.vue'

  export default {
    name: 'callback',
    props: ['auth'],
    components: {activityIndicator},
    data () {
      this.auth.handleSocialAuthentication()
      return {}
    }
  }
</script>
