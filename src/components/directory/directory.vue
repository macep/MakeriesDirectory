<template>
  <div id="directory" class="row" :class="'view-' + viewType">
    <div class="col-xs-3">
      <makeries-menu/>
    </div>
    <div class="col-xs-9">
      <div class="row small-gutter">
        <div class="col-xs-12">
          <div class="row no-gutter">
            <div class="col-xs-10 lg-margin-bottom">
              <search-directory/>
            </div>
            <div class="col-xs-2 lg-margin-bottom">
              <view-type/>
            </div>
          </div>
        </div>
        <div :class="{'col-xs-4': viewType === 'grid', 'col-xs-12': viewType === 'list'}" class="maker" v-for="maker in directory" :key="maker.id">
          <template v-if="viewType === 'grid'">
            <banner :route="maker.routeTo" :img="maker.images[0].url" :title="maker.name" :content="maker.briefDescription || ''" :overlayed="true" :escaped="true"/>
          </template>
          <template v-else>
            <router-link :to="maker.routeTo">
              <h3>{{maker.name}}</h3>
            </router-link>

            <p>{{region}}: {{maker.region.name}}</p>

            <p v-if="maker.businessTypes !== undefined && maker.businessTypes.length > 0" class="list-item">
              <span>{{businessTypes}}: </span>
              <span v-for="(bt, index) in maker.businessTypes" :key="index">{{bt.name}}<span v-if="index < maker.businessTypes.length - 1">, </span></span>
            </p>

            <p v-if="maker.products !== undefined && maker.products.length > 0" class="list-item">
              <span>{{productTypes}}: </span>
              <span v-for="(p, index) in maker.products" :key="index">{{p.name}}<span v-if="index < maker.products.length - 1">, </span></span>
            </p>

            <p v-if="maker.serviceTypes !== undefined && maker.serviceTypes.length > 0" class="list-item">
              <span>{{serviceTypes}}: </span>
              <span v-for="(s, index) in maker.serviceTypes" :key="index">{{s.name}}<span v-if="index < maker.serviceTypes.length - 1">, </span></span>
            </p>

            <p class="brief">{{description}}: {{maker.briefDescription}}</p>

            <p v-if="maker.tags !== undefined && maker.tags.length > 0" class="list-item">
              <span>{{tags}}: </span>
              <span v-for="(t, index) in maker.tags" :key="index" class="tag">{{t}}<span v-if="index < maker.tags.length - 1">, </span> </span>
            </p>
          </template>
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
  import searchDirectory from './search-directory.vue'
  import viewType from './view-type.vue'

  export default {
    name: 'directory-page',
    components: {banner, makeriesMenu, searchDirectory, viewType},
    data () {
      return {
        region: Config.titles.directory.region,
        businessTypes: Config.titles.directory.businessTypes,
        productTypes: Config.titles.directory.productTypes,
        serviceTypes: Config.titles.directory.serviceTypes,
        description: Config.titles.directory.description,
        tags: Config.titles.directory.tags
      }
    },
    computed: {
      ...mapGetters(['directory', 'viewType'])
    }
  }
</script>
