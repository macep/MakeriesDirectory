<template>
  <div id="directory" class="row page">
    <div class="col-xs-12">
      <span v-html="directoryPageData.content.rendered"/>
    </div>
    <div class="col-xs-4" v-for="maker in makeries" :key="maker.id">
      <img :src="maker.images[0].url"/>
      <span v-html="maker.name"/>
      <span v-html="maker.briefDescription"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'directory-page',
    mounted () {
      this.loadDirectory()
    },
    computed: {
      ...mapGetters(['pages', 'makeries']),
      directoryPageData () {
        return this.pages.find(item => {
          return item.id === 5
        })
      }
    },
    methods: {
      ...mapActions(['loadDirectory'])
    }
  }
</script>
