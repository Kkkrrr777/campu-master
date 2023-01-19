import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../views/home/Home')
const Help = () => import('../views/help/Help')
const Question1 = () => import('../views/question/Question1')
const Question2 = () => import('../views/question/Question2')
const Question3 = () => import('../views/question/Question3')
const Question4 = () => import('../views/question/Question4')
const Question5 = () => import('../views/question/Question5')
const Login = () => import('../views/login/Login')
const Reg = () => import('../views/reg/Reg')
const Release = () => import('../views/release/Release')
const Car = () => import('../components/car/Car')
const AI = () => import('../views/AI/Ai')
const routes = [
	{
		path: '',
		redirect: '/home'
	},
	{
		path: '/home',
		component: Home,
		meta: {
			title: '首页'
		},
	},
  {
    path: '/AI',
    component: AI,
    meta: {
      title: '聊天'
    },
  },
/*	{
		path: '/help',
		component: Help,
		meta: {
			title: '帮助'
		}
	},*/
  {
    path: '/question1',
    component: Question1,
    meta: {
      title: '问卷1'
    }
  },
  {
    path: '/question2',
    component: Question2,
    meta: {
      title: '问卷2'
    }
  },
  {
    path: '/question3',
    component: Question3,
    meta: {
      title: '问卷3'
    }
  },
  {
    path: '/question4',
    component: Question4,
    meta: {
      title: '问卷4'
    }
  },
  {
    path: '/question5',
    component: Question5,
    meta: {
      title: '问卷5'
    }
  },

	{
		path: '/login',
		component: Login,
		meta: {
			title: '登陆'
		}
	},
	{
		path: '/reg',
		component: Reg,
		meta: {
			title: '注册'
		}
	},
	{
		path: '/release',
		component: Release,
		meta: {
			title: '发布'
		}
	},
	{
		path: '/car',
		component: Car,
		meta: {
			title: '收藏'
		}
	}
]

const router = new Router({
	routes,
	mode: 'history',
	linkActiveClass: 'nav_active'
})

// router.beforeEach((to, from, next) => {
// 	document.title = to.matched[0].meta.title
// 	next()
// })

export default router
