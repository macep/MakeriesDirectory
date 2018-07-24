<template>
  <div class="panel-group" id="accordion" role="tablist" :aria-multiselectable="oneAtATime">
    <div class="panel panel-default">
      <div class="panel-heading" id="heading-all">
        <h4 class="panel-title">
          <v-touch tag="a" @tap="showAllSuppliersOn">{{searchAllTitle}}</v-touch>
        </h4>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading" role="tab" id="heading-location">
        <h4 class="panel-title">
          <v-touch tag="a"role="button" @tap="selectClickedElement(`collapse-location`)" data-toggle="collapse" data-parent="#accordion" aria-expanded="item-location" aria-controls="collapse-location">
            Regions
          </v-touch>
        </h4>
      </div>

      <div id="collapse-location" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-location">
        <div class="panel-body">
          <ul>
            <v-touch tag="li" @tap="gotoRoute(filter.url)" v-for="filter in directoryFilterDataCollection" :key="filter.el">
              <span>{{filter.el}} ({{filter.occurences}})</span>
            </v-touch>
          </ul>
        </div>
      </div>
    </div>

    <div class="panel panel-default" v-if="route.name !== 'FilterAZ'">
      <div class="panel-heading" id="heading-az">
        <h4 class="panel-title">
          <v-touch @tap="gotoRoute(azRoute)">{{azTitle}}</v-touch>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'makeries-menu',
    props: ['oneAtATime', 'accData'],
    mounted () {
      if (this.directory.length < 1) {
        this.loadDirectory()
      }
    },
    data () {
      return {
        azTitle: Config.titles.directory.directoryAZ,
        azRoute: Config.routerSettings.filterAZ,
        featuredSuppliers: Config.titles.directory.featuredSuppliers
      }
    },
    computed: {
      ...mapGetters(['directoryFilterData', 'directory', 'isMobile', 'showAllSuppliers', 'route']),
      directoryFilterDataCollection () {
        if (this.directoryFilterData.regions !== undefined && this.directoryFilterData.regions.data.length > 0) {
          return this.directoryFilterData.regions.data
        }
      },
      searchAllTitle () {
        return `${Config.titles.searchAll} ${this.directory.length} ${Config.titles.suppliers}`
      }
    },
    methods: {
      ...mapActions(['loadDirectory']),
      panelStyle (val) {
        return {
          height: val ? '' : '0'
        }
      },
      selectClickedElement (ref) {
        const el = document.getElementById(ref)
        el.classList[(el.classList[2] === 'in') ? 'remove' : 'add']('in')
      },
      showAllSuppliersOn () {
        this.$store.commit('mutateShowAllSuppliers', true)
        this.$router.push('/directory')
        this.closeMobileMenu()
      },
      gotoRoute (url) {
        this.$router.push(url)
        this.closeMobileMenu()
      },
      closeMobileMenu () {
        if (this.isMobile) {
          this.$store.commit('mutateMobileMenuVisibile', false)
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  #heading-regions
    margin-bottom: 6px
</style>
