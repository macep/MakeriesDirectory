<template>
  <div class="panel-group" id="accordion" role="tablist" :aria-multiselectable="oneAtATime">
    <div class="panel panel-default">
      <div class="panel-heading" id="heading-all">
        <h4 class="panel-title">
          <v-touch tag="a" @tap="showAllSuppliersOn">{{searchAllTitle}}</v-touch>
        </h4>
      </div>
    </div>

    <div class="panel panel-default" v-for="(filter, value) in directoryFilterDataCollection" v-if="filter.data.length > 0" :key="filter.el">
      <!-- FIXME temp hiding everything but regions-->
      <div class="panel-heading" role="tab" :id="`heading-${value}`" v-if="value==='regions'">
        <h4 class="panel-title" :class="{'open': `item-${value}`}">
          <v-touch tag="a"role="button" @tap="selectClickedElement(`collapse-${value}`)" data-toggle="collapse" data-parent="#accordion" :aria-expanded="`item-${value}`" :aria-controls="`collapse-${value}`">
            {{filter.name}}
          </v-touch>
        </h4>
      </div>
      <!-- FIXME temp hiding everything but regions-->
      <div :id="`collapse-${value}`" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="`heading-${value}`" v-if="value==='regions'">
        <div class="panel-body">
          <ul>
            <v-touch tag="li" @tap="gotoRoute(filterItem.url)" v-for="filterItem in filter.data" :key="filter.el">
              <span>{{filterItem.el}} ({{filterItem.occurences}})</span>
            </v-touch>
          </ul>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
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
    computed: {
      ...mapGetters(['directoryFilterData', 'directory', 'isMobile', 'showAllSuppliers']),
      directoryFilterDataCollection () {
        return this.directoryFilterData
      },
      searchAllTitle () {
        return `${Config.titles.searchAll} ${this.directory.length} ${Config.titles.suppliers}`
      },
      azTitle () {
        return Config.titles.directory.directoryAZ
      },
      azRoute () {
        return Config.routerSettings.filterAZ
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

<!-- FIXME temp hiding everything but regions-->
<style scoped lang="sass">
  #heading-regions
    margin-bottom: 6px
</style>
