<template>
  <div id="register-form" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h3>{{title}}</h3>
          <p>{{description}}</p>
          <small class="login-register-alternatively">{{orLoginHere}} <router-link to="login">login here</router-link></small>
        </div>
      </div>
      <hr>
      <div class="row form-horizontal small-gutter lg-padding">
        <div class="form-group required" :class="{'has-error': !username.valid && username.value !==''}">
          <label for="input-username" class="col-sm-4 control-label">{{userNameLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && username.value !==''">
              <i class="icon-close is-invalid" v-if="!username.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-username" v-model="username.value" :placeholder="userNameLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-error': !email.valid && email.value !==''}">
          <label for="input-email" class="col-sm-4 control-label">{{emailLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && email.value !==''">
              <i class="icon-close is-invalid" v-if="!email.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="email" class="form-control" id="input-email" v-model="email.value" :placeholder="emailLabel">
          </div>
        </div>
        <div class="form-group">
          <label for="input-first-name" class="col-sm-4 control-label">{{fullNameLabel}}</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-first-name" v-model="firstName.value" :placeholder="firstNameLabel">
          </div>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-last-name" v-model="lastName.value" :placeholder="lastNameLabel">
          </div>
        </div>
        <div class="form-group" :class="{'has-warning': !website.valid}">
          <label for="input-website" class="col-sm-4 control-label">{{websiteLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid && website.value !== ''">
              <i v-if="!website.valid" class="icon-close is-invalid not-important"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-website" v-model="website.value" :placeholder="websiteLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-error': (!password.valid || !passwordMatch) && password.value !== ''}">
          <label for="input-password" class="col-sm-4 control-label">{{passwordLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && password.value !== ''">
              <i class="icon-close is-invalid" v-if="!password.valid && !passwordMatch"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password" v-model="password.value" :placeholder="passwordLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-error': (!password2.valid || !passwordMatch) && password2.value !== ''}">
          <label for="input-password2" class="col-sm-4 control-label">{{passwordAgainLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formCanPass && password2.value !== ''">
              <i class="icon-close is-invalid" v-if="!password2.valid && !passwordMatch"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password2" v-model="password2.value" :placeholder="passwordAgainPlaceholderLabel">
          </div>
        </div>
        <div class="form-group">
          <label for="user-role" class="col-sm-4 control-label">{{userRoleLabel}}</label>
          <div class="col-sm-4">
            <select id="user-role" v-model="role.value" class="form-control">
              <option v-for="role in roles" :keys="role.name" :disabled="role.allowed === false">{{role.name}}</option>
            </select>
          </div>
        </div>
        <transition name="slide-errors" mode="out-in">
          <div v-if="showError" class="form-group invalid-form has-error">
            <label class="col-sm-4 control-label">{{registerErrorLabel}}</label>
            <div class="col-sm-8">
              <span>{{pleaseValidateRegisterFormLabel}}</span>
            </div>
          </div>
        </transition>
        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-8">
            <div class="checkbox">
              <v-touch tag="button" @tap="registerNewUser" type="submit" class="btn lg-margin-right"
              :class="{'btn-warning': !formIsValid, 'btn-danger disabled': !formCanPass, 'btn-success': formCanPass}">{{loginSubmitLabel}}</v-touch>
              <label><input v-model="keepassa.value" type="checkbox">{{keepPassLabel}}</label>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="form-group required legend">
        <div class="col-sm-offset-4 col-sm-8">
          <label>{{markedFieldsLabel}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Config from '../../api/app.config'
  import request from 'axios'

  const roles = [
    {name: 'subscriber', allowed: true},
    {name: 'contributor', allowed: true},
    {name: 'author', allowed: true},
    {name: 'editor', allowed: true},
    {name: 'administrator', allowed: false}
  ]

  export default {
    name: 'registration',
    data () {
      return {
        title: Config.titles.registerAndAuthentication.titleReg,
        description: Config.titles.registerAndAuthentication.descriptionReg,
        orLoginHere: Config.titles.registerAndAuthentication.orLoginHere,
        userNameLabel: Config.titles.registerAndAuthentication.username,
        emailLabel: Config.titles.registerAndAuthentication.email,
        fullNameLabel: Config.titles.registerAndAuthentication.fullName,
        firstNameLabel: Config.titles.registerAndAuthentication.firstName,
        lastNameLabel: Config.titles.registerAndAuthentication.lastName,
        websiteLabel: Config.titles.registerAndAuthentication.website,
        passwordLabel: Config.titles.registerAndAuthentication.password,
        passwordAgainLabel: Config.titles.registerAndAuthentication.password2,
        passwordAgainPlaceholderLabel: Config.titles.registerAndAuthentication.password2placeholder,
        userRoleLabel: Config.titles.registerAndAuthentication.userRole,
        keepPassLabel: Config.titles.registerAndAuthentication.keepPass,
        registerErrorLabel: Config.titles.registerAndAuthentication.registerError,
        pleaseValidateRegisterFormLabel: Config.titles.registerAndAuthentication.pleaseValidateRegisterForm,
        markedFieldsLabel: Config.titles.registerAndAuthentication.markedFields,
        loginSubmitLabel: Config.titles.registerAndAuthentication.registerSubmit,
        username: {value: '', required: true, valid: false},
        email: {value: '', required: true, valid: false},
        firstName: {value: '', required: false, valid: true},
        lastName: {value: '', required: false, valid: true},
        website: {value: '', required: false, valid: true},
        password: {value: '', required: true, valid: false},
        password2: {value: '', required: true, valid: false},
        passwordMatch: true,
        role: {value: roles[0].name, required: false, valid: true},
        keepassa: {value: true, required: false, valid: true},
        showError: false,
        roles
      }
    },
    computed: {
      ...mapGetters(['userInformationMissing']),
      formCanPass () {
        return this.username.valid && this.email.valid && this.password.valid && this.password2.valid
      },
      formIsValid () {
        return this.username.valid && this.email.valid && this.password.valid && this.password2.valid && this.website.valid
      }
    },
    mounted () {
      if (this.userInformationMissing) {
        this.$router.push('user-information')
      }
    },
    methods: {
      ...mapActions([]),
      registerNewUser () {
        if (!this.formCanPass) {
          this.showError = true
          setTimeout(() => {
            this.showError = false
          }, 5e3)
        }

        if (this.formCanPass) {
          request.post(`${Config.wpDomain}wp-json/jwt-auth/v1/token`, {
            username: 'webclient',
            password: 'v8V#ghZ(zdu0NX9VAdJMIDJS'
          })
            .then((response) => {
              console.log(response)
              request.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
              request.defaults.headers.common['Content-Type'] = 'application/json'
              request.post(`${Config.wpDomain}wp-json/wp/v2/users`, {
                username: this.username.value,
                email: this.email.value,
                password: this.password.value,
                first_name: this.firstName.value,
                last_name: this.lastName.value,
                url: this.website.value,
                roles: this.role.value
              })
                .then((response) => {
                  console.log('user created: ', response)
                })
                .catch((err) => {
                  console.log(err)
                })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    },
    watch: {
      username: {
        handler () {
          this.username.valid = this.username.value.length !== '' && this.username.value.length > 5 && this.username.value.length < 31
        },
        deep: true
      },
      email: {
        handler () {
          this.email.valid = /^(([^<>()[\]\\.,;:#\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/.test(this.email.value)
        },
        deep: true
      },
      website: {
        handler () {
          this.website.valid = this.website.value === '' ? true : /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(this.website.value)
        },
        deep: true
      },
      password: {
        handler () {
          this.password.valid = this.password.value.length > 8 && this.password.value.length < 25
          this.passwordMatch = this.password.value === this.password2.value
        },
        deep: true
      },
      password2: {
        handler () {
          this.password2.valid = this.password2.value.length > 8 && this.password2.value.length < 25
          this.passwordMatch = this.password.value === this.password2.value
        },
        deep: true
      }
    },
    metaInfo: {
      title: `${Config.titles.registerAndAuthentication.titleReg}`
    }
  }
</script>
