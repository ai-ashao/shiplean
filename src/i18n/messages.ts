import type { Locale } from './config'

type ShellMessages = {
  primaryNavigation: string
  nav: {
    home: string
    workflow: string
    guides: string
    pricing: string
  }
  previewMode: string
  previewNotice: string
  openDemo: string
  openDemoLabel: string
  footer: {
    guides: string
    license: string
  }
  notFound: {
    kicker: string
    title: string
    returnHome: string
  }
}

export const shellMessages = {
  en: {
    primaryNavigation: 'Primary navigation',
    nav: {
      home: 'Home',
      workflow: 'Workflow',
      guides: 'Guides',
      pricing: 'Pricing',
    },
    previewMode: 'Preview mode',
    previewNotice:
      'Preview environment enabled · No payment, database, or production auth service is connected',
    openDemo: 'Open demo',
    openDemoLabel: 'Open starter demo',
    footer: {
      guides: 'Guides',
      license: 'License',
    },
    notFound: {
      kicker: '404 / Not found',
      title: 'This route is not part of the starter.',
      returnHome: 'Return home',
    },
  },
  'zh-CN': {
    primaryNavigation: '主导航',
    nav: {
      home: '首页',
      workflow: '使用流程',
      guides: '指南',
      pricing: '定价',
    },
    previewMode: '预览模式',
    previewNotice: '预览环境已启用 · 不会连接付款、数据库或生产认证服务',
    openDemo: '打开演示',
    openDemoLabel: '打开模板演示',
    footer: {
      guides: '指南',
      license: '授权',
    },
    notFound: {
      kicker: '404 / 页面不存在',
      title: '这个页面不在当前模板中。',
      returnHome: '返回首页',
    },
  },
} satisfies Record<Locale, ShellMessages>
