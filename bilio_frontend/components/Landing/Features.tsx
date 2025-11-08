import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Zap,
  Receipt,
  RefreshCw,
  Bell,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "Smart Invoicing",
    description: "Professional invoices with integrated payment links.",
    icon: FileText,
    highlights: [
      "Branded PDF generation",
      "Multi-currency support",
      "One-click payment links",
    ],
  },
  {
    title: "Instant Payments",
    description: "Collect payments through Stripe, Razorpay, and UPI.",
    icon: Zap,
    highlights: [
      "Real-time tracking",
      "Automatic reconciliation",
      "Secure payment links",
    ],
  },
  {
    title: "Expense Tracking",
    description: "Keep your books organized and investor-ready.",
    icon: Receipt,
    highlights: [
      "Receipt attachments",
      "Project linking",
      "Tax categorization",
    ],
  },
  {
    title: "Recurring Billing",
    description: "Automate monthly and quarterly invoices.",
    icon: RefreshCw,
    highlights: ["Flexible schedules", "Auto-generation", "Easy management"],
  },
  {
    title: "Smart Reminders",
    description: "Automated payment follow-ups that work.",
    icon: Bell,
    highlights: [
      "Scheduled reminders",
      "Custom templates",
      "Improved cash flow",
    ],
  },
  {
    title: "Financial Reports",
    description: "Export-ready reports for your accountant.",
    icon: TrendingUp,
    highlights: ["CSV & PDF exports", "P&L statements", "Tax summaries"],
  },
];

const Features = () => {
  return (
    <main className="min-h-screen w-full bg-background">
      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 py-20 md:px-8 md:py-28">
        {/* Header Section */}
        <section className="space-y-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3.5 py-1.5 text-xs font-medium tracking-wider text-muted-foreground backdrop-blur-sm">
            <Sparkles className="size-3" />
            FEATURES
          </div>
          <h1 className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl py-6 font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
            Billing but more simplified
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground/90 md:text-lg">
            Professional invoicing, instant payments, and financial clarity—all
            in one place.
          </p>
        </section>

        

        {/* Features Grid */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
                className="group relative flex h-full flex-col border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg animate-in fade-in slide-in-from-bottom-4"
              >
                <CardHeader className="space-y-4 pb-6">
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground/80">
                      {feature.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="mt-auto">
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {feature.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Features;
