import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { Metadata } from 'next'
import { Layers, PieChart, Sparkles } from 'lucide-react'

const whyBilio = [
  'A unified view of invoices, payments, expenses, and cash flow.',
  'Automated follow-ups that actually get invoices paid on time.',
  'Profitability snapshots per client or project to guide decisions.',
  'Tax-ready exports without the end-of-quarter scramble.',
]

const productHighlights = [
  {
    title: 'Invoicing',
    description: 'Branded invoices, recurring schedules, and payment links that get clients to pay fast.',
    bullets: [
      'Beautiful PDFs with your logo and business details.',
      'One-click payment links for Stripe, Razorpay, UPI, and cards.',
      'Automated, escalating reminders for overdue invoices.',
      'Support for retainers, subscriptions, and multiple currencies.',
    ],
    icon: Sparkles,
  },
  {
    title: 'Expense Tracking',
    description: 'Capture every expense, attach receipts, and keep books investor-ready.',
    bullets: [
      'Upload and organize receipts alongside every transaction.',
      'Attribute spend to clients or projects to spot profitability gaps.',
      'Categorize expenses for seamless tax summaries and bookkeeping handoff.',
    ],
    icon: Layers,
  },
  {
    title: 'Financial Intelligence',
    description: 'Stay on top of revenue, outstanding invoices, and profitability trends at a glance.',
    bullets: [
      'Client-level profitability, P&L, and cash-flow trends in one dashboard.',
      'PDF and CSV exports tailored for accountants and third-party tools.',
      'Automated reporting that highlights what needs attention each week.',
    ],
    icon: PieChart,
  },
]

const team = [
  {
    name: 'Naval Bihani',
    role: 'Co-founder · Product & Experience',
    initials: 'NB',
    bio: 'Naval crafts the end-to-end customer journey, turning complex billing flows into a calm, intuitive workspace your clients love to pay through.',
  },
  {
    name: 'Aditya Maurya',
    role: 'Co-founder · Engineering & Systems',
    initials: 'AM',
    bio: 'Aditya architects the platform—Go backend, real-time infrastructure, and integrations—so reconciliation, sync, and reporting never skip a beat.',
  },
]

export const metadata: Metadata = {
  title: 'About Bilio',
  description:
    'Bilio is a modern billing workspace helping agencies and independent professionals invoice, reconcile, and understand profitability without spreadsheets.',
}

const AboutPage = () => {
  return (
    <main className="relative flex w-full justify-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-6xl opacity-60 blur-3xl">
        <div className="absolute left-1/2 top-[-10%] h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20" />
        <div className="absolute bottom-[-20%] right-[15%] h-80 w-80 rounded-full bg-purple-500/10" />
      </div>
      <div className="relative z-10 w-full max-w-5xl space-y-16 px-4 py-16 md:px-8 md:py-20">
        <section className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground backdrop-blur transition-colors duration-300 hover:border-border">
            <span className="inline-flex size-2 rounded-full bg-primary" />
            About Bilio
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Simplify billing, track expenses, and understand profitability without drowning in spreadsheets.
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Bilio gives agencies and independent professionals a modern, cohesive workflow—create branded invoices,
            automate follow-ups, reconcile expenses, and surface actionable financial insights from a single dashboard.
          </p>
        </section>

        <Separator className="bg-border/60" />

        <section className="grid gap-6 md:grid-cols-2 md:gap-8">
          <Card className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-border/70 hover:shadow-xl md:col-span-2">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/60 via-primary to-primary/60 opacity-50 transition-opacity duration-300 group-hover:opacity-90" />
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl md:text-3xl">Why Bilio exists</CardTitle>
              <CardDescription>
                We built Bilio for teams who want command over cash flow and profitability without stitching together
                half a dozen tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
                {whyBilio.map((item, index) => (
                  <li
                    key={item}
                    style={{ transitionDelay: `${index * 60}ms` }}
                    className="group/li relative overflow-hidden rounded-xl border border-border/60 bg-linear-to-br from-background/80 via-background/60 to-muted/40 px-4 py-4 leading-relaxed shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
                  >
                    <span className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-primary/60 to-primary opacity-0 transition-opacity duration-300 group-hover/li:opacity-100" />
                    <div className="ml-2">{item}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="bg-border/60" />

        <section className="space-y-10">
          <header className="space-y-3 text-left">
            <Badge variant="outline" className="border-border/50 bg-background/60 backdrop-blur">
              Product Highlights
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">What&apos;s inside the workspace</h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              From invoicing to expense reconciliation and financial intelligence, Bilio keeps the financial heartbeat of
              your business visible at all times.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {productHighlights.map(({ title, description, bullets, icon: Icon }, index) => (
              <Card
                key={title}
                style={{ transitionDelay: `${index * 80}ms` }}
                className="group relative flex h-full flex-col overflow-hidden border-border/60 bg-card/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-full bg-linear-to-r from-primary/60 via-primary/70 to-primary/60 opacity-60 transition group-hover:opacity-100" />
                <CardHeader className="space-y-4">
                  <div className="inline-flex size-12 items-center justify-center rounded-2xl border border-border/40 bg-muted/40 text-foreground/80 shadow-sm transition group-hover:border-border/70 group-hover:bg-primary/10">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-lg border border-border/40 bg-background/60 px-3 py-2 transition-colors duration-300 group-hover:border-border/70"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="bg-border/60" />

        <section className="space-y-6">
          <header className="space-y-3 text-left">
            <Badge variant="outline" className="border-border/50 bg-background/60 backdrop-blur">
              Built by people
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">The team behind Bilio</h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              Bilio is built end to end by{' '}
              <span className="font-medium text-foreground">Naval Bihani</span> and{' '}
              <span className="font-medium text-foreground">Aditya Maurya</span>. We&apos;re a small, focused team
              obsessed with making billing workflows calmer and smarter for modern agencies.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {team.map((member, index) => (
              <Card
                key={member.name}
                style={{ transitionDelay: `${index * 90}ms` }}
                className="group relative h-full overflow-hidden border-border/60 bg-card/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-full bg-linear-to-r from-primary/60 via-primary/70 to-primary/60 opacity-50 transition group-hover:opacity-100" />
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <Avatar className="size-12 border border-border/70 bg-primary/10 text-foreground">
                    <AvatarFallback className="text-lg font-semibold text-foreground">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-semibold text-foreground">{member.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
    </div>
    </main>
  )
}

export default AboutPage
