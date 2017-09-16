<template>
  <div class="row">
    <div :class="{'col-xs-6 col-md-4': viewType === 'grid', 'col-xs-12': viewType === 'list'}" class="maker" v-for="maker in makeries" :key="maker.id">
      <template v-if="viewType === 'grid'">
        <banner :route="maker.routeTo" :img="maker.images[0].url || ''" :title="maker.name" :content="maker.briefDescription || ''" :overlayed="true" :escaped="true"/>
      </template>
      <template v-else>
        <router-link :to="maker.routeTo">
          <h3>{{maker.name}}</h3>
        </router-link>

        <p>{{region}}: {{maker.region.name}}</p>

        <p v-if="maker.businessTypes !== undefined && maker.businessTypes.length > 0" class="list-item">
          <span>{{businessTypes}}:</span>
          <span v-for="(bt, index) in maker.businessTypes" :key="index">{{bt.name}}<template v-if="index < maker.businessTypes.length - 1">, </template></span>
        </p>

        <p v-if="maker.products !== undefined && maker.products.length > 0" class="list-item">
          <span>{{productTypes}}:</span>
          <span v-for="(p, index) in maker.products" :key="index">{{p.name}}<template v-if="index < maker.products.length - 1">, </template></span>
        </p>

        <p v-if="maker.serviceTypes !== undefined && maker.serviceTypes.length > 0" class="list-item">
          <span>{{serviceTypes}}:</span>
          <span v-for="(s, index) in maker.serviceTypes" :key="index">{{s.name}}<template v-if="index < maker.serviceTypes.length - 1">, </template></span>
        </p>

        <p class="brief">{{description}}: {{maker.briefDescription}}</p>

        <p v-if="maker.tags !== undefined && maker.tags.length > 0" class="list-item">
          <span>{{tags}}:</span>
          <span v-for="(t, index) in maker.tags" :key="index" class="tag">{{t}}<template v-if="index < maker.tags.length - 1">, </template></span>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import banner from '../common/banner'

  export default {
    name: 'directory-page',
    components: {banner},
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
    props: {
      makeries: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapGetters(['viewType'])
    }
  }
</script>
