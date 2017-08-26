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
                Active Sessions
              </v-breadcrumbs-item>
            </v-breadcrumbs>
            <v-spacer>
            </v-spacer>
            <v-btn flat small @click.native='clearAll'>Clear All</v-btn>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <br/>

    <v-layout v-if='activeSessions.length>0'>
      <v-flex xs12 lg8 offset-lg2>
        <v-card>
          <v-card-title class=''>
            <v-subheader>
              Active Sessions
            </v-subheader>
          </v-card-title>
          <v-divider></v-divider>

          <v-divider></v-divider>
          <v-card-text>
            <v-list two-line>
              <template v-for='(session, k) in activeSessions'>
                <v-list-tile avatar v-bind:key="session.hid"
                                 :to="{name: 'Session', params:{id: session._id}}">
                  <v-list-tile-avatar>
                    <v-icon class='red--text text--darken-3'>fa-database</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="session.hid"></v-list-tile-title>
                    <!-- <v-list-tile-sub-title v-html='cohort.description'> -->
                    <!-- </v-list-tile-sub-title> -->
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if='k<activeSessions.length-1'></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>

  <v-layout v-if='activeSessions.length==0'>
    <v-flex lg6 offset-lg3 xs12>
      <h4 class='text-xs-center white--text'>
        No Active Sessions on this Device.
      </h4>
    </v-flex>
  </v-layout>

  </v-container>
</template>

<script>
// import Component from "../component_location"

  export default {

    components: {},

    props: [],

    data () {
      return {
        update: false
      }
    },

    methods: {

      clearAll () {
        localStorage.setItem('activeSessions', '{}')
        this.update = !this.update
      }

    },

    computed: {

      activeSessions () {
        if (this.update) {}
        var sessions = localStorage.getItem('activeSessions')
        sessions = JSON.parse(sessions)
        var activeList = []
        for (var key in sessions) {
          if (sessions.hasOwnProperty(key)) {
            activeList.push({_id: key, hid: sessions[key]})
          }
        }
        return activeList
      }

    },

    mounted () {

    }
  }

</script>

<style scoped>
.container {
  padding-top: 85px;
}
.icon {
  margin-right: 15px;
}
</style>
