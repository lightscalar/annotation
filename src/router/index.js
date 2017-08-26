import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import CreateCohort from '../components/CreateCohort.vue'
import Cohort from '../components/Cohort.vue'
import Report from '../components/Report.vue'
import Cohorts from '../components/Cohorts.vue'
import Session from '../components/Session.vue'
import Events from '../components/Events.vue'
import Histories from '../components/Histories.vue'
import ActiveSessions from '../components/ActiveSessions.vue'
import Sessions from '../components/Sessions.vue'

Vue.use(Router)
var landingRoute = {path: '/', name: 'LandingPage', component: LandingPage}
var createCohortRoute = {path: '/cohorts/create', name: 'CreateCohort', component: CreateCohort}
var cohortRoute = {path: '/cohort/:id', name: 'Cohort', component: Cohort, props: true}
var reportRoute = {path: '/cohort/:id/report/:reportId', name: 'Report',
  component: Report, props: true}
var cohortsRoute = {path: '/cohorts', name: 'Cohorts', component: Cohorts}
var sessionRoute = {path: '/session/:id', name: 'Session', component: Session, props: true}
var eventsRoute = {path: '/session/:id/events', name: 'Events', component: Events, props: true}
var historiesRoute = {path: '/session/:id/histories', name: 'Histories', 
  component: Histories, props: true}
var activeSessionsRoute = {path: '/sessions/active', name: 'ActiveSessions',
  component: ActiveSessions}
var sessionsRoute = {path: '/sessions', name: 'Sessions',
  component: Sessions}

export default new Router({
  routes: [landingRoute, createCohortRoute, cohortRoute, reportRoute,
    cohortsRoute, sessionRoute, eventsRoute, historiesRoute,  activeSessionsRoute,
    sessionsRoute]})
