import { createFileRoute } from '@tanstack/react-router'
import { MarketingHome } from '@/components/marketing-home'
import { pageHead } from '@/lib/seo'

export const Route = createFileRoute('/zh/')({
  head: () =>
    pageHead({
      title: '让独立开发者用得起的 TanStack 启动模板',
      description:
        '下载 ShipLean TanStack Start SaaS 脚手架，用编程 Agent 打开，并调用内置 Skill 快速做出可验证的 MVP。',
      path: '/zh',
      alternates: [
        { locale: 'en', path: '/' },
        { locale: 'zh-CN', path: '/zh' },
        { locale: 'x-default', path: '/' },
      ],
    }),
  component: ChineseHome,
})

function ChineseHome() {
  return <MarketingHome locale="zh-CN" />
}
