<template>
  <div id="contact" class="row page">
    <div class="col-xs-12">
      <h1 v-html="contactData.title.rendered"/>
      <span v-html="contactData.content.rendered"/>
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
