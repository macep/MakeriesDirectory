<template>
  <div id="user-information" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center xlg-padding-bottom">
          <h3>{{salutation}}, {{currentUser.name}}</h3>
          <p>{{thanksForRegistering}}</p>
          <hr>
          <h3>{{businessOrPersonalUse}}</h3>
        </div>

        <div class="col-xs-12 user-scope-hats">
          <div class="row">
            <div class="col-xs-6 xlg-padding text-right">
              <tooltip effect="scale" placement="bottom" :content="personalUse">
                <img @click="showPersonalUseForm = true" :src="partyHat">
              </tooltip>
            </div>
            <div class="col-xs-6 xlg-padding">
              <tooltip effect="scale" placement="bottom" :content="businessUse">
                <img @click="showBusinessUseForm = true" :src="topHat">
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
              <button type="button" class="btn btn-default" @click="showPersonalUseForm = false">{{quitDontSave}}</button>
              <button type="button" class="btn btn-success" @click="updateUserInformation">{{save}}</button>
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
              <button type="button" class="btn btn-default" @click="showBusinessUseForm = false">{{quitDontSave}}</button>
              <button type="button" class="btn btn-success" @click="updateUserInformation">{{save}}</button>
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
  import request from 'axios'

  export default {
    name: 'user-information',
    components: {tooltip, modal},
    data () {
      return {
        salutation: Config.titles.registerAndAuthentication.salutation,
        currentUser: {
          name: 'Cristi',
          id: 7
        },

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
    methods: {
      updateUserInformation () {
        let userInformation = {
          company: this.showBusinessUseForm ? this.companyName.value !== '' ? this.companyName.value : null : null,
          businessLocation: this.businessLocation !== Config.titles.registerAndAuthentication.chooseLocation ? this.businessLocation : null,
          interest: this.interest !== Config.titles.registerAndAuthentication.interest ? this.interest : null,
          areaOfBusiness: this.areaOfBusiness !== Config.titles.registerAndAuthentication.areaOfBusiness ? this.areaOfBusiness : null,
          newsletter: this.newsletter,
          offersAndInvites: this.offersAndInvites
        }

        request.post(`${Config.wpDomain}wp-json/wp/v2/users/${this.currentUser.id}`, {description: JSON.stringify(userInformation)}).then((response) => {
          console.log('updated successfully', response)
          this.showPersonalUseForm ? this.showPersonalUseForm = false : this.showBusinessUseForm = false
        })
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.thanksForRegisteringTitle}`
    }
  }
</script>
