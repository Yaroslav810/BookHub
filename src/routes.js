import index from '@/components/layouts/index'
import app from '@/components/layouts/app'
import NotFoundComponent from '@/components/404/NotFoundComponent'
import addArticle from '@/components/main/addArticle'
import profile from '@/components/main/profile'
import choiceGenres from '@/components/main/choiceGenres'
import settings from '@/components/main/settings'
import login from '@/components/auth/login'
import register from '@/components/auth/register'
import search from '@/components/search/search'
import user from '@/components/layouts/profileInfo'
import subscriptions from '@/components/main/subscriptions'

const routes = [
  { path: '/', name: 'index', component: index },
  { path: '/app', name: 'app', component: app },
  { path: '*', name: '*', component: NotFoundComponent },
  { path: '/addarticle', name: 'addacticle', component: addArticle },
  { path: '/profile', name: 'profile', component: profile },
  { path: '/choice', name: 'choiceGenres', component: choiceGenres },
  { path: '/settings', name: 'settings', component: settings },
  { path: '/login', name: 'login', component: login },
  { path: '/register', name: 'register', component: register },
  { path: '/search', name: 'search', component: search },
  { path: '/user/:id', name: 'user', component: user },
  { path: '/subscriptions', name: 'subscriptions', component: subscriptions }
]

export default routes