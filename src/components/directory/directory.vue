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
                <input v-if="searchTarget === 'database'" id="search-placeholder" v-model="searchTerm"
                       :placeholder="searchPlaceholder" type="search" autocomplete="off">
                <input v-if="searchTarget === 'results'" id="filter-placeholder" v-model="filterTerm"
                       :placeholder="filterPlaceholder" type="search" autocomplete="off">

                <span class="search-results" v-if="searchTarget === 'database' && searchTerm.length > 0">
                  <template v-if="searchingDB">
                    {{searchingDBLabel}}
                  </template>
                  <template v-else="">
                    {{makeriesSearchResults.length}} {{searchResultsLabel}}
                  </template>
                </span>
                <span class="search-results"
                      v-if="searchTarget === 'results' && filterTerm.length > 0">{{methodResults.length}} {{searchResultsLabel}}</span>

                <div class="search-target" id="search-target">
                  <v-touch class="active-target" @tap="searchTargetVisibility = !searchTargetVisibility">
                    <i :class="searchTarget === 'database' ? 'icon-database' : 'icon-filter_list'"></i>
                  </v-touch>

                  <ul v-show="searchTargetVisibility">
                    <v-touch tag="li" @tap="setSearchTarget('database')"> {{searchDB}} &nbsp; <i class="icon-database"/> </v-touch>
                    <v-touch tag="li" @tap="setSearchTarget('results')"> {{filterResults}} &nbsp; <i class="icon-filter_list"/></v-touch>
                  </ul>
                </div>
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
                <v-touch tag="li" @tap="selectFilter(filter)" v-for="filter in directoryStats.regions" :key="filter.id">
                  <span>{{filter.name}} ({{filter.occurence}})</span>
                </v-touch>
              </dropdown>
            </li>
          </ul>
        </div>

        <div class="col-xs-12">
          <h1 v-if="searchTerm !== ''">{{searchResultsLabel}}</h1>
          <h1 v-if="showAllSuppliers && filterTerm !== ''">{{methodResults.length}} supplier
            <template v-if="methodResults.length !== 1">s</template>
            filtered
          </h1>
          <h1 v-if="showAllSuppliers && filterTerm === '' && searchTerm === ''">
            {{directory.length}} suppliers loaded</h1>
          <h1 v-if="!showAllSuppliers && searchTerm === '' && filterTerm === ''">Featured Suppliers</h1>
          <h1 v-if="!showAllSuppliers && searchTerm === '' && filterTerm !== ''">Featured Suppliers filtered</h1>
        </div>

        <div class="col-xs-12">
          <makeries-list
            :makeries="searchTarget === 'database' && searchTerm.length > 0 ? makeriesSearchResults : makeriesList"
            :paginated="showAllSuppliers"/>
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
  import {dropdown} from 'vue-strap'
  import {shuffle} from 'lodash'
  import {getSS} from '../../api/browserstorage'
  import apiService from '../../api/api.service'
  import {sortObjectProperties, azDirectory} from '../../modules/utils'

  export default {
    name: 'directory-page',
    components: {
      makeriesMenu,
      makeriesList,
      viewType,
      postsSlider,
      dropdown
    },
    mixins: [waitDirectoryData],
    data () {
      return {
        filterTerm: '',
        searchTerm: '',
        searchingDB: false,
        makeriesSearchResults: [],
        searchTarget: 'database',
        searchTargetVisibility: false,
        filterPlaceholder: Config.titles.filterPlaceholder,
        searchDB: Config.titles.searchDB,
        filterResults: Config.titles.filterResults,
        searchPlaceholder: Config.titles.searchPlaceholder,
        searchResultsLabel: Config.titles.searchResultsLabel,
        filterResultsLabel: Config.titles.filterResultsLabel,
        searchingDBLabel: Config.titles.searchingDBLabel,
        defaultAllToggle: false,
        options: {
          keys: ['name',
            'brief_description',
            'regions',
            'products',
            'services',
            'materials'],
          distance: 0,
          matchAllTokens: true,
          tokenize: true
        },
        componentResults: [],
        methodResults: [],
        azTitle: Config.titles.directory.directoryAZ,
        azRoute: Config.routerSettings.filterAZ,
        featuredSuppliers: Config.titles.featuredSuppliers,
        directoryFeaturedListShuffled: null
      }
    },
    computed: {
      ...mapGetters([
        'directory',
        'directoryStats',
        'viewType',
        'isMobile',
        'resultsPerPage',
        'showAllSuppliers',
        'directoryFeaturedList',
        'directoryBannersPosts'
      ]),
      makeriesList () {
        return this.filterTerm !== '' ? this.methodResults : this.showAllSuppliers ? this.directory : this.directoryFeaturedListShuffled || this.directoryFeaturedList
      },
      directoryFeatured () {
        const featured = this.directory.filter(maker => maker.featured === 'yes')
        return featured.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
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
        return `${Config.titles.suppliers}`
      }
    },
    watch: {
      searchTerm () {
        setTimeout(async () => {
          if (this.searchTerm !== '') {
            this.searchingDB = true
            this.mutateShowAllSuppliers(true)
            const search = await apiService.search(this.searchTerm)
            this.makeriesSearchResults = search.data
            this.searchingDB = false
          }
        }, 500)
      },
      filterTerm () {
        setTimeout(() => {
          this.$search(this.filterTerm, this.showAllSuppliers ? this.directory : this.directoryFeaturedListShuffled || this.directoryFeaturedList, this.options).then(results => {
            this.methodResults = results
          })
        }, 500)
      },
      async showAllSuppliers () {
        this.searchTerm = ''
        this.filterTerm = ''
        this.focusSearchInputField()

        this.directoryFeaturedListShuffled = shuffle(this.directoryFeaturedList)

        if (!this.showAllSuppliers && this.directoryFeaturedList.length < 1) {
          this.loadDirectoryFeaturedList()
        }
        if (this.showAllSuppliers && this.directory.length < 1) {
          const pagesLoaded = +getSS('resultsPageNumberLoaded')

          if (pagesLoaded === 0) {
            this.loadDirectory()
          } else {
            for (let i = 1; i <= pagesLoaded; i++) {
              this.mutateActivityIndicator(true)
              try {
                const data = await apiService.callApi('maker', {page: i, per_page: this.resultsPerPage}, 8.64e+7)
                this.mutateDirectory(this.directory.concat(data.data))
                this.mutateDirectoryAZ(sortObjectProperties(azDirectory(this.directory)))
                this.mutateActivityIndicator(false)
              } catch (err) {
                console.error(err)
                this.mutateActivityIndicator(false)
              }
            }
          }
        }
      }
    },
    async created () {
      if (this.directoryStats.length < 1) {
        this.$store.dispatch('loadDirectoryStats')
      }
      if (!this.showAllSuppliers && this.directoryFeaturedList.length < 1) {
        this.$store.dispatch('loadDirectoryFeaturedList')
      }
      if (!this.showAllSuppliers && this.directoryFeaturedList.length > 0) {
        this.directoryFeaturedListShuffled = shuffle(this.directoryFeaturedList)
      }

      document.addEventListener('click', event => {
        if (!document.getElementById('search-target').contains(event.target)) {
          this.searchTargetVisibility = false
        }
      })
    },
    methods: {
      ...mapActions([
        'loadDirectory',
        'loadDirectoryStats',
        'loadDirectoryFeaturedList'
      ]),
      ...mapMutations([
        'mutateActivityIndicator',
        'mutateDirectory',
        'mutateDirectoryAZ',
        'mutateShowAllSuppliers',
        'mutateDirectoryActiveFilter'
      ]),
      showAllSuppliersOn () {
        this.mutateShowAllSuppliers(true)
        this.$router.push('/directory')
      },
      showFeaturedOn () {
        this.mutateShowAllSuppliers(false)
        this.$router.push('/directory')
      },
      selectFilter (filter) {
        this.mutateDirectoryActiveFilter(filter.id)
        this.gotoRoute(`/directory/filter-by/location/${filter.slug}`)
      },
      gotoRoute (url) {
        this.$router.push(url)
      },
      setSearchTarget (target) {
        this.focusSearchInputField()
        this.searchTarget = target
        this.searchTargetVisibility = false
      },
      focusSearchInputField () {
        const search = document.getElementById('search-placeholder')
        const filter = document.getElementById('filter-placeholder')
        this.searchTarget === 'results' ? filter.focus() : search.focus()
      }
    },
    metaInfo () {
      return {
        title: `${Config.titles.searchAll} ${this.directory.length} ${Config.titles.suppliers}`
      }
    }
  }
</script>
