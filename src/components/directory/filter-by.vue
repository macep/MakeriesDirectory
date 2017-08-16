<template>
  <div id="directory-filter-by" class="row page">
    <div class="col-xs-3">
      <makeries-menu/>
    </div>
    <div class="col-xs-9">
      <div class="row no-gutter">
        <div class="col-xs-10 lg-margin-bottom">
          <h3 class="no-margin">
            {{currentFilterType}}: {{currentFilterTypeValue}}
          </h3>
        </div>
        <div class="col-xs-2">
          <view-type/>
        </div>
      </div>
      <div class="row small-gutter">
        <div class="col-xs-12">
          <makeries-list :makeries="filteredData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import banner from '../common/banner'
  import makeriesMenu from './menu.vue'
  import makeriesList from './makeries-list.vue'
  import viewType from './view-type.vue'

  export default {
    name: 'filter-by',
    components: {banner, makeriesMenu, makeriesList, viewType},
    computed: {
      ...mapGetters(['directory']),
      currentFilterType () {
        let currentFilter = this.$route.path.split('/')[3]
        let filterTypes = Config.routerSettings.filterBy
        let rev = {}
        for (let key in filterTypes) {
          rev[filterTypes[key].split('/')[3]] = key
        }
        return rev[currentFilter]
      },
      currentFilterTypeValue () {
        return this.$route.path.split('/')[4]
      },
      filteredData () {
        return this.directory.filter(item => {
          if (item[this.currentFilterType].length > 0) {
            for (let i = 0; i < item[this.currentFilterType].length; i++) {
              if (this.currentFilterTypeValue === item[this.currentFilterType][i].pretty) {
                return item
              }
            }
          } else {
            return this.currentFilterTypeValue === item[this.currentFilterType].pretty
          }
        })
      }
    }
  }
</script>
