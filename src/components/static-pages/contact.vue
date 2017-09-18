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
      if (this.pages.length > 0) {
        this.contactData = this.pages.find(item => item.id === Config.pagesIDs.contact)
      }
    },
    computed: {
      ...mapGetters(['pages'])
    },
    metaInfo: {
      title: Config.titles.contact
    },
    watch: {
      pages () {
        if (this.pages.length > 0) {
          this.contactData = this.pages.find(item => item.id === Config.pagesIDs.contact)
        }
      }
    }
  }
</script>
