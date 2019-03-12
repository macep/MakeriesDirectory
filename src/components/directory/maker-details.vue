<template>
  <div id="maker-details" class="row small-gutter">
    <div class="col-sm-9 lg-margin-bottom">
      <div class="box left text-justify">
        <router-link v-if="back" :to="back" class="back-link">{{backLink}}</router-link>
        <h3 class="maker-name">{{maker.name}} <small class="draft" v-if="draft">{{draftMaker}}</small></h3>
        <p v-if="maker.brief_description !==''" class="brief">{{maker.brief_description}}</p>

        <carousel v-if="imgs.length > 1">
          <slider v-for="(slide, index) in imgs" :key="index" class="slide">
            <img :src="slide" class="slide-image"/>
          </slider>
        </carousel>

        <img v-else :src="imgs[0]" class="slide-image"/>

        <template v-if="maker.company_description !==''">
          <div class="xlg-margin-top xlg-padding-bottom">{{maker.company_description}}</div>
        </template>

        <template v-if="maker.story_description !==''">
          <h3>{{ ourStory }}</h3>
          <div class="xlg-padding-bottom">{{maker.story_description}}</div>
        </template>

        <template v-if="maker.testimonials !==''">
          <div class="xlg-padding-bottom lead"><strong>{{maker.testimonials}}</strong></div>
        </template>

        <template v-if="maker.what_we_do !==''">
          <h3>{{ thisCompanyIsSpecial }}</h3>
          <div class="xlg-padding-bottom long">{{maker.what_we_do}}</div>
        </template>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="box right">
        <h3>{{ getInTouch }}</h3>

        <template v-if="maker.email && maker.email !==''" class="list-item">
          <div class="item">
            <div v-if="maker.email">
              <a class="btn email-maker"
                 :mail='maker.mail'
                 :href="'mailto:' + maker.email + '?subject=New Enquiry from Just Got Made'"
                 @click="trackEmail(maker.email)">
                {{ emailContact }}
              </a>
            </div>
          </div>
        </template>

        <template v-if="maker.contact_name && maker.contact_name !==''" class="list-item">
          <h6>{{ contactName }}</h6>
          <div class="item">
            <span>{{ maker.contact_name }}</span>
          </div>
        </template>

        <template v-if="maker.contact_position && maker.contact_position !==''" class="list-item">
          <h6>{{ position }}</h6>
          <div class="item">
            <span>{{ maker.contact_position }}</span>
          </div>
        </template>

        <template v-if="maker.address1 && maker.address1 !==''" class="list-item">
          <h6>{{ address }}</h6>
          <div class="item">
            {{ maker.address1 }},
            <template v-if="maker.address2 !== null">{{ maker.address2 }}, </template>
            {{ maker.city }}
          </div>
        </template>

        <template class="list-item">
          <div class="image-holder" id="embededMap">
            <google-map :pbcode="maker.map_url || ''"></google-map>
          </div>
        </template>

        <template v-if="maker.regions && maker.regions.length > 0" class="list-item">
          <h6>{{region}}: </h6>
          <enumerate :collection="maker.regions || []" :wrapClass="`item text-italic`"/>
        </template>

        <h3>{{ getSpecific }}</h3>

        <template v-if="maker.services && maker.services.length > 0" class="list-item">
          <h6>{{mainServices}}: </h6>
          <enumerate :collection="maker.services || []" :wrapClass="`item text-italic`"/>
        </template>

        <template v-if="maker.materials && maker.materials.length > 0" class="list-item">
          <h6>{{mainMaterialsUsed}}: </h6>
          <enumerate :collection="maker.materials || []" :wrapClass="`item text-italic`"/>
        </template>

        <div v-if="maker.products && maker.products.length > 0" class="list-item">
          <h6>{{typicalProductsMade}}</h6>
          <enumerate :collection="maker.products || []" :wrapClass="`item text-italic`"/>
        </div>

        <div v-if="maker.capacities && maker.capacities.length > 0" class="list-item">
          <h6>{{capacity}}</h6>
          <div class="item">
            <span v-for="(c, index) in maker.capacities" :key="index">
              {{c.name}}
              <template v-if="index < maker.capacities.length - 1">, </template>
            </span>
          </div>
        </div>

        <div v-if="maker.min && maker.max" class="list-item">
          <h6>{{cost}}</h6>
          <div class="item">
            <span>
              From {{ maker.min }} to {{ maker.max }}
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
  import {mapGetters, mapMutations} from 'vuex'
  import Config from '../../api/app.config'
  import apiService from '../../api/api.service'
  import {getNthFragment} from '../../modules/utils'
  import googleMap from '../common/google-map'
  import {carousel, slider} from 'vue-strap'
  import enumerate from '../common/enumerate'

  export default {
    name: 'maker-details',
    components: { googleMap, carousel, slider, enumerate },
    data () {
      return {
        backLink: Config.titles.back,
        address: Config.titles.directory.address,
        region: Config.titles.directory.region,
        materials: Config.titles.directory.materials,
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
        cost: Config.titles.directory.cost,
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
          this.maker.images.forEach(i => {
            this.imgs.push(i.path)
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
      ...mapMutations(['mutateDirectoryActiveFilter']),
      trackEmail (email) {
        this.$ga.event({
          eventCategory: 'eventTracking',
          eventAction: 'trackEmail',
          eventLabel: 'makerDetailEmailAnchor',
          eventValue: email
        })
      },
      selectFilter (filter) {
        this.$router.push(`/directory/filter-by/location/${filter.slug}`)
        this.mutateDirectoryActiveFilter(filter.id)
      }
    },
    metaInfo () {
      return {
        title: `${this.maker.name} : ${Config.titles.directory.makerDetails}`
      }
    }
  }
</script>
