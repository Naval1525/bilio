import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type SectionCardsProps = {
  variant?: "default" | "compact"
  className?: string
}

export function SectionCards({ variant = "default", className }: SectionCardsProps) {
  const containerClasses = cn(
    "grid grid-cols-1",
    "*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs",
    "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card",
    "dark:*:data-[slot=card]:bg-card",
    "@xl/main:grid-cols-2",
    variant === "default"
      ? "gap-4 px-4 md:grid-cols-2 lg:px-6 @5xl/main:grid-cols-4"
      : "gap-3 px-0 md:grid-cols-2 md:px-0 lg:px-0 md:gap-4 lg:gap-6 @5xl/main:grid-cols-2 w-full",
    className,
  )

  return (
    <div className={containerClasses}>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $87,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Revenue up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total from all paid invoices
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending Invoices</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            24
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              3 overdue
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Requires attention <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Invoices awaiting payment
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $3,245.75
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Expenses tracked <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">{`This month's total expenses`}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Net Profit</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $84,004.25
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +15.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong profit margin <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Revenue minus expenses</div>
        </CardFooter>
      </Card>
    </div>
  )
}
