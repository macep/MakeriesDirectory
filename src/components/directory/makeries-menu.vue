<template>
  <div class="panel-group" id="accordion" role="tablist" :aria-multiselectable="oneAtATime">
    <div class="panel panel-default">
      <div class="panel-heading" id="heading-all">
        <h4 class="panel-title" :class="">
          <router-link to="/directory/">
            Search all 272 suppliers
          </router-link>
        </h4>
      </div>
    </div>

    <div class="panel panel-default" v-for="(filter, value) in directoryFilterDataCollection" v-if="filter.data.length > 0" :key="filter.el">
      <div class="panel-heading" role="tab" :id="'heading-' + value">
        <h4 class="panel-title" :class="{'open': 'item-' + value}">
          <v-touch tag="a" role="button" data-toggle="collapse" data-parent="#accordion" :aria-expanded="'item-' + value" :aria-controls="'collapse-' + value">
            {{filter.name}}
          </v-touch>
        </h4>
      </div>
      <div :id="'collapse-' + value" class="panel-collapse collapse" :class="{'in': 'item-' + value}" :style="panelStyle('item-' + value)" role="tabpanel" :aria-labelledby="'heading-' + value">
        <div class="panel-body">
          <ul>
            <li v-for="filterItem in filter.data" :key="filter.el">
              <router-link :to="filterItem.url">{{filterItem.el}}</router-link> ({{filterItem.occurences}})
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading" id="heading-az">
        <h4 class="panel-title" :class="">
          <router-link to="/directory-az/">
            Directory A-Z
          </router-link>
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'

  export default {
    name: 'makeries-menu',
    props: ['oneAtATime', 'accData'],
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['directoryFilterData']),
      directoryFilterDataCollection () {
        console.log(this.directoryFilterData)
        return this.directoryFilterData
      }
    },
    methods: {
      journalByCatIdRoute (slug, id) {
        return `${Config.routerSettings.category}${id}/${slug}`
      },
      panelStyle (val) {
        return {
          height: val ? '' : '0'
        }
      }
    }
  }
</script>
