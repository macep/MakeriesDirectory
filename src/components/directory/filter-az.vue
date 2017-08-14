<template>
  <div id="directory-az" class="row page">
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
        <div class="col-xs-12 az-list" v-for="(key, value) in directoryAZ" :key="value">
          <h2>{{value}}</h2>
          <div class="row">
            <div class="col-xs-4" v-for="item in directoryAZ[value]" :key="item.id">
              <router-link :to="item.routeTo">{{item.name}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import makeriesMenu from './makeries-menu.vue'

  export default {
    name: 'filter-az',
    components: {makeriesMenu},
    computed: {
      ...mapGetters(['directoryAZ'])
    }
  }
</script>
