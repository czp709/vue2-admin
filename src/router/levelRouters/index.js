export const levelRouters = [
  {
    path: '/home',
    component: () => {
      return import('@/layout/home')
    },
    meta: { hidden: false },
    children: [],
  },
]
