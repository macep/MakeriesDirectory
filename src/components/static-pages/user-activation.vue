<template>
  <div id="disclaimer" class="row page">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 text-center">
      <hr>
      <template v-if="success">
        <h3 class="text-success">{{successMessage}}</h3>
        <p>{{successMessage2}}</p>
      </template>
      <template v-else="">
        <h3 class="text-danger">{{failureMessage}}</h3>
        <p class="">{{failureMessage2}}</p>
      </template>
      <hr>
    </div>
  </div>
</template>

<script>
  import Config from '../../api/app.config'
  import cookieService from '../../api/cookie.service'

  export default {
    name: 'user-activation-page',
    data () {
      return {
        success: false,
        successMessage: Config.titles.userActivationSuccessMessage,
        successMessage2: Config.titles.userActivationSuccessMessage2,
        failureMessage: Config.titles.userActivationFailureMessage,
        failureMessage2: Config.titles.userActivationFailureMessage2,
        userActivationTitle: Config.titles.userActivationTitle
      }
    },
    mounted () {
      let messageFromUrl = this.$router.history.current.fullPath.split('/user-activation?')[1].split('&')
      console.log(messageFromUrl)
      if (messageFromUrl[4] === 'success=true') {
        this.success = true

        // now we have the user verified so it's a good moment to add them to the MailChimp list
        let userEmail = messageFromUrl[2].split('=')[1].replace('%40', '@')
        let userInfo = cookieService.getCookie(userEmail)
        userInfo = cookieService.decodeCookieValue(userInfo)

        const listID = '44801b695f'
        const body = {
          'email_address': userEmail,
          'status': 'subscribed',
          'merge_fields': {
            'FIRSTNAME': userInfo.firstName,
            'LASTNAME': userInfo.lastName
          }
        }
        console.log(listID, body)
      }
      setTimeout(() => {
        this.$router.push(this.success === true ? '/login' : '/register')
      }, 5e3)
    }
  }
</script>
