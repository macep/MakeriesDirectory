<template>
  <div id="directory-filter-by" class="row page">
    <div class="col-xs-3">
      <makeries-menu/>
    </div>
    <div class="col-xs-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <h3 class="no-margin-top">
            {{currentFilterType}}: {{currentFilterTypeValue}}
          </h3>
        </div>
        <div class="col-xs-4 maker" v-for="maker in filteredData" :key="maker.id">
          <banner :route="maker.routeTo" :img="maker.images[0].url" :title="maker.name" :content="maker.briefDescription || ''" :overlayed="true" :escaped="true"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import banner from '../common/banner'
  import makeriesMenu from './makeries-menu.vue'

  export default {
    name: 'filter-by',
    components: {banner, makeriesMenu},
    computed: {
      ...mapGetters(['directory']),
      currentFilterType () {
        let currentFilter = this.$route.path.split('/')[3]
        let filterTypes = Config.routerSettings.filterBy
        let rev = {}
        for (let key in filterTypes) {
          rev[filterTypes[key].split('/')[3]] = key
        }
        return rev[currentFilter]
      },
      currentFilterTypeValue () {
        return this.$route.path.split('/')[4]
      },
      filteredData () {
        return this.directory.filter(item => {
          if (item[this.currentFilterType].length > 0) {
            for (let i = 0; i < item[this.currentFilterType].length; i++) {
              if (this.currentFilterTypeValue === item[this.currentFilterType][i].pretty) {
                return item
              }
            }
          } else {
            return this.currentFilterTypeValue === item[this.currentFilterType].pretty
          }
        })
      }
    }
  }
</script>
