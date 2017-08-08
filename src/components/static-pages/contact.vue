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
  import Config from '../../api/app.config'

  export default {
    name: 'contact-page',
    computed: {
      ...mapGetters(['pages']),
      contactData () {
        return this.pages.find(item => {
          return item.id === Config.pagesIDs.contact
        })
      }
    }
  }
</script>
