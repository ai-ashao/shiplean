import { createFileRoute } from '@tanstack/react-router'
import { MarketingHome } from '@/components/marketing-home'
import { localizedPageHead } from '@/lib/seo'

export const Route = createFileRoute('/zh/')({
  head: () =>
    localizedPageHead({
      pageId: 'home',
      locale: 'zh-CN',
      title: '让独立开发者用得起的 TanStack 启动模板',
      description:
        '下载 ShipLean TanStack Start SaaS 脚手架，用编程 Agent 打开，并调用内置 Skill 快速做出可验证的 MVP。',
    }),
  component: ChineseHome,
})

function ChineseHome() {
  return <MarketingHome locale="zh-CN" />
}
