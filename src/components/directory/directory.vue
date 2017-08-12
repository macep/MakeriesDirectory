<template>
  <div id="directory" class="row page">
    <div class="col-xs-3">
      <makeries-menu/>
    </div>
    <div class="col-xs-9">
      <div class="row small-gutter">
        <div class="col-xs-4 maker" v-for="maker in makeries" :key="maker.id">
          <banner :route="maker.routeTo" :img="maker.images[0].url" :title="maker.name" :content="maker.briefDescription || ''" :overlayed="true" :escaped="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
//  import Config from '../../api/app.config'
  import banner from '../common/banner'
  import makeriesMenu from './makeries-menu.vue'

  export default {
    name: 'directory-page',
    components: {banner, makeriesMenu},
    mounted () {
      this.loadDirectory()
    },
    computed: {
      ...mapGetters(['makeries'])
    },
    methods: {
      ...mapActions(['loadDirectory'])
    }
  }
</script>
