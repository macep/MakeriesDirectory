<template>
  <div id="directory" class="row" :class="'view-' + viewType">
    <div class="col-xs-3">
      <makeries-menu/>
    </div>
    <div class="col-xs-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <div class="row no-gutter">
            <div class="col-xs-10 lg-margin-bottom">
              <search-directory/>
            </div>
            <div class="col-xs-2 lg-margin-bottom">
              <view-type/>
            </div>
          </div>
        </div>
        <div class="col-xs-12">
          <makeries-list :makeries="directory"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import banner from '../common/banner'
  import makeriesMenu from './menu.vue'
  import makeriesList from './makeries-list.vue'
  import searchDirectory from './search.vue'
  import viewType from './view-type.vue'

  export default {
    name: 'directory-page',
    components: {banner, makeriesMenu, makeriesList, searchDirectory, viewType},
    computed: {
      ...mapGetters(['directory', 'viewType'])
    }
  }
</script>
