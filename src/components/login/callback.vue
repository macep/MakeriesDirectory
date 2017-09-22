<template>
  <activity-indicator :show="true"/>
</template>

<script>
  import activityIndicator from '../../components/common/activity-indicator.vue'

  export default {
    name: 'callback',
    props: ['auth'],
    components: {activityIndicator},
    mounted () {
      this.auth.handleSocialAuthentication()
      this.$router.push(localStorage.getItem('jgm_desired_route') || '/directory')
    }
  }
</script>
