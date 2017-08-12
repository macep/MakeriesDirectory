<template>
  <div id="directory" class="row page">
    <div class="col-xs-3">
      <makeries-menu/>
    </div>
    <div class="col-xs-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <h3 class="no-margin-top">
            Filter AZ
          </h3>
        </div>
        <div class="col-xs-12 az-list" v-for="(key, value) in listAZ" :key="key">
          {{value}}
          <div class="row">
            <div class="col-xs-4" v-for="item in listAZ[value]">
              {{item.name}}
              {{item}}
            </div>
          </div>
          <!--<banner :route="maker.routeTo" :img="maker.images[0].url" :title="maker.name" :content="maker.briefDescription || ''" :overlayed="true" :escaped="true"/>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import banner from '../common/banner'
  import makeriesMenu from './makeries-menu.vue'

  export default {
    name: 'filter-az',
    components: {banner, makeriesMenu},
    computed: {
      ...mapGetters(['directoryAZ']),
      listAZ () {
//        console.log(this.directoryAZ)
        return this.directoryAZ
      }
    }
  }
</script>
