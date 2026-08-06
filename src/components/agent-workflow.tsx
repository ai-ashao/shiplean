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
    <div className="agent-workflow">
      <section
        className="agent-command"
        aria-label={locale === 'zh-CN' ? 'Skill 调用示例' : 'Skill invocation example'}
      >
        <span>{locale === 'zh-CN' ? '在 Agent 中输入' : 'TYPE IN YOUR AGENT'}</span>
        <code>$shiplean-quick-start</code>
        <p>
          {locale === 'zh-CN'
            ? '把这个模板改成我的产品：……'
            : 'Turn this template into my product: …'}
        </p>
      </section>
      <ol className="agent-steps">
        {workflow[locale].map((step, index) => (
          <li key={step.code}>
            <div className="agent-step-code">
              <span>{String(index + 1).padStart(2, '0')}</span>
              {step.code}
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
