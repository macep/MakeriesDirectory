<template>
  <div id="directory" class="row page">
    <div class="col-xs-3">
      <makeries-menu/>
    </div>
    <div class="col-xs-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <search-directory/>
        </div>
        <div class="col-xs-4 maker" v-for="maker in directory" :key="maker.id">
          <banner :route="maker.routeTo" :img="maker.images[0].url" :title="maker.name" :content="maker.briefDescription || ''" :overlayed="true" :escaped="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import banner from '../common/banner'
  import makeriesMenu from './makeries-menu.vue'
  import searchDirectory from './search-directory.vue'

  export default {
    name: 'directory-page',
    components: {banner, makeriesMenu, searchDirectory},
    mounted () {
      this.loadDirectory()
    },
    computed: {
      ...mapGetters(['directory'])
    },
    methods: {
      ...mapActions(['loadDirectory'])
    }
  }
</script>
