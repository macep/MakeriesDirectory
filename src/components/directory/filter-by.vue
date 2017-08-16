<template>
  <div id="directory-filter-by" class="row page">
    <div class="col-sm-3" v-if="!isMobile">
      <makeries-menu/>
    </div>
    <div class="col-sm-9">
      <div class="row no-gutter">
        <div class="col-xs-10 col-sm-11 lg-margin-bottom">
          <h3 class="no-margin">
            {{currentFilterType}}: {{currentFilterTypeValue}}
          </h3>
        </div>
        <div class="col-xs-2 col-sm-1">
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
  import {getNthFragment} from '../../modules/utils'
  import banner from '../common/banner'
  import makeriesMenu from './menu.vue'
  import makeriesList from './makeries-list.vue'
  import viewType from './view-type.vue'

  export default {
    name: 'filter-by',
    components: {banner, makeriesMenu, makeriesList, viewType},
    computed: {
      ...mapGetters(['directory', 'isMobile']),
      currentFilterType () {
        let currentFilter = getNthFragment(this.$route.path, 3)
        let filterTypes = Config.routerSettings.filterBy
        let rev = {}
        for (let key in filterTypes) {
          rev[getNthFragment(filterTypes[key], 3)] = key
        }
        return rev[currentFilter]
      },
      currentFilterTypeValue () {
        return getNthFragment(this.$route.path, 4)
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
