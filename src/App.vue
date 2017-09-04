<template>
  <v-app light>
    <v-toolbar fixed>
      <v-btn
        icon
        class='menu-btn'
        @click.native.stop="rightDrawer = !rightDrawer"
      >
        <v-icon class='menu-btn'>menu</v-icon>
      </v-btn>
      </v-toolbar-side-icon>
      <a href='/#'>
      <img src='static/favicon@2x.png' class='nvs-logo'>
      </a>
      <v-toolbar-title v-text="title" class='title-logo'></v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      temporary
      :clipped='clipped'
      :right="false"
      v-model="rightDrawer"
    >
    <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-left
            :key="i"
          >
            <v-flex xs12>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider
            light
            v-else-if="item.divider"
            class="my-4 black--text"
            :key="i"
          ></v-divider>
          <v-list-tile
            :key="i"
            v-else
            :to="{name: item.route}">
            <v-list-tile-action>
              <v-icon class='side-icon'>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>

    </v-navigation-drawer>
    <!-- <v-footer :fixed="fixed"> -->
    <!--   <span>&copy; 2017, New Vital Signs, LLC.</span> -->
    <!-- </v-footer> -->
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  methods: {
    menuClick(item) {
      this.$router.push({name: item.route})
    }
  },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        { heading: 'Sessions' },
        { icon: 'fa-plus-square', text: 'Add Session', route: 'LandingPage' },
        { icon: 'fa-th-list', text: 'Active Sessions', route: 'ActiveSessions' },
        { icon: 'fa-archive', text: 'Sessions Archive', route: 'Sessions'  },
        { divider: true },
        { heading: 'Cohort Management' },
        { icon: 'fa-plus-square', text: 'Create Cohort', route:'CreateCohort'},
        { icon: 'fa-users', text: 'Current Cohorts', route: 'Cohorts' },
        { divider: true },
        { heading: 'Settings', route: 'LandingPage'  },
        { icon: 'fa-gear', text: 'Settings', route: 'LandingPage'  },
        { icon: 'fa-question-circle', text: 'Help', route: 'LandingPage'  },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'new vital signs'
    }
  },

  mounted () {
  }
}
</script>

<style scoped>
.title-logo {
  letter-spacing: 1em;
  font-family: 'PT Sans';
  font-weight: bold;
  font-size: 14px;
  color: #c62828;
  text-transform: uppercase;
}
html, body, main {
  background-color: #305580;
}
.subheader {
  font-weight: bold;
  color: #c62828 !important;
}
.side-icon {
  color: #305580 !important
}
.menu-btn {
  color: #305580 !important
}
.nvs-logo {
  margin-top: 4px;
  height: 20px;
  margin-left:15px;
  margin-right: 10px;
}
</style>
