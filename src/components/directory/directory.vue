<template>
  <div id="directory" class="row" :class="'view-' + viewType">
    <div class="col-sm-3" v-if="!isMobile">
      <makeries-menu/>
    </div>
    <div class="col-sm-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <posts-slider :data="directoryBannersPosts"/>
        </div>

        <div class="col-xs-12">
          <div class="row no-gutter">
            <div class="col-sm-10 col-md-11 pull-left search-directory-wrapper lg-margin-bottom">
              <div id="search-engine">
                <input type="search" v-model="term" :placeholder="searchPlaceholder">
                <span class="search-results" v-if="term.length > 0">{{methodResults.length}} Search results</span>
              </div>
            </div>
            <div class="col-sm-2 col-md-1 pull-left view-type-wrapper lg-margin-bottom">
              <view-type/>
            </div>
          </div>
        </div>
        <div class="col-xs-12">
          <h1 v-if="term != ''">Search results</h1>
          <h1 v-else-if="showAllSuppliers">All suppliers {{directoryEnabled.length}}</h1>
          <h1 v-else>Featured Suppliers</h1>
        </div>
        <div class="col-xs-12">
          <makeries-list :makeries="term != '' ? methodResults : showAllSuppliers ? directoryEnabled : directoryFeatured"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import makeriesMenu from './directory-menu.vue'
  import makeriesList from './makeries-list.vue'
  import viewType from './view-type.vue'
  import waitDirectoryData from '../../mixins/waitDirectoryData'
  import postsSlider from '../common/posts-slider.vue'

  export default {
    name: 'directory-page',
    mixins: [waitDirectoryData],
    data () {
      return {
        term: '',
        searchPlaceholder: Config.titles.searchPlaceholder,
        defaultAllToggle: false,
        options: {
          keys: ['name', 'briefDescription']
        },
        componentResults: [],
        methodResults: [],
        keys: ['name', 'briefDescription', 'region', 'products', 'businessTypes', 'serviceTypes']
      }
    },
    components: {makeriesMenu, makeriesList, viewType, postsSlider},
    computed: {
      ...mapGetters(['directory', 'viewType', 'isMobile', 'showAllSuppliers', 'directoryBannersPosts']),
      directoryBanner () {
        return this.posts.find(item => item.id === Config.pagesIDs.directoryBanner)
      },
      directoryEnabled () {
        return this.directory.filter(maker => maker.enabled)
      },
      directoryFeatured () {
        let featured = this.directory.filter(maker => {
          return maker.featured
        })

        return featured.sort((a, b) => {
          return new Date(b.created) - new Date(a.created)
        })
      }
    },
    metaInfo () {
      return {
        title: `${Config.titles.searchAll} ${this.directory.length} ${Config.titles.suppliers}`
      }
    },
    methods: {
      toggle () {
        this.defaultAllToggle = !this.defaultAllToggle
        this.$forceUpdate()
      }
    },
    watch: {
      term () {
        this.$search(this.term, this.directoryEnabled, this.options).then(results => {
          this.methodResults = results
        })
      }
    }
  }
</script>
