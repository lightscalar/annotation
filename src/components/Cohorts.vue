<template>
  <v-container>
    <v-layout>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class='elevation-0 banner'>
          <v-card-title>
            <v-breadcrumbs icons divider="forward" class='pa-0 ma-0'>
              <v-breadcrumbs-item href='/#' class='white--text'>
                Home
              </v-breadcrumbs-item>
              <v-breadcrumbs-item href='/#' class='brighten'>
                List Available Cohorts
              </v-breadcrumbs-item>
            </v-breadcrumbs>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <br/>
    <v-layout>
      <v-flex xs12 lg8 offset-lg2>

        <v-card>
          <v-card-title class=''>
            <v-icon>fa-list-ul</v-icon> &nbsp;&nbsp;
             Cohorts
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
          <v-list two-line>
            <template v-for='(cohort,k) in cohorts'>
              <v-list-tile avatar v-bind:key="cohort.name"
                                 :to="{name: 'Cohort', params:{id: cohort._id}}">
                <v-list-tile-avatar>
                  <v-icon class='side-icon'>fa-users</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="cohort.name + ' Cohort'"></v-list-tile-title>
                  <v-list-tile-sub-title v-html='cohort.description'>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if='k<cohorts.length-1'></v-divider>
            </template>
          </v-list>
          </v-card-text>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>

</template>

<script>
// import Component from "../component_location"

  export default {
    components: {},

    data () {
      return {

      }
    },

    methods: {

    },

    computed: {
      cohorts () {
        return this.$store.state.cohorts
      }
    },

    mounted () {
      this.$store.dispatch('getCohorts')
    }
  }

</script>

<style scoped>

.container {
  padding-top: 75px;;
}
.header {
  background-color: #305580;
  font-size: 16px;
}
.header .icon {
    color: #fffff;
}

</style>
