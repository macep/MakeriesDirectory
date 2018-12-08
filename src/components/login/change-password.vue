<template>
  <activity-indicator :show="true"/>
</template>

<script>
  import activityIndicator from '../../components/common/activity-indicator.vue'

  export default {
    name: 'change-password',
    components: {activityIndicator},
    data () {
      const urlDecoded = decodeURIComponent(window.location.search.substr(1)).split('&')
      if (urlDecoded !== '') {
        let result = {}
        for (let i = 0; i < urlDecoded.length; i++) {
          let el = urlDecoded[i].split('=')
          result[el[0]] = el[1]
        }
        this.$store.commit('mutatePasswordResetResult', result)
        this.$router.push('/login')
      }
      return {}
    }
  }
</script>
