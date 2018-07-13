<template>
  <div id="directory-az" class="row page">
    <div class="col-xs-12" v-if="!isMobile">
      <makeries-menu/>
    </div>

    <div class="col-xs-12">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <h3 class="no-margin-top">
            {{filterAZ}}
          </h3>
        </div>
        <div class="col-xs-12 az-list" v-for="(key, value) in directoryAZ" :key="value">
          <div class="row">
            <div class="col-xs-12">
              <h2>{{value}}</h2>
            </div>
            <div class="col-xs-6 col-sm-4" v-for="item in directoryAZ[value]" :key="item.id">
              <router-link :to="item.routeTo">{{item.name}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import makeriesMenu from './directory-menu.vue'

  export default {
    name: 'filter-az',
    components: {makeriesMenu},
    data () {
      return {
        filterAZ: Config.titles.directory.directoryAZ
      }
    },
    computed: {
      ...mapGetters(['directoryAZ', 'isMobile'])
    },
    metaInfo () {
      return {
        title: `${Config.titles.directory.directoryAZ}`
      }
    },
    watch: {
      directoryAZ () {
        for (let prop in this.directoryAZ) {
          if (this.directoryAZ.hasOwnProperty(prop)) {
            this.$store.commit('mutateActivityIndicator', false)
            break
          }
        }
      }
    }
  }
</script>
