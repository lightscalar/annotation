import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index'
Vue.use(Vuex)

var vitalSigns = {name: 'Vital Signs', description: 'Heart rate; blood pressure; SpO2; etc.'}
vitalSigns.type = 'snapshot'
vitalSigns.fields = [{name: 'Heart Rate', isBoolean: false, includeUnits: true,
  units: 'Beats/Minute', includeDetails: false,
  description: 'Patient heartrate in BPM.'}]

var report = {name: '', description: '', fields: [], type: 'history'}
var field = {name:'', description: '', type: 'numeric', includeUnits: false,
             units: '', includeDetails: false, isTextOnly: false}
var session = {hid: null, cohortId: null, events: [], histories: []}

export default new Vuex.Store({

  // ------ STATE VARIABLES --------------------
  state: {
    cohorts: [],
    cohort: {reports: [], histories: []},
    histories: [],
    history: {},
    vitalSigns: vitalSigns,
    report: {name: '', description: '', fields: [], type: 'history'},
    field: field,
    session: session,
    sessions: [],
    snapshot: {}
  },

  // ------ MUTATIONS ------------------------
  mutations: {
    setSnapshot(state, snapshot) {
      state.snapshot = snapshot
    },
    setCohort(state, cohort) {
      state.cohort = cohort
    },
    setSession(state, session) {
      state.session = session
    },
    setSessions(state, sessions) {
      state.sessions = sessions
    },
    setCohorts(state, cohorts) {
      state.cohorts = cohorts
    },
    resetField(state) {
      state.field = {name:'', description: '', isBoolean: false, type: 'numeric',
                     includeUnits: false, units: '', includeDetails: false}
    },
    reset(state) {
      state.cohort = {name:'', description: '', reports: []}
      state.report = {name: '', description: '', fields: [], type: 'history'}
      state.session = {hid: null, cohortId: null, events:[], histories:[]}
      state.snapshot = {}
    }
  },

  // ------ ACTIONS ------------------------
  actions: {
    createCohort(context, cohort) {
      api.postResource('cohorts', cohort).then(function(resp) {
        context.commit('setCohort', resp.data)
        router.push({name: 'Cohort', params: {id: resp.data._id}})
      })
    },
    getCohort(context, cohortId) {
      api.getResource('cohort', cohortId).then(function(resp) {
        context.commit('setCohort', resp.data)
      })
    },
    getCohorts(context) {
      api.listResource('cohorts').then(function(resp) {
        context.commit('setCohorts', resp.data)
      })
    },
    deleteCohort(context, id) {
      api.deleteResource('cohort', id).then(function(resp) {
       router.push({name: 'LandingPage'})
      })
    },
    deleteSession(context, id) {
      api.deleteResource('session', id).then(function(resp) {
       router.push({name: 'LandingPage'})
      })
    },
    updateCohort(context, cohort) {
      api.putResource('cohort', cohort).then(function(resp) {
        context.dispatch('getCohort', resp.data._id)
      })
    },
    getSession(context, id) {
      api.getResource('session', id).then( function (resp) {
        context.commit('setSession', resp.data)
      })
    },
    listSessions(context) {
      api.listResource('sessions').then( function (resp) {
        context.commit('setSessions', resp.data)
      })
    },
    updateSession(context, session) {
      api.putResource('session', session).then(function (resp) {
        context.commit('setSession', resp.data)
      })
    },
    querySessions(context, hid) {
      hid = hid.toUpperCase()
      api.queryResource('sessions', 'hid', hid).then( function (resp) {
        if (resp.data.length==0) { // need to create session
          var session = {active: false, events: [], histories: []}
          session.hid = hid
          api.postResource('sessions', session).then(function (resp) {
            context.commit('setSession', resp.data)
            router.push({name: 'Session',
              params:{'id': context.state.session._id}})
          })
        } else { // session already exists
          context.commit('setSession', resp.data[0])
          router.push({name: 'Session',
            params:{'id': context.state.session._id}})
        }
      })
    }
  }
})
