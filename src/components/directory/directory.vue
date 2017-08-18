<template>
  <div id="directory" class="row" :class="'view-' + viewType">
    <div class="col-sm-3" v-if="!isMobile">
      <makeries-menu/>
    </div>
    <div class="col-sm-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <div class="row no-gutter">
            <div class="col-sm-10 col-md-11 pull-left search-directory-wrapper lg-margin-bottom">
              <div id="search-engine">
                <input type="search" v-model="term">
              </div>
            </div>
            <div class="col-sm-2 col-md-1 pull-left view-type-wrapper lg-margin-bottom">
              <view-type/>
            </div>
          </div>
        </div>
        <div class="col-xs-12">
          <makeries-list :makeries="term != '' ? methodResults : directoryEnabled"/>
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

  export default {
    name: 'directory-page',
    data () {
      return {
        term: '',
        defaultAllToggle: false,
        options: {
          keys: ['name', 'briefDescription']
        },
        componentResults: [],
        methodResults: [],
        keys: ['name', 'briefDescription', 'region', 'products', 'businessTypes', 'serviceTypes']
      }
    },
    components: {makeriesMenu, makeriesList, viewType},
    computed: {
      ...mapGetters(['directory', 'viewType', 'isMobile']),
      directoryEnabled () {
        return this.directory.filter(maker => maker.enabled)
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
