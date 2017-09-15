<template>
  <div id="contact" class="row page">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1">
      <h1 v-html="contactData.title.rendered"/>
      <span v-html="contactData.content.rendered"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import apiService from '../../api/api.service'
  import Config from '../../api/app.config'

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
      apiService.getPage(Config.pagesIDs.contact).then((response) => {
        this.contactData = response.data
      })
    },
    computed: {
      ...mapGetters(['pages'])
    },
    metaInfo: {
      title: Config.titles.contact
    }
  }
</script>
