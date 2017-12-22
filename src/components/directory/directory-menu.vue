<template>
  <div class="panel-group" id="accordion" role="tablist" :aria-multiselectable="oneAtATime">
    <div class="panel panel-default">
      <div class="panel-heading" id="heading-all">
        <v-touch @tap="closeMobileMenu" tag="h4" class="panel-title">
          <v-touch tag="a" @tap="showAllSuppliersOn">
            {{searchAllTitle}}
          </v-touch>
        </v-touch>
      </div>
    </div>

    <div class="panel panel-default" v-for="(filter, value) in directoryFilterDataCollection" v-if="filter.data.length > 0" :key="filter.el">
      <div class="panel-heading" role="tab" :id="'heading-' + value">
        <h4 class="panel-title" :class="{'open': 'item-' + value}">
          <v-touch tag="a"role="button" @tap="selectClickedElement" data-toggle="collapse" data-parent="#accordion" :aria-expanded="'item-' + value" :aria-controls="'collapse-' + value">
            {{filter.name}}
          </v-touch>
        </h4>
      </div>
      <div :id="'collapse-' + value" class="panel-collapse collapse" role="tabpanel" :aria-labelledby="'heading-' + value">
        <div class="panel-body">
          <ul>
            <v-touch tag="li" @tap="closeMobileMenu" v-for="filterItem in filter.data" :key="filter.el">
              <router-link :to="filterItem.url">{{filterItem.el}}</router-link> ({{filterItem.occurences}})
            </v-touch>
          </ul>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading" id="heading-az">
        <v-touch @tap="closeMobileMenu" tag="h4" class="panel-title">
          <router-link :to="azRoute">
            {{azTitle}}
          </router-link>
        </v-touch>
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
    data () {
      return {}
    },
    mounted () {
      this.loadDirectory()
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
      selectClickedElement (event) {
        let elID = event.target.attributes[3].nodeValue.split('-')[1]
        this.toggleClass(document.querySelector('#collapse-' + elID))
      },
      toggleClass (el) {
        if (el.classList[2] === 'in') {
          el.classList.remove('in')
        } else {
          el.classList.add('in')
        }
      },
      showAllSuppliersOn () {
        this.$store.commit('mutateShowAllSuppliers', true)
        this.$router.push('/directory')
      },
      closeMobileMenu () {
        if (this.isMobile) {
          this.$store.commit('mutateMobileMenuVisibile', false)
        }
      }
    }
  }
</script>
