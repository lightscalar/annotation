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
                Sessions
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
            <v-subheader>
              Sessions
            </v-icon>
          </v-subheader>
          <v-spacer></v-spacer>
          <v-text-field
             append-icon="search"
             label="Search"
             single-line
             hide-details
             v-model="search">
          </v-text-field>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>

          <v-data-table
             v-bind:pagination.sync="pagination"
             v-bind:search="search"
             v-bind:headers='headers'
             no-data-text='No Sessions Available'
             :items='sessions'>
            <template slot="items" scope="props" >
              <tr @click='visitSession(props.item)'>
              <td>{{ props.item.hid }}</td>
              <td>{{ props.item.createdAt }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>

      </v-card>
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
        search: '',
        headers: [{text: 'Code', value: 'hid', sortable: false, align: 'left'},
          {text: 'Created At', value: 'createdAt', sortable: true, align: 'left'}],
        pagination: {sortBy: 'createdAt'}
      }
    },

    methods: {

      visitSession (session) {
        this.$router.push({name: 'Session', params: {'id': session._id}})
      },

    },

    computed: {
      sessions () {
        this.pagination.descending = true
        return this.$store.state.sessions
      }
    },

    mounted () {
      this.$store.dispatch('listSessions')
    }
  }

</script>

<style scoped>

.container {
  padding-top: 85px;
}
.icon {
  margin-right:15px;
}
tr {
  cursor: pointer;
}

</style>
