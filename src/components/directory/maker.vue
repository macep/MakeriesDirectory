<template>
  <div id="maker" class="row small-gutter">
    <div class="col-xs-9">
      <div class="box">
        <router-link v-if="back" :to="back">go back</router-link>
        <h3>{{maker.name}}</h3>
        <p>{{maker.briefDescription}}</p>
        <img :src="maker.images[0].url" alt="">
        <p>{{maker.longDescription}}</p>
        <p>{{maker.address}}</p>
      </div>
    </div>
    <div class="col-xs-3">
      <div class="box">
        <div v-if="maker.businessTypes !== undefined && maker.businessTypes.length > 0" class="list-item">
          <h6>Business Type</h6>
          <div class="item">
            <span v-for="(bt, index) in maker.businessTypes" :key="index">
              <router-link to="/"> {{bt.name}}</router-link>
              <span v-if="index < maker.businessTypes.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.products !== undefined && maker.products.length > 0" class="list-item">
          <h6>Product types</h6>
          <div class="item">
            <span v-for="(p, index) in maker.products" :key="index">
              <router-link to="/"> {{p.name}}</router-link>
              <span v-if="index < maker.products.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.serviceTypes !== undefined && maker.serviceTypes.length > 0" class="list-item">
          <h6>SERVICES</h6>
          <div class="item">
            <span v-for="(s, index) in maker.serviceTypes" :key="index">
              <router-link to="/"> {{s.name}}</router-link>
              <span v-if="index < maker.serviceTypes.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.processedTags !== undefined && maker.processedTags.length > 0" class="list-item">
          <h6>TAGS</h6>
          <div class="item">
            <span v-for="(t, index) in maker.processedTags" :key="index">
              <router-link to="/"> {{t.name}}</router-link>
              <span v-if="index < maker.processedTags.length - 1">, </span>
            </span>
          </div>
        </div>

        <div v-if="maker.region" class="list-item">
          <h6>Region </h6>
          <div class="item">
            <router-link to="/"> {{maker.region.name}}</router-link>
          </div>
        </div>

        <div v-if="maker.telephone || maker.email || maker.address" class="list-item">
          <h6>CONTACT DETAILS</h6>
          <div class="item">
            <span v-if="maker.email"><a :mail='maker.mail' href="'mailto:' + maker.email">{{maker.email}}</a></span><br>
            <span v-if="maker.telephone">{{maker.telephone}}</span><br>
            <span v-if="maker.address">{{maker.address}}</span><br>
          </div>
        </div>

        <div v-if="maker.openingHours" class="list-item">
          <h6>OPENING HOURS</h6>
          <div class="item">
            {{maker.openingHours}}
          </div>
        </div>

        <div v-if="maker.facebook || maker.instagram || maker.twitter" class="list-item">
          <h6>SOCIAL NETWORKS</h6>
          <div class="item">
            <span v-if="maker.facebook"><a :href="maker.facebook" target="_new">Join us on Facebook</a></span>
          </div>
          <div class="item">
            <span v-if="maker.instagram"><a :href="maker.instagram" target="_new">Follow us on Instagram</a></span>
          </div>
          <div class="item">
            <span v-if="maker.twitter"><a :href="maker.twitter" target="_new">Follow us on Twitter</a></span>
          </div>
        </div>

        <div v-if="maker.website" class="list-item">
          <h6>WEBSITE</h6>
          <div class="item">
            <a :href="maker.website" target="_new">{{maker.website}}</a>
          </div>
        </div>

        <div v-if="maker.mapURL" class="list-item">
          <h6>MAP</h6>
          <div class="image-holder" id="embededMap">
            <google-map :pbcode="maker.mapURL"></google-map>
          </div>
        </div>

        <div v-if="maker.customer" class="list-item">
          <h6>CUSTOMER</h6>
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
  import googleMap from '../common/google-map'

  export default {
    name: 'maker',
    components: {googleMap},
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
