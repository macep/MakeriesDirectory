<template>
  <div id="directory-filter-by" class="row page" :class="'view-' + viewType">
    <div class="col-sm-3" v-if="!isMobile">
      <h3 class="no-margin-top">Regions</h3>
      <ul>
        <v-touch tag="li" @tap="gotoRoute(filter.url)" v-for="filter in directoryFilterDataCollection" :key="filter.el">
          <div class="btn-link sm-padding-top sm-padding-bottom">{{filter.el}} ({{filter.occurences}})</div>
        </v-touch>
      </ul>
    </div>
    <div class="col-sm-9">
      <div class="row no-gutter">
        <div class="col-sm-10 col-md-11 pull-left search-directory-wrapper lg-margin-bottom">
          <h3 class="no-margin">
            {{currentFilterTypeValuePretty}}
          </h3>
        </div>
        <div class="col-sm-2 col-md-1 pull-left view-type-wrapper">
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
  import makeriesMenu from './directory-menu.vue'
  import makeriesList from './makeries-list.vue'
  import viewType from './view-type.vue'
  import waitDirectoryData from '../../mixins/waitDirectoryData'

  export default {
    name: 'filter-by',
    components: {banner, makeriesMenu, makeriesList, viewType},
    mixins: [waitDirectoryData],
    computed: {
      ...mapGetters(['directoryFilterData', 'directory', 'isMobile', 'viewType']),
      directoryFilterDataCollection () {
        if (this.directoryFilterData.regions !== undefined && this.directoryFilterData.regions.data.length > 0) {
          return this.directoryFilterData.regions.data
        }
      },
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
      currentFilterTypeValuePretty () {
        return this.currentFilterTypeValue.replace(/-/g, ' ')
      },
      filteredData () {
        return this.directory.filter(item => {
          if (Array.isArray(item[this.currentFilterType])) {
            for (let i = 0; i < item[this.currentFilterType].length; i++) {
              if (this.currentFilterTypeValue === item[this.currentFilterType][i].pretty) {
                return item
              }
            }
          } else {
            return item[this.currentFilterType] !== null && this.currentFilterTypeValue === item[this.currentFilterType].pretty
          }
        })
      }
    },
    methods: {
      gotoRoute (url) {
        this.$router.push(url)
      }
    },
    metaInfo () {
      return {
        title: `${Config.titles.directory.filterBy} ${Config.titles.directory[this.currentFilterType].toLowerCase()}: ${this.currentFilterTypeValuePretty}`
      }
    }
  }
</script>
