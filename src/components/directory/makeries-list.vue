<template>
  <div class="row">
    <div :class="{'col-xs-6 col-md-4': viewType === 'grid', 'col-xs-12': viewType === 'list'}" class="maker" v-for="maker in makeries" :key="maker.id">
      <template v-if="viewType === 'grid'">
        <makeries-list-item :route="maker.slug" :id="maker.id" :img="maker.images[0] ? maker.images[0].path : img" :title="maker.name" :content="maker.brief_description || ''"/>
      </template>
      <template v-else>
        <router-link :to="maker.slug">
          <h3 class="sm-margin-bottom">{{maker.name}}</h3>
        </router-link>

        <p class="brief">{{description}}: {{maker.brief_description}}</p>

        <enumerate :collection="maker.regions || []" :category="region"/>

        <enumerate :collection="maker.products || []" :category="productTypes"/>

        <enumerate :collection="maker.services || []" :category="serviceTypes"/>

        <enumerate :collection="maker.materials || []" :category="materials"/>
      </template>
    </div>
    <div v-if="paginated && !allMakersLoaded && (makeries.length < directoryStats.makers)" class="col-xs-12 text-center xlg-padding">
      <a v-if="!showActivityIndicator" href="#" class="btn btn-link" @click.prevent="loadDirectory">
        Load next page
      </a>
      <template v-if="showActivityIndicator">Loading...</template>
      <a v-if="!showActivityIndicator" href="#" class="btn btn-link" @click.prevent="loadAllDirectory">
        Load all
      </a>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Config from '../../api/app.config'
  import makeriesListItem from './makeries-list-item'
  import enumerate from '../common/enumerate'

  export default {
    name: 'directory-page',
    components: { makeriesListItem, enumerate },
    props: {
      paginated: {
        type: Boolean,
        required: false
      },
      makeries: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        region: Config.titles.directory.region,
        materials: Config.titles.directory.materials,
        productTypes: Config.titles.directory.productTypes,
        serviceTypes: Config.titles.directory.serviceTypes,
        description: Config.titles.directory.description,
        tags: Config.titles.directory.tags,
        img: `http://via.placeholder.com/600x360?text=Maker's Image`,
        allMakersLoaded: false
      }
    },
    computed: {
      ...mapGetters([
        'viewType',
        'showActivityIndicator',
        'directoryStats'
      ])
    },
    methods: {
      ...mapActions(['loadDirectory', 'loadAllDirectory'])
    }
  }
</script>
