import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import CreateCohort from '../components/CreateCohort.vue'
import Cohort from '../components/Cohort.vue'
import Report from '../components/Report.vue'
import Cohorts from '../components/Cohorts.vue'
import Session from '../components/Session.vue'

Vue.use(Router)
var landingRoute = {path: '/', name: 'LandingPage', component: LandingPage}
var createCohortRoute = {path: '/cohorts/create', name: 'CreateCohort', component: CreateCohort}
var cohortRoute = {path: '/cohort/:id', name: 'Cohort', component: Cohort, props: true}
var reportRoute = {path: '/cohort/:id/report/:reportId', name: 'Report',
                   component: Report, props: true}
var cohortsRoute = {path: '/cohorts', name: 'Cohorts', component: Cohorts}
var sessionRoute = {path: '/session/:id', name: 'Session', component: Session, props: true}

export default new Router({
  routes: [landingRoute, createCohortRoute, cohortRoute, reportRoute,
    cohortsRoute, sessionRoute]})
