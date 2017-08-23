<template>
  <v-container>
    <v-layout>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class='elevation-0 banner'>
          <v-card-title>
            <v-breadcrumbs  icons divider="forward" class='pa-0 ma-0'>
              <v-breadcrumbs-item :to="{name:'LandingPage'}" class='white--text'>
                Home
              </v-breadcrumbs-item>
              <v-breadcrumbs-item href='/#' class='brighten'>
                {{session.hid}} Session
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
          <v-card-title>
            <v-subheader><v-icon>note</v-icon>Details</v-subheader>
            <v-spacer></v-spacer>
            <v-btn primary flat><v-icon primary>history</v-icon>Patient History</v-btn>
            <v-btn primary flat><v-icon primary>event_note</v-icon>Event Log</v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 lg6>
                <v-text-field @change='saveSession'
                  label='Description'
                  v-model='session.description'>
                </v-text-field>
              </v-flex>

              <v-flex xs12 lg6>
                <v-select
                  v-bind:items="cohorts"
                  label="Cohort"
                  item-value='_id'
                  item-text='name'
                  v-model="session.cohortId"
                  persistent-hint
                  @input='saveSession'
                  bottom>
                </v-select>
              </v-flex>
              </v-layout>

            <v-layout row wrap>
              <v-flex xs12 lg6>
                <v-checkbox v-model='session.active'
                  hint='Keep session in your local active queue?'
                  persistent-hint
                  color='primary'
                  @change='saveSession'
                  label='Session Active?'>
                </v-checkbox>
              </v-flex>
              <v-flex xs12 lg6>
              </v-flex>
            </v-layout>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <br/>

    <v-layout>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class='elevation-0 banner'>
          <v-card-title>
            <v-subheader>
            <v-icon>timelapse</v-icon> Snapshots
            </v-subheader>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>

            <v-list two-line>
              <template v-for='(report, k) in cohort.reports'>
                <v-list-tile avatar v-bind:key="report.name"
                       @click.native='openSnapshot(report)'>
                  <v-list-tile-avatar>
                    <v-icon
                       v-if="report.type=='snapshot'"
                       class='side-icon'>fa-line-chart</v-icon>
                     <v-icon
                       v-else
                       class='side-icon'>fa-history</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="report.name">
                    </v-list-tile-title>
                    <v-list-tile-sub-title v-html='report.description'>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if='k < snapshots.length-1'></v-divider>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  <v-dialog v-model='snapshotOpened' persistent width='450px'>
    <v-card>
      <v-card-title>
        <v-icon>fa-line-chart</v-icon>
        <v-subheader>{{currentReport.name}}</v-subheader>
        <v-spacer></v-spacer>
        <v-btn icon small @click.native='snapshotOpened=false'><v-icon>cancel</v-icon></v-btn>
      </v-card-title>
    </v-card>
    </br>
    <v-card>
      <v-card-title>
        <v-subheader>
        {{timestamp}}
        </v-subheader>
        <v-spacer></v-spacer>
        <v-btn primary flat @click.native='resetTime'>
          <v-icon small primary>timer</v-icon>Now
        </v-btn>
      </v-card-title>
    </v-card>
    <br/>
    <v-card>
      <v-card-text>
        <v-layout v-for='(field, k) in snapshot.fields' row :key='k'>

          <!-- Boolean Input -->
          <template v-if='field.isBoolean'>
            <v-flex xs5 v-if='field.isBoolean'>
              <v-checkbox color='primary' v-bind:label='field.name'
                v-model='field.value'
                :hint='field.description' persistent-hint></v-checkbox>
            </v-flex>
            <v-flex xs7 v-if='field.includeDetails'>
              <v-text-field v-model='field.details' label='Details'></v-text-field>
            </v-flex>
          </template>

          <!-- Text Input -->
          <template v-else>
            <v-flex xs12>
              <v-text-field
                v-model='field.value'
                v-bind:label='field.name' :hint='field.description'
                persistent-hint>
              </v-text-field>
            </v-flex>
          </template>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn primary @click.native='submitSnapshot'>
          Submit {{currentReport.name}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </v-container>
</template>

<script>
  // import Component from "../component_location"

  export default {
    components: {},
    props: ['id'],

    data () {
      return {
        snapshotOpened: false,
        currentReport: {},
        timestamp: null,
        unixTime: null
      }
    },

    methods: {
      submitSnapshot() {
        this.snapshot.timestamp = this.timestamp
        this.snapshot.unixTime = this.unixTime
        console.log(this.snapshot)
      },

      resetTime () {
        this.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
        this.unixTime = moment.now()
      },

      openSnapshot (report) {
        this.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')
        this.unixTime = moment.now()
        var snap = {fields: report.fields, timestamp: this.timestamp,
          unixTime: this.unixTime}
        this.$store.commit('setSnapshot', snap)
        this.currentReport = report
        this.snapshotOpened=true
      },

      saveSession () {
        console.log('Saving Session.')
        this.$store.dispatch('updateSession', this.session)
      }
    },

    computed: {
      session() {
        return this.$store.state.session
      },
      snapshots () {
        var shots = []
        for (var k=0; k<this.cohort.reports.length; k++) {
          if (this.cohort.reports[k].type = 'snapshot') {
            shots.push(this.cohort.reports[k])
          }
        }
        return shots
      },
      snapshot () {
        return this.$store.state.snapshot
      },
      cohorts () {
        return this.$store.state.cohorts
      },
      cohort () {
        if (this.session.cohortId) {
          for (var k=0; k<this.cohorts.length; k++) {
            if (this.session.cohortId == this.cohorts[k]._id) {
              return this.cohorts[k]
            }
          }
        }
        return {reports:[]}
      },
    },

    mounted() {
      this.$store.dispatch('getSession', this.id)
      this.$store.dispatch('getCohorts')
    }
  }

</script>

          <style scoped>
.container {
  padding-top: 75px;
}
.icon {
  margin-right: 10px
}
</style>
