const workflow = {
  en: [
    {
      code: 'DOWNLOAD',
      title: 'Get the template',
      text: 'Download the licensed project and unpack it into your local workspace.',
    },
    {
      code: 'OPEN',
      title: 'Start your coding agent',
      text: 'Open the repository in Codex, Claude Code, or another agent that can read project files.',
    },
    {
      code: 'INVOKE',
      title: 'Call the bundled Skill',
      text: 'Describe the product and invoke $shiplean-quick-start. The Skill loads the project contracts before editing.',
    },
    {
      code: 'VERIFY',
      title: 'Review and ship',
      text: 'The agent implements the product and finishes with the repository-wide pnpm verify contract.',
    },
  ],
  'zh-CN': [
    {
      code: '下载',
      title: '获取模板',
      text: '购买授权后下载项目，把模板解压到你的本地工作区。',
    },
    {
      code: '打开',
      title: '启动编程 Agent',
      text: '使用 Codex、Claude Code 或其他能读取项目文件的 Agent 打开仓库。',
    },
    {
      code: '调用',
      title: '调用随仓库提供的 Skill',
      text: '描述你要做的产品并调用 $shiplean-quick-start，Skill 会先读取项目合同再修改代码。',
    },
    {
      code: '验证',
      title: '检查并上线',
      text: 'Agent 完成功能后运行 pnpm verify，你检查结果，再部署自己的产品。',
    },
  ],
} as const

export function AgentWorkflow({ locale = 'en' }: Readonly<{ locale?: 'en' | 'zh-CN' }>) {
  return (
    <div className="overflow-hidden rounded-xl border bg-border shadow-sm">
      <section
        className="flex min-h-64 flex-col justify-center bg-zinc-950 p-6 text-zinc-100 sm:p-10"
        aria-label={locale === 'zh-CN' ? 'Skill 调用示例' : 'Skill invocation example'}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {locale === 'zh-CN' ? '在 Agent 中输入' : 'Type in your agent'}
        </span>
        <code className="my-8 overflow-wrap-anywhere font-mono text-lg sm:text-2xl">
          $shiplean-quick-start
        </code>
        <p className="border-t border-white/10 pt-5 text-sm leading-6 text-zinc-400">
          {locale === 'zh-CN'
            ? '把这个模板改成我的产品：……'
            : 'Turn this template into my product: …'}
        </p>
      </section>
      <ol className="grid list-none gap-px border-t bg-border p-0 sm:grid-cols-2 lg:grid-cols-4">
        {workflow[locale].map((step, index) => (
          <li className="flex min-h-52 flex-col bg-background p-6" key={step.code}>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="rounded border px-1.5 py-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              {step.code}
            </div>
            <h3 className="mt-auto text-lg font-semibold tracking-tight">{step.title}</h3>
            <p className="mb-0 mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
