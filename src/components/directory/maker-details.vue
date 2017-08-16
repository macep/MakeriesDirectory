<template>
  <div id="maker-details" class="row small-gutter">
    <div class="col-xs-9">
      <div class="box left">
        <router-link v-if="back" :to="back" class="back-link">go back</router-link>
        <h3>{{maker.name}}</h3>
        <p class="brief">{{maker.briefDescription}}</p>
        <img :src="maker.images[0].url" alt="">
        <p class="long">{{maker.longDescription}}</p>
        <p class="address">{{maker.address}}</p>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="box right">
        <div v-if="maker.businessTypes !== undefined && maker.businessTypes.length > 0" class="list-item">
          <h6>{{businessTypes}}</h6>
          <div class="item">
            <span v-for="(bt, index) in maker.businessTypes" :key="index">
              <router-link to="/"> {{bt.name}}</router-link>
              <span v-if="index < maker.businessTypes.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.products !== undefined && maker.products.length > 0" class="list-item">
          <h6>{{productTypes}}</h6>
          <div class="item">
            <span v-for="(p, index) in maker.products" :key="index">
              <router-link to="/"> {{p.name}}</router-link>
              <span v-if="index < maker.products.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.serviceTypes !== undefined && maker.serviceTypes.length > 0" class="list-item">
          <h6>{{serviceTypes}}</h6>
          <div class="item">
            <span v-for="(s, index) in maker.serviceTypes" :key="index">
              <router-link to="/"> {{s.name}}</router-link>
              <span v-if="index < maker.serviceTypes.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.processedTags !== undefined && maker.processedTags.length > 0" class="list-item">
          <h6>{{tags}}</h6>
          <div class="item">
            <span v-for="(t, index) in maker.processedTags" :key="index">
              <router-link to="/"> {{t.name}}</router-link>
              <span v-if="index < maker.processedTags.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.region" class="list-item">
          <h6>{{region}} </h6>
          <div class="item">
            <router-link to="/"> {{maker.region.name}}</router-link>
          </div>
        </div>

        <div v-if="maker.telephone || maker.email || maker.address" class="list-item">
          <h6>{{contactDetails}}</h6>
          <div class="item">
            <div v-if="maker.email"><a :mail='maker.mail' href="'mailto:' + maker.email">{{maker.email}}</a></div>
            <div v-if="maker.telephone">{{maker.telephone}}</div>
            <div v-if="maker.address">{{maker.address}}</div>
          </div>
        </div>

        <div v-if="maker.openingHours" class="list-item">
          <h6>{{openingHours}}</h6>
          <div class="item">
            {{maker.openingHours}}
          </div>
        </div>

        <div v-if="maker.facebook || maker.instagram || maker.twitter" class="list-item">
          <h6>{{socialNetworks}}</h6>
          <div class="item">
            <div v-if="maker.facebook"><a :href="maker.facebook" target="_new">Join us on Facebook</a></div>
            <div v-if="maker.instagram"><a :href="maker.instagram" target="_new">Follow us on Instagram</a></div>
            <div v-if="maker.twitter"><a :href="maker.twitter" target="_new">Follow us on Twitter</a></div>
          </div>
        </div>

        <div v-if="maker.website" class="list-item">
          <h6>{{website}}</h6>
          <div class="item">
            <a :href="maker.website" target="_new">{{maker.website}}</a>
          </div>
        </div>

        <div v-if="maker.mapURL" class="list-item">
          <h6>{{map}}</h6>
          <div class="image-holder" id="embededMap">
            <google-map :pbcode="maker.mapURL"></google-map>
          </div>
        </div>

        <div v-if="maker.customer" class="list-item">
          <h6>{{customer}}</h6>
          <div class="item">
            {{maker.customer}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Config from '../../api/app.config'
  import googleMap from '../common/google-map'

  export default {
    name: 'maker-details',
    components: {googleMap},
    data () {
      return {
        region: Config.titles.directory.region,
        businessTypes: Config.titles.directory.businessTypes,
        productTypes: Config.titles.directory.productTypes,
        serviceTypes: Config.titles.directory.serviceTypes,
        contactDetails: Config.titles.directory.contactDetails,
        openingHours: Config.titles.directory.openingHours,
        socialNetworks: Config.titles.directory.socialNetworks,
        website: Config.titles.directory.website,
        map: Config.titles.directory.map,
        customer: Config.titles.directory.customer,
        tags: Config.titles.directory.tags
      }
    },
    computed: {
      ...mapGetters(['directory', 'route']),
      maker () {
        return this.directory.filter(maker => maker.id === +this.$route.path.split('/')[3])[0]
      },
      back () {
        let from = this.route.from.fullPath
        return from !== '/' ? from : null
      }
    }
  }
</script>
