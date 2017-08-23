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
              <v-breadcrumbs-item :to="{name:'Cohorts'}" class='white--text'>
                Cohort List
              </v-breadcrumbs-item>
              <v-breadcrumbs-item :to="{name: 'Cohort', params:{id: cohort._id}}">
                {{cohort.name}} Cohort
              </v-breadcrumbs-item>
              <v-breadcrumbs-item href='/#' class='brighten'>
                {{report.name}} Report
              </v-breadcrumbs-item>
            </v-breadcrumbs>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <br/>


    <v-layout>
      <v-flex xs12 lg8 offset-lg2>
        <v-card class='elevation-0 banner'>

          <v-card-title class=''>
            <v-icon>fa-info-circle</v-icon> &nbsp; Report Details
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text class="elevation-0">
            <v-layout row wrap>
              <v-flex lg6 xs12>
                <v-text-field
                       label='Report Name'
                       v-model='report.name'></v-text-field>
              </v-flex>
              <v-flex lg2 xs6>
                <v-radio color='primary'
                       label="Snapshot"
                       v-model="report.type"
                       value="snapshot">
                </v-radio>
              </v-flex>
              <v-flex lg2 xs6>
                <v-radio
                       color='primary'
                       label="History"
                       v-model="report.type"
                       value="history">
                </v-radio>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex lg6 xs12>
                <v-text-field
                       label='Report Description'
                       v-model='report.description'>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class='actions-panel'>
            <v-btn error flat @click.native='deleteReport'>Delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn primary @click.native='updateDetails'>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <br/>


    <v-layout>
      <v-flex xs12 lg8 offset-lg2>
        <v-card>
          <v-card-title class=''>
            <v-icon>fa-check-square</v-icon> &nbsp; Fields
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text v-if='report.fields.length>0'>
            <v-list two-line>
              <template v-for='(field,k) in report.fields'>
                <v-list-tile avatar v-bind:key="field.name"
                       @click.native='openField(field)'>
                  <v-list-tile-avatar>
                    <v-icon class='side-icon'>library_books</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title
                       v-html="field.name"></v-list-tile-title>
                     <v-list-tile-sub-title
                       v-html='field.description'></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if='k<report.fields.length-1'></v-divider>
              </template>
            </v-list>

          </v-card-text>
          <v-card-text v-else>
            <h6 class='blue--text text--darken-2'>
              Report contains no fields.
            </h6>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class='actions-panel'>
            <v-spacer></v-spacer>
            <v-btn primary @click.native='addField'>Add Field</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>


    <v-snackbar v-model='showMessage' :top=true primary>{{message}}</v-snackbar>

    <v-dialog v-model='editField' persistent width='450px'>
      <v-card>
        <v-card-text>

          <v-text-field v-model='field.name' label='Field Name'></v-text-field>
          <v-text-field v-model='field.description' label='Field Description'></v-text-field>
          <v-layout row wrap>
            <v-flex lg6>
              <v-checkbox
                       v-model='field.isBoolean'
                       color='primary'
                       label='Boolean?'>
              </v-checkbox>
            </v-flex>
            <v-checkbox
                       v-if='field.isBoolean'
                       v-model='field.includeDetails'
                       color='primary'
                       label='Include Details?'>
            </v-checkbox>

          </v-layout>
          <v-layout row wrap>
            <v-flex lg6>
              <v-checkbox
                       v-model='field.includeUnits'
                       color='primary'
                       label='Units?'>
              </v-checkbox>
            </v-flex>

            <v-flex lg6>
              <v-text-field
                       label='Units'
                       v-model='field.units'
                       v-if='field.includeUnits'>
              </v-text-field>
            </v-flex>

          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn error flat
                       @click.native='editField=!editField;deleteCurrentField()'>
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn primary @click.native='editField=!editField'>Close</v-btn>
          <v-btn primary
                       @click.native='editField=!editField; updateDetails()'>Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>

</template>

<script>
// import Component from "../component_location"

  export default {
    components: {},
    props: ['id', 'reportId'],

    data () {
      return {
        open: true,
        message: '',
        showMessage: false,
        editField: false,
        field: {isBoolean: true, includeDetails: false, includeUnits: false, units:''}
      }
    },
    methods: {
      deleteReport() {
        var self = this
        this.cohort.reports.splice(this.reportId,1)
        this.$store.dispatch('updateCohort', this.cohort).then(function() {
          self.$router.push({name: 'Cohort', params: {'id': self.cohort._id}})
        })
      },
      updateDetails() {
        var self = this
        this.$store.dispatch('updateCohort', this.cohort).then(function(){
          self.message = 'Report successfully updated.'
          self.showMessage = true
        })
      },
      deleteCurrentField() {
        for (var k=0; k<this.report.fields.length; k++) {
          if (this.field.name == this.report.fields[k].name) {
            this.report.fields.splice(k,1)
          }
        }
        this.updateDetails()
      },
      addField() {
        var field = this.$store.state.field
        field.value = ''
        field.details = ''
        this.report.fields.push(field)
        this.field = field
        this.editField = true
        this.$store.commit('reset')
      },
      openField(field) {
        console.log('Opening Dialog.')
        this.editField = true
        this.field = field
      }
    },

    computed: {
      cohort() {
        return this.$store.state.cohort
      },
      report() {
        var reports = this.$store.state.cohort.reports
        if (reports.length>0) {
          return reports[this.reportId]
        } else {
          return {fields: []}
        }
      }
    },

    mounted() {
      this.$store.dispatch('getCohort', this.id)
    }
  }

</script>

<style scoped>

.container {
  padding-top: 75px;
}
.header {
  background-color: #305580 !important;
  font-size: 16px;
}
.icon {
}
.brighten {
  color: black
}
.side-icon {
  color: #305580 !important
}
</style>
