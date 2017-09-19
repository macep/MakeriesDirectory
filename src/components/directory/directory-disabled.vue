<template>
  <div id="directory-draft-makers" class="row" :class="'view-' + viewType">
    <div class="col-sm-3" v-if="!isMobile">
      <makeries-menu/>
    </div>
    <div class="col-sm-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <div class="row no-gutter">
            <div class="col-sm-10 col-md-11 pull-left search-directory-wrapper lg-margin-bottom">
              <h3 class="no-margin">{{draftMakers}}</h3>
            </div>
            <div class="col-sm-2 col-md-1 pull-left view-type-wrapper lg-margin-bottom">
              <view-type/>
            </div>
          </div>
        </div>
        <div class="col-xs-12">
          <makeries-list :makeries="directoryDisabled"/>
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
    name: 'directory-disabled-page',
    components: {makeriesMenu, makeriesList, viewType},
    data () {
      return {
        draftMakers: Config.titles.directory.draftMakers
      }
    },
    computed: {
      ...mapGetters(['directoryDisabled', 'viewType', 'isMobile'])
    },
    metaInfo () {
      return {
        title: `${Config.titles.listAll} ${this.directoryDisabled.length} ${Config.titles.directory.draft} ${Config.titles.suppliers}`
      }
    },
    watch: {
      directoryDisabled () {
        if (this.directoryDisabled.length > 0) {
          this.$store.commit('mutateActivityIndicator', false)
        }
      }
    }
  }
</script>
