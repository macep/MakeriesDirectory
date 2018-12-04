<template>
  <div id="directory" class="row" :class="'view-' + viewType">
    <div class="col-xs-12">
      <div class="row small-gutter">
        <div class="col-xs-12" :style="sliderStyle">
          <posts-slider :data="directoryBannersPosts"/>
        </div>

        <div class="col-xs-12">
          <div class="row no-gutter">
            <div class="col-sm-10 col-md-11 pull-left search-directory-wrapper lg-margin-bottom">
              <div id="search-engine">
                <input type="search" v-model="term" :placeholder="searchPlaceholder">
                <span class="search-results" v-if="term.length > 0">{{methodResults.length}} {{searchResults}}</span>
              </div>
            </div>
            <div class="col-sm-2 col-md-1 pull-left view-type-wrapper lg-margin-bottom">
              <view-type/>
            </div>
          </div>
        </div>

        <div class="col-xs-12" v-if="!isMobile">
          <ul id="directory-menu-horizontal" class="list-inline">
            <li>
              <v-touch tag="a" @tap="showAllSuppliersOn">{{searchAllTitle}}</v-touch>
            </li>
            <li>
              <v-touch tag="a" @tap="showFeaturedOn">{{ featuredSuppliers }}</v-touch>
            </li>
            <li>
              <v-touch tag="a" @tap="gotoRoute(azRoute)">{{azTitle}}</v-touch>
            </li>
            <li>
              <dropdown text="Filter by Region" type="primary">
                <v-touch tag="li" @tap="gotoRoute(filter.url)" v-for="filter in directoryFilterDataCollection" :key="filter.el">
                  <span>{{filter.el}} ({{filter.occurences}})</span>
                </v-touch>
              </dropdown>
            </li>
          </ul>
        </div>

        <div class="col-xs-12">
          <h1 v-if="term !== ''">{{searchResults}}</h1>
          <h1 v-else-if="showAllSuppliers">All suppliers {{directory.length}}</h1>
          <h1 v-else>Featured Suppliers</h1>
        </div>
        <div class="col-xs-12">
          <makeries-list :makeries="term !== '' ? methodResults : showAllSuppliers ? directory : directoryFeatured"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import Config from '../../api/app.config'
  import makeriesMenu from './directory-menu.vue'
  import makeriesList from './makeries-list.vue'
  import viewType from './view-type.vue'
  import waitDirectoryData from '../../mixins/waitDirectoryData'
  import postsSlider from '../common/posts-slider.vue'
  import { dropdown } from 'vue-strap'

  export default {
    name: 'directory-page',
    mixins: [waitDirectoryData],
    data () {
      return {
        term: '',
        searchPlaceholder: Config.titles.searchPlaceholder,
        searchResults: Config.titles.searchResults,
        defaultAllToggle: false,
        options: {
          keys: ['name', 'briefDescription']
        },
        componentResults: [],
        methodResults: [],
        keys: ['name', 'briefDescription', 'region', 'products', 'businessTypes', 'serviceTypes'],
        azTitle: Config.titles.directory.directoryAZ,
        azRoute: Config.routerSettings.filterAZ,
        featuredSuppliers: Config.titles.featuredSuppliers
      }
    },
    components: {
      makeriesMenu,
      makeriesList,
      viewType,
      postsSlider,
      dropdown
    },
    computed: {
      ...mapGetters([
        'directoryFilterData',
        'directory',
        'directoryStats',
        'viewType',
        'isMobile',
        'showAllSuppliers',
        'directoryBannersPosts'
      ]),
      // TODO: fix!
      directoryBanner () {
        return this.posts.find(item => item.id === Config.pagesIDs.directoryBanner)
      },
      directoryFeatured () {
        const featured = this.directory.filter(maker => maker.featured === 'yes')
        return featured.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      },
      // TODO: probably replace with new stats response
      directoryFilterDataCollection () {
        if (this.directoryFilterData.regions !== undefined && this.directoryFilterData.regions.data.length > 0) {
          return this.directoryFilterData.regions.data
        }
      },
      sliderStyle () {
        if (!this.isMobile) {
          return {
            maxHeight: Config.directoryBannerHeight,
            overflowY: 'hidden',
            marginBottom: '20px'
          }
        } else {
          return null
        }
      },
      searchAllTitle () {
        return `${Config.titles.searchAll} ${this.directory.length} ${Config.titles.suppliers}`
      }
    },
    watch: {
      term () {
        this.$search(this.term, this.directory, this.options).then(results => {
          this.methodResults = results
        })
      }
    },
    mounted () {
      if (this.directory.length < 1) {
        this.loadDirectory()
      }
      if (this.directoryStats.length < 1) {
        this.loadDirectoryStats()
      }
    },
    methods: {
      ...mapActions(['loadDirectory', 'loadDirectoryStats']),
      ...mapMutations(['mutateShowAllSuppliers', 'mutateShowAllSuppliers']),
      showAllSuppliersOn () {
        this.mutateShowAllSuppliers(true)
        this.$router.push('/directory')
      },
      showFeaturedOn () {
        this.mutateShowAllSuppliers(false)
        this.$router.push('/directory')
      },
      gotoRoute (url) {
        this.$router.push(url)
      }
    },
    metaInfo () {
      return {
        title: `${Config.titles.searchAll} ${this.directory.length} ${Config.titles.suppliers}`
      }
    }
  }
</script>
