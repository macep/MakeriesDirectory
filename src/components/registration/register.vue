<template>
  <div id="register-form" class="row xlg-padding-top">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="row">
        <div class="col-sm-12 text-center">
          <h3>{{title}}</h3>
          <p>{{description}}</p>
        </div>
      </div>
      <hr>
      <div class="row form-horizontal small-gutter lg-padding">
        <div class="form-group required" :class="{'has-warning': !username.valid && username.value !=='', 'has-error': !formIsValid && !username.valid && username.value !==''}">
          <label for="input-username" class="col-sm-4 control-label">{{userNameLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid">
              <i class="icon-close is-invalid" v-if="!username.valid"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-username" v-model="username.value" :placeholder="userNameLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-warning': !email.valid && email.value !=='', 'has-error': !formIsValid && !email.valid && email.value !==''}">
          <label for="input-email" class="col-sm-4 control-label">{{emailLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid">
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
        <div class="form-group" :class="{'has-warning': !website.valid && website.value !=='', 'has-error': !formIsValid && !website.valid && website.value !==''}">
          <label for="input-website" class="col-sm-4 control-label">{{websiteLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid && website.value !== ''">
              <i class="icon-close is-invalid" v-if="!website.valid "/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="text" class="form-control" id="input-website" v-model="website.value" :placeholder="websiteLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-warning': !password.valid && password.value !=='', 'has-error': !formIsValid && !password.valid && password.value !==''}">
          <label for="input-password" class="col-sm-4 control-label">{{passwordLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid">
              <i class="icon-close is-invalid" v-if="!password.valid || password.value === ''"/>
              <i class="icon-done is-valid" v-else/>
            </template>
            <input type="password" class="form-control" id="input-password" v-model="password.value" :placeholder="passwordLabel">
          </div>
        </div>
        <div class="form-group required" :class="{'has-warning': !password2.valid && password2.value !=='', 'has-error': !formIsValid && !password2.valid && password2.value !==''}">
          <label for="input-password2" class="col-sm-4 control-label">{{passwordAgainLabel}}</label>
          <div class="col-sm-8">
            <template v-if="!formIsValid">
              <i class="icon-close is-invalid" v-if="password2.value.length === 0 || password2.value !== password.value"/>
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
              <v-touch tag="button" @tap="registerNewUser" type="submit" class="btn btn-warning lg-margin-right">{{loginSubmitLabel}}</v-touch>
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
        role: {value: roles[0].name, required: false, valid: true},
        keepassa: {value: true, required: false, valid: true},
        formIsValid: true,
        showError: false,
        roles
      }
    },
    computed: {
      ...mapGetters([])
    },
    methods: {
      ...mapActions([]),
      registerNewUser () {
        this.formIsValid = this.username.valid && this.email.valid && this.password.valid && this.password2.valid

        if (!this.formIsValid) {
          this.showError = true
          setTimeout(() => {
            this.showError = false
          }, 5e3)
        }

        if (this.formIsValid) {
          let addUserApi = `${Config.wpDomain}wp-json/wp/v2/users`
          request.post(`${Config.wpDomain}wp-json/jwt-auth/v1/token`, {
            username: 'webclient',
            password: 'v8V#ghZ(zdu0NX9VAdJMIDJS'
          })
            .then((response) => {
              request.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
              request.defaults.headers.common['Content-Type'] = 'application/json'
              request.post(addUserApi, {
                username: this.username.value,
                email: this.email.value,
                password: this.password.value,
                first_name: this.firstName.value,
                last_name: this.lastName.value,
                url: this.website.value,
                roles: this.role.value
              })
                .then((response) => {
                  console.log(response)
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
          this.website.valid = this.website.value.length === '' ? true : /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(this.website.value)
        },
        deep: true
      },
      password: {
        handler () {
          this.password.valid = this.password.value.length > 8 && this.password.value.length < 25
        },
        deep: true
      },
      password2: {
        handler () {
          this.password2.valid = this.password2.value.length > 8 && this.password2.value.length < 25 && this.password2.value === this.password.value
        },
        deep: true
      }
    }
  }
</script>
