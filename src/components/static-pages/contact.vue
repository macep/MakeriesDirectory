<template>
  <div id="contact" class="row">
    <div class="col-xs-12">
      <h1 class="din-web-cond text-uppercase" v-html="contactData.title.rendered"></h1>
      <div v-html="contactData.content.rendered"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/app.service'

  export default {
    name: 'contact-page',
    data () {
      return {
        contactData: {
          title: {
            rendered: ''
          },
          content: {
            rendered: ''
          }
        }
      }
    },
    mounted () {
      apiService.getPage(23).then((response) => {
        this.contactData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    }
  }
</script>
