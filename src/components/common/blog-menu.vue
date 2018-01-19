<template>
  <div class="panel-group" id="accordion" role="tablist" :aria-multiselectable="oneAtATime">
    <div class="panel panel-default">
      <div class="panel-heading" role="tab" id="heading-1">
        <h4 class="panel-title" :class="{'open': categoriesOpen}">
          <v-touch tag="a" @tap="categoriesOpen = !categoriesOpen" role="button" data-toggle="collapse" data-parent="#accordion" :aria-expanded="categoriesOpen" aria-controls="collapse-1">
            {{categoriesTitle}}
          </v-touch>
        </h4>
      </div>
      <div id="collapse-1" class="panel-collapse collapse" :class="{'in': categoriesOpen}" :style="panelStyle(categoriesOpen)" role="tabpanel" aria-labelledby="heading-1">
        <div class="panel-body">
          <ul>
            <v-touch tag="li" @tap="gotoRoute(`category`, `${category.id}/${category.slug}`)" v-for="category in accData" :key="category.id">
              <span>{{category.name}} ({{category.count}})</span>
            </v-touch>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading" role="tab" id="heading-2">
        <h4 class="panel-title" :class="{'open': archivesOpen}">
          <v-touch tag="a" @tap="archivesOpen = !archivesOpen" role="button" data-toggle="collapse" data-parent="#accordion" :aria-expanded="archivesOpen" aria-controls="collapse-2">
            {{archivesTitle}}
          </v-touch>
        </h4>
      </div>
      <div id="collapse-2" class="panel-collapse collapse" :class="{'in': archivesOpen}" :style="panelStyle(archivesOpen)" role="tabpanel" aria-labelledby="heading-2">
        <div class="panel-body">
          <ul>
            <v-touch tag="li" @tap="gotoRoute(`archive`, year.route)" v-for="year in archivedYearsCollection" :key="year.el">
              <span>{{year.el}} ({{year.occurences}})</span>
            </v-touch>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {findOccurences} from '../../modules/utils'
  import Config from '../../api/app.config'

  export default {
    name: 'accordion-menu',
    props: ['oneAtATime', 'accData'],
    data () {
      return {
        categoriesOpen: true,
        archivesOpen: false,
        categoriesTitle: Config.titles.categoriesTitle,
        archivesTitle: Config.titles.archivesTitle
      }
    },
    computed: {
      ...mapGetters(['archivedYears', 'isMobile']),
      archivedYearsCollection () {
        let years = findOccurences(this.archivedYears, false)
        years.forEach(year => {
          year.route = `${Config.routerSettings.archive}${year.el}`
        })
        return years
      }
    },
    methods: {
      gotoRoute (type, url) {
        this.closeMobileMenu()
        this.$router.push((type === 'archive') ? url : `${Config.routerSettings.category}${url}`)
      },
      panelStyle (val) {
        return {
          height: val ? '' : '0'
        }
      },
      closeMobileMenu () {
        if (this.isMobile) {
          this.$store.commit('mutateMobileMenuVisibile', false)
        }
      }
    }
  }
</script>
