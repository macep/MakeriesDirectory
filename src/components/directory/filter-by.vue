<template>
  <div id="directory-filter-by" class="row page" :class="'view-' + viewType">
    <div class="col-sm-3" v-if="!isMobile">
      <h3 class="no-margin-top">Regions</h3>
      <ul>
        <v-touch tag="li" v-for="filter in directoryStats.regions" :key="filter.id" @tap="selectFilter(filter)">
          <div class="btn-link sm-padding-top sm-padding-bottom">{{filter.name}} ({{filter.occurence}})</div>
        </v-touch>
      </ul>
    </div>
    <div class="col-sm-9">
      <div class="row no-gutter">
        <div class="col-sm-10 col-md-11 pull-left search-directory-wrapper lg-margin-bottom">
          <h3 class="no-margin">
            {{currentFilter.name}}
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
  import { mapGetters, mapMutations } from 'vuex'
  import Config from '../../api/app.config'
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
      ...mapGetters(['directory', 'directoryStats', 'directoryActiveFilter', 'isMobile', 'viewType']),
      currentFilter () {
        return this.directoryStats.regions ? this.directoryStats.regions.find(f => f.id === this.directoryActiveFilter) : []
      },
      filteredData () {
        return this.directory.filter(f => {
          let found = false
          f.regions.forEach(fr => {
            if (fr.id === this.currentFilter.id) found = true
          })
          if (found) return f
        })
      }
    },
    mounted () {
      if (this.directoryActiveFilter === '') {
        this.$router.push('/')
      }
    },
    methods: {
      ...mapMutations(['mutateDirectoryActiveFilter']),
      selectFilter (filter) {
        this.$router.push(`${Config.routerSettings.filterBy.region}${filter.slug}`)
        this.mutateDirectoryActiveFilter(filter.id)
      }
    },
    metaInfo () {
      return {
        title: `${Config.titles.directory.filterBy} ${Config.titles.directory.region.toLowerCase()}: ${this.currentFilter.name}`
      }
    }
  }
</script>
