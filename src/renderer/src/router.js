import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { usePersistStore } from '@/stores/persistStore'
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const persistStore = usePersistStore()
  const token = persistStore.token
  if (to.path !== '/login' && !token) {
    next({ path: '/login' })
    return
  }
  next()
})

export default router
