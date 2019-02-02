<template>
  <div id="maker-details" class="row small-gutter">
    <div class="col-sm-9 lg-margin-bottom">
      <div class="box left text-center">
        <router-link v-if="back" :to="back" class="back-link">{{backLink}}</router-link>
        <h3>{{maker.name}} <small class="draft" v-if="draft">{{draftMaker}}</small></h3>
        <p v-if="maker.brief_description !==''" class="brief">{{maker.brief_description}}</p>

        <carousel v-if="imgs.length > 1">
          <slider v-for="(slide, index) in imgs" :key="index" class="slide">
            <img :src="slide" class="slide-image"/>
          </slider>
        </carousel>

        <img v-else :src="imgs[0]" class="slide-image"/>

        <template v-if="maker.company_description !==''">
          <h3>{{ getUs }}</h3>
          <pre>{{maker.company_description}}</pre>
        </template>

        <template v-if="maker.testimonials !==''">
          <h3>{{ testimonials }}</h3>
          <pre>{{maker.testimonials}}</pre>
        </template>

        <template v-if="maker.story_description !==''">
          <h3>{{ ourStory }}</h3>
          <pre>{{maker.story_description}}</pre>
        </template>

        <template v-if="maker.what_we_do !==''">
          <h3>{{ thisCompanyIsSpecial }}</h3>
          <pre class="long">{{maker.what_we_do}}</pre>
        </template>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="box right">
        <h3>{{ getInTouch }}</h3>

        <template v-if="maker.email !==''" class="list-item">
          <div class="item">
            <div v-if="maker.email">
              <a :mail='maker.mail' :href="'mailto:' + maker.email + '?subject=New Enquiry from Just Got Made'" @click="trackEmail(maker.email)">
                {{ emailContact }}
              </a>
            </div>
          </div>
        </template>

        <template v-if="maker.contactName !==''" class="list-item">
          <h6>{{ contactName }}</h6>
          <div class="item">
            <strong>{{ maker.contactName }}</strong>
          </div>
        </template>

        <template v-if="maker.position !==''" class="list-item">
          <h6>{{ position }}</h6>
          <div class="item">
            <strong>{{ maker.position }}</strong>
          </div>
        </template>

        <template v-if="maker.regions !== undefined && maker.regions.length > 0" class="list-item">
          <h6>{{region}}: </h6>
          <div class="item">
            <span v-for="(r, index) in maker.regions" :key="index">
              <router-link :to="`${filterBy.region}/${r.slug}`"> {{r.name}}</router-link>
              <template v-if="index < maker.regions.length - 1">, </template>
            </span>
          </div>
        </template>

        <template v-if="maker.address1 !==''" class="list-item">
          <div class="item">
            {{ maker.address1 }},
            <template v-if="maker.address2 !== null">{{ maker.address2 }}, </template>
            {{ maker.city }}
          </div>
        </template>

        <template v-if="maker.map_url !==''" class="list-item">
          <div class="image-holder" id="embededMap">
            <google-map :pbcode="maker.map_url"></google-map>
          </div>
        </template>

        <h3>{{ getSpecific }}</h3>

        <template v-if="maker.capacities !== undefined && maker.capacities.length > 0" class="list-item">
          <h6>{{capacity}}: </h6>
          <div class="item">
            <span v-for="(r, index) in maker.capacities" :key="index">
              <router-link :to="`${filterBy.region}/${r.slug}`"> {{r.name}}</router-link>
              <template v-if="index < maker.capacities.length - 1">, </template>
            </span>
          </div>
        </template>

        <template v-if="maker.services !== undefined && maker.services.length > 0" class="list-item">
          <h6>{{mainServices}}: </h6>
          <div class="item">
            <span v-for="(r, index) in maker.services" :key="index">
              <router-link :to="`${filterBy.services}/${r.slug}`"> {{r.name}}</router-link>
              <template v-if="index < maker.services.length - 1">, </template>
            </span>
          </div>
        </template>

        <template v-if="maker.materials !== undefined && maker.materials.length > 0" class="list-item">
          <h6>{{mainMaterialsUsed}}: </h6>
          <div class="item">
            <span v-for="(r, index) in maker.materials" :key="index">
              <router-link :to="`${filterBy.materials}/${r.slug}`"> {{r.name}}</router-link>
              <template v-if="index < maker.materials.length - 1">, </template>
            </span>
          </div>
        </template>

        <div v-if="maker.products !== undefined && maker.products.length > 0" class="list-item">
          <h6>{{typicalProductsMade}}</h6>
          <div class="item">
            <span v-for="(p, index) in maker.products" :key="index">
              <router-link :to="filterBy.products + '' + friendlyName(p.name)"> {{p.name}}</router-link>
              <template v-if="index < maker.products.length - 1">, </template>
            </span>
          </div>
        </div>

        <div v-if="maker.social1 || maker.social2 || maker.social3" class="list-item">
          <h6>{{socialNetworks}}</h6>
          <div class="item">
            <div v-if="maker.social1"><a :href="maker.social1" target="_new">Join us on Facebook</a></div>
            <div v-if="maker.social2"><a :href="maker.social2" target="_new">Follow us on Instagram</a></div>
            <div v-if="maker.social3"><a :href="maker.social3" target="_new">Follow us on Twitter</a></div>
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
        mainServices: Config.titles.directory.mainServices,
        mainMaterialsUsed: Config.titles.directory.mainMaterialsUsed,
        typicalProductsMade: Config.titles.directory.typicalProductsMade,
        capacity: Config.titles.directory.capacity,
        emailContact: Config.titles.directory.emailContact,
        contactName: Config.titles.directory.contactName,
        position: Config.titles.directory.position,
        getUs: Config.titles.directory.getUs,
        testimonials: Config.titles.directory.testimonials,
        ourStory: Config.titles.directory.ourStory,
        thisCompanyIsSpecial: Config.titles.directory.thisCompanyIsSpecial,
        getInTouch: Config.titles.directory.getInTouch,
        getSpecific: Config.titles.directory.getSpecific,
        contactDetails: Config.titles.directory.contactDetails,
        openingHours: Config.titles.directory.openingHours,
        socialNetworks: Config.titles.directory.socialNetworks,
        website: Config.titles.directory.website,
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
