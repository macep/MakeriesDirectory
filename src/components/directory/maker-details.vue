<template>
  <div id="maker-details" class="row small-gutter">
    <div class="col-sm-9 lg-margin-bottom">
      <div class="box left">
        <router-link v-if="back" :to="back" class="back-link">{{backLink}}</router-link>
        <h3>{{maker.name}} <small class="draft" v-if="draft">{{draftMaker}}</small></h3>
        <p class="brief">{{maker.briefDescription}}</p>

        <carousel v-if="imgs.length > 1">
          <slider v-for="(slide, index) in imgs" :key="index" class="slide">
            <img :src="slide" class="slide-image"/>
          </slider>
        </carousel>
        <img v-else :src="imgs[0]" class="slide-image"/>

        <pre class="long">{{maker.long_description}}</pre>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="box right">
        <div v-if="maker.businesstypes !== undefined && maker.businesstypes.length > 0" class="list-item">
          <h6>{{businessTypes}}</h6>
          <div class="item">
            <span v-for="(bt, index) in maker.businesstypes" :key="index">
              <router-link :to="filterBy.businesstypes + '' + friendlyName(bt.name)"> {{bt.name}}</router-link>
              <template v-if="index < maker.businesstypes.length - 1">, </template>
            </span>
          </div>
        </div>

        <div v-if="maker.products !== undefined && maker.products.length > 0" class="list-item">
          <h6>{{productTypes}}</h6>
          <div class="item">
            <span v-for="(p, index) in maker.products" :key="index">
              <router-link :to="filterBy.products + '' + friendlyName(p.name)"> {{p.name}}</router-link>
              <template v-if="index < maker.products.length - 1">, </template>
            </span>
          </div>
        </div>

        <div v-if="maker.servicetypes !== undefined && maker.servicetypes.length > 0" class="list-item">
          <h6>{{serviceTypes}}</h6>
          <div class="item">
            <span v-for="(s, index) in maker.servicetypes" :key="index">
              <router-link :to="filterBy.servicetypes + '' + friendlyName(s.name)"> {{s.name}}</router-link>
              <template v-if="index < maker.servicetypes.length - 1">, </template>
            </span>
          </div>
        </div>

        <div v-if="maker.processedTags !== undefined && maker.processedTags.length > 0" class="list-item">
          <h6>{{tags}}</h6>
          <div class="item">
            <span v-for="(t, index) in maker.processedTags" :key="index">
              {{t.name}}
              <template v-if="index < maker.processedTags.length - 1">, </template>
            </span>
          </div>
        </div>

        <div v-if="maker.regions !== undefined && maker.regions.length > 0" class="list-item">
          <h6>{{region}} </h6>
          <div class="item">
            <span v-for="(r, index) in maker.regions" :key="index">
              <router-link :to="`${filterBy.region}/${r.slug}`"> {{r.name}}</router-link>
              <template v-if="index < maker.regions.length - 1">, </template>
            </span>
          </div>
        </div>

        <div v-if="maker.telephone || maker.email || maker.address" class="list-item">
          <h6>{{contactDetails}}</h6>
          <div class="item">
            <div v-if="maker.email"><a :mail='maker.mail' :href="'mailto:' + maker.email + '?subject=New Enquiry from Just Got Made'" @click="trackEmail(maker.email)">Email Contact</a></div>
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

        <!--<div v-if="maker.facebook || maker.instagram || maker.twitter" class="list-item">-->
          <!--<h6>{{socialNetworks}}</h6>-->
          <!--<div class="item">-->
            <!--<div v-if="maker.facebook"><a :href="maker.facebook" target="_new">Join us on Facebook</a></div>-->
            <!--<div v-if="maker.instagram"><a :href="maker.instagram" target="_new">Follow us on Instagram</a></div>-->
            <!--<div v-if="maker.twitter"><a :href="maker.twitter" target="_new">Follow us on Twitter</a></div>-->
          <!--</div>-->
        <!--</div>-->

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
  import apiService from '../../api/api.service'
  import {getNthFragment, friendlyUrl} from '../../modules/utils'
  import googleMap from '../common/google-map'
  import {carousel, slider} from 'vue-strap'

  export default {
    name: 'maker-details',
    components: {googleMap, carousel, slider},
    data () {
      return {
        backLink: Config.titles.back,
        region: Config.titles.directory.region,
        businessTypes: Config.titles.directory.businessTypes,
        productTypes: Config.titles.directory.productTypes,
        serviceTypes: Config.titles.directory.serviceTypes,
        filterBy: {
          region: Config.routerSettings.filterBy.region,
          products: Config.routerSettings.filterBy.products,
          businessTypes: Config.routerSettings.filterBy.businessTypes,
          serviceTypes: Config.routerSettings.filterBy.serviceTypes
        },
        contactDetails: Config.titles.directory.contactDetails,
        openingHours: Config.titles.directory.openingHours,
        socialNetworks: Config.titles.directory.socialNetworks,
        website: Config.titles.directory.website,
        map: Config.titles.directory.map,
        customer: Config.titles.directory.customer,
        tags: Config.titles.directory.tags,
        imgPlaceholder: `http://via.placeholder.com/800x800?text=Maker's Image`,
        imgs: [],
        draft: false,
        draftMaker: Config.titles.directory.draft,
        maker: {}
      }
    },
    async created () {
      this.$store.commit('mutateActivityIndicator', true)
      try {
        const maker = await apiService.callApi(`maker/${+getNthFragment(this.route.path, 2)}`)
        this.maker = maker.data

        if (this.maker.images.length < 1) {
          this.imgs.push(this.imgPlaceholder)
        } else {
          this.maker.images.forEach(async i => {
            const img = await apiService.callApi(`maker/${this.maker.id}/image/${i.id}`)
            this.imgs.push(`data:image/jpeg;base64,${img.data}`)
          })
        }

        this.draft = this.maker.enabled === false
        this.$store.commit('mutateActivityIndicator', false)
      } catch (err) {
        console.error(err)
        this.$store.commit('mutateActivityIndicator', false)
      }
    },
    computed: {
      ...mapGetters(['directory', 'route']),
      back () {
        const from = localStorage.getItem('jgm_origin_of_desired_route') || this.route.from.fullPath
        return from !== '/' ? from : null
      }
    },
    methods: {
      friendlyName (str) {
        return friendlyUrl(str)
      },
      trackEmail (email) {
        this.$ga.event({
          eventCategory: 'eventTracking',
          eventAction: 'trackEmail',
          eventLabel: 'makerDetailEmailAnchor',
          eventValue: email
        })
      }
    },
    metaInfo () {
      return {
        title: `${this.maker.name} : ${Config.titles.directory.makerDetails}`
      }
    }
  }
</script>
