<template>
  <div id="user-information" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center xlg-padding-bottom">
          <h3>{{salutation}}, {{currentUserName}}</h3>
          <p>{{thanksForRegistering}}</p>
          <hr>
          <h3>{{businessOrPersonalUse}}</h3>
        </div>

        <div class="col-xs-12 user-scope-hats">
          <div class="row">
            <div class="col-xs-6 xlg-padding text-right">
              <tooltip effect="scale" placement="bottom" :content="personalUse">
                <v-touch tag="img" @tap="showPersonalUseForm = true" :src="partyHat"/>
              </tooltip>
            </div>
            <div class="col-xs-6 xlg-padding">
              <tooltip effect="scale" placement="bottom" :content="businessUse">
                <v-touch tag="img" @tap="showBusinessUseForm = true" :src="topHat"/>
              </tooltip>
            </div>
          </div>
          <hr>
        </div>

        <div class="col-xs-12 modals-wrapper">
          <modal id="personal-use-modal" v-model="showPersonalUseForm" effect="zoom">
            <div slot="modal-header" class="modal-header">
              <h3 class="modal-title md-padding-top text-center">
                {{personalUse}}
              </h3>
            </div>
            <div class="row form-horizontal small-gutter lg-padding">
              <div class="form-group">
                <label for="where-are-you-personal" class="col-sm-4 control-label">{{whereAreYouLabel}}</label>
                <div class="col-sm-8">
                  <select id="where-are-you-personal" v-model="businessLocation" class="form-control">
                    <option selected="selected">{{chooseLocation}}</option>
                    <option v-for="where in whereAreYouOptions" :keys="where.value">{{where.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="what-interested-in-personal" class="col-sm-4 control-label">{{whatInterestedInLabel}}</label>
                <div class="col-sm-8">
                  <select id="what-interested-in-personal" v-model="interest" class="form-control">
                    <option selected="selected">{{chooseInterest}}</option>
                    <option v-for="what in whatInterestedInOptions" :keys="what">{{what}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="main-area-of-business-personal" class="col-sm-4 control-label">{{youMainAreaOfBusinessLabel}}</label>
                <div class="col-sm-8">
                  <select id="main-area-of-business-personal" v-model="areaOfBusiness" class="form-control">
                    <option selected="selected">{{chooseArea}}</option>
                    <option v-for="area in youMainAreaOfBusinessOptions" :keys="area">{{area}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-4 col-sm-8">
                  <div class="checkbox">
                    <label><input v-model="newsletter" type="checkbox">{{offerNewsletterLabel}}</label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-4 col-sm-8">
                  <div class="checkbox">
                    <label><input v-model="offersAndInvites" type="checkbox">{{offerOffersAndInvitesLabel}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <v-touch tag="button" type="button" class="btn btn-default" @tap="closeModal('personal')">{{quitDontSave}}</v-touch>
              <v-touch tag="button" type="button" class="btn btn-success" @tap="updateUserInformation('personal')">{{save}}</v-touch>
            </div>
          </modal>

          <modal id="business-use-modal" v-model="showBusinessUseForm" effect="zoom">
            <div slot="modal-header" class="modal-header">
              <h3 class="modal-title md-padding-top text-center">
                {{businessUse}}
              </h3>
            </div>
            <div class="row form-horizontal small-gutter lg-padding">
              <div class="form-group">
                <label for="company-name-business" class="col-sm-4 control-label">{{companyName.label}}</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="company-name-business" v-model="companyName.value" :placeholder="companyName.label">
                </div>
              </div>
              <div class="form-group">
                <label for="where-are-you-business" class="col-sm-4 control-label">{{whereAreYouLabel}}</label>
                <div class="col-sm-8">
                  <select id="where-are-you-business" v-model="businessLocation" class="form-control">
                    <option selected="selected">{{chooseLocation}}</option>
                    <option v-for="where in whereAreYouOptions" :keys="where.value">{{where.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="what-interested-in-business" class="col-sm-4 control-label">{{whatInterestedInLabel}}</label>
                <div class="col-sm-8">
                  <select id="what-interested-in-business" v-model="interest" class="form-control">
                    <option selected="selected">{{chooseInterest}}</option>
                    <option v-for="what in whatInterestedInOptions" :keys="what">{{what}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="main-area-of-business" class="col-sm-4 control-label">{{youMainAreaOfBusinessLabel}}</label>
                <div class="col-sm-8">
                  <select id="main-area-of-business" v-model="areaOfBusiness" class="form-control">
                    <option selected="selected">{{chooseArea}}</option>
                    <option v-for="area in youMainAreaOfBusinessOptions" :keys="area">{{area}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-4 col-sm-8">
                  <div class="checkbox">
                    <label><input v-model="newsletter" type="checkbox">{{offerNewsletterLabel}}</label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-4 col-sm-8">
                  <div class="checkbox">
                    <label><input v-model="offersAndInvites" type="checkbox">{{offerOffersAndInvitesLabel}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div slot="modal-footer" class="modal-footer">
              <v-touch tag="button" type="button" class="btn btn-default" @tap="closeModal('business')">{{quitDontSave}}</v-touch>
              <v-touch tag="button" type="button" class="btn btn-success" @tap="updateUserInformation('business')">{{save}}</v-touch>
            </div>
          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {tooltip, modal} from 'vue-strap'
  import Config from '../../api/app.config'
  import countries from '../../modules/countries'

  const jgmCurrentUser = 'jgm_current_user'
  const jgmOriginOfDesiredRoute = 'jgm_origin_of_desired_route'
  const jgmDesiredRoute = 'jgm_desired_route'

  export default {
    name: 'user-information',
    components: {tooltip, modal},
    props: ['auth', 'authenticated'],
    data () {
      return {
        salutation: Config.titles.registerAndAuthentication.salutation,
        currentUserName: 'JGM User',

        thanksForRegistering: Config.titles.registerAndAuthentication.thanksForRegistering,
        businessOrPersonalUse: Config.titles.registerAndAuthentication.businessOrPersonalUse,

        partyHat: Config.titles.registerAndAuthentication.partyHat,
        topHat: Config.titles.registerAndAuthentication.topHat,

        personalUse: Config.titles.registerAndAuthentication.personalUse,
        businessUse: Config.titles.registerAndAuthentication.businessUse,

        showPersonalUseForm: false,
        showBusinessUseForm: false,

        whereAreYouLabel: Config.titles.registerAndAuthentication.whereAreYou,
        chooseLocation: Config.titles.registerAndAuthentication.chooseLocation,
        whereAreYouOptions: countries,
        businessLocation: Config.titles.registerAndAuthentication.chooseLocation,

        whatInterestedInLabel: Config.titles.registerAndAuthentication.whatInterestedIn,
        chooseInterest: Config.titles.registerAndAuthentication.chooseInterest,
        whatInterestedInOptions: Config.titles.registerAndAuthentication.whatInterestedInOptions,
        interest: Config.titles.registerAndAuthentication.chooseInterest,

        youMainAreaOfBusinessLabel: Config.titles.registerAndAuthentication.youMainAreaOfBusiness,
        chooseArea: Config.titles.registerAndAuthentication.chooseArea,
        youMainAreaOfBusinessOptions: Config.titles.registerAndAuthentication.youMainAreaOfBusinessOptions,
        areaOfBusiness: Config.titles.registerAndAuthentication.chooseArea,

        offerNewsletterLabel: Config.titles.registerAndAuthentication.offerNewsletter,
        newsletter: true,

        offerOffersAndInvitesLabel: Config.titles.registerAndAuthentication.offerOffersAndInvites,
        offersAndInvites: true,

        save: Config.titles.registerAndAuthentication.save,
        quitDontSave: Config.titles.registerAndAuthentication.quitDontSave,

        companyName: {
          label: Config.titles.registerAndAuthentication.companyName,
          value: ''
        }
      }
    },
    mounted () {
      const currentUser = JSON.parse(localStorage.getItem(jgmCurrentUser))
      this.currentUserName = currentUser.nickname || currentUser.name
    },
    methods: {
      updateUserInformation (scope) {
        const currentUser = Object.assign({}, JSON.parse(localStorage.getItem(jgmCurrentUser)))
        let newMetadata = currentUser.user_metadata
        let userID = currentUser.sub || currentUser.user_id

        if (newMetadata.userInformationCollected === 'false') {
          if (this.showBusinessUseForm) {
            if (this.companyName.value !== '') {
              newMetadata.company = this.companyName.value
            }
          }

          if (this.businessLocation !== Config.titles.registerAndAuthentication.chooseLocation) {
            newMetadata.businessLocation = this.businessLocation
          }

          if (this.interest !== Config.titles.registerAndAuthentication.chooseInterest) {
            newMetadata.interest = this.interest
          }

          if (this.areaOfBusiness !== Config.titles.registerAndAuthentication.chooseArea) {
            newMetadata.areaOfBusiness = this.areaOfBusiness
          }

          newMetadata.newsletter = this.newsletter
          newMetadata.offersAndInvites = this.offersAndInvites
        }

        if (JSON.stringify(JSON.parse(localStorage.getItem(jgmCurrentUser)).user_metadata) !== JSON.stringify(newMetadata)) {
          this.auth.updateUserProfile(userID, {user_metadata: newMetadata}, (err, result) => console.log(err, result))
          newMetadata.userInformationCollected = 'true'
        }
        this.closeModal(scope)
      },
      closeModal (scope) {
        if (scope === 'business') {
          this.showBusinessUseForm = false
        } else {
          this.showPersonalUseForm = false
        }
        this.goToDesired()
      },
      goToDesired () {
        this.$router.push(localStorage.getItem(jgmDesiredRoute) || localStorage.getItem(jgmOriginOfDesiredRoute) || Config.routerSettings.directory)
        localStorage.removeItem(jgmDesiredRoute)
        localStorage.removeItem(jgmOriginOfDesiredRoute)
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.thanksForRegisteringTitle}`
    }
  }
</script>
