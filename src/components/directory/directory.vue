<template>
  <div id="directory" class="row page">
    <div class="col-xs-12">
      <span v-html="directoryPageData.content.rendered"/>
    </div>
    <div class="col-xs-4" v-for="maker in makeries" :key="maker.id">
      <banner :route="maker.routeTo"
              :img="maker.images[0].url"
              :title="maker.name"
              :content="maker.briefDescription"
              :overlayed="true"
              :escaped="true"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Config from '../../api/app.config'
  import banner from '../common/banner'

  export default {
    name: 'directory-page',
    components: {banner},
    mounted () {
      this.loadDirectory()
    },
    computed: {
      ...mapGetters(['pages', 'makeries']),
      directoryPageData () {
        return this.pages.find(item => item.id === Config.pagesIDs.directory)
      }
    },
    methods: {
      ...mapActions(['loadDirectory'])
    }
  }
</script>
