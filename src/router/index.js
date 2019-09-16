import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import BenevolesList from '@/components/BenevolesList'
import BenevolesCompetence from '@/components/BenevolesCompetence'
import BenevolesNonCompetence from '@/components/BenevolesNonCompetence'
import BenevolesTC from '@/components/BenevolesTC'
import RecyclageUL from '@/components/RecyclageUL'
import RecyclageDT from '@/components/RecyclageDT'
import StatsFormation from '@/components/StatsFormation'
import StatsMaraude from '@/components/StatsMaraude'
import StatsFC from '@/components/StatsFC'
import StatsML from '@/components/StatsML'
import StatsReseau from '@/components/StatsReseau'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/benevoles/list',
      name: 'BenevolesList',
      component: BenevolesList
    },
    {
      path: '/benevoles/tc',
      name: 'BenevolesTC',
      component: BenevolesTC
    },
    {
      path: '/benevoles/competence',
      name: 'BenevolesCompetence',
      component: BenevolesCompetence
    },
    {
      path: '/benevoles/non-competence',
      name: 'BenevolesNonCompetence',
      component: BenevolesNonCompetence
    },
    {
      path: '/recyclage/UL',
      name: 'RecyclageUL',
      component: RecyclageUL
    },
    {
      path: '/recyclage/DT',
      name: 'RecyclageDT',
      component: RecyclageDT
    },
    {
      path: '/stats/formation',
      name: 'StatsFormation',
      component: StatsFormation
    },
    {
      path: '/stats/maraude',
      name: 'StatsMaraude',
      component: StatsMaraude
    },
    {
      path: '/stats/fc',
      name: 'StatsFC',
      component: StatsFC
    },
    {
      path: '/stats/missionlocal',
      name: 'StatsML',
      component: StatsML
    },
    {
      path: '/stats/reseau',
      name: 'StatsReseau',
      component: StatsReseau
    }
  ]
})
