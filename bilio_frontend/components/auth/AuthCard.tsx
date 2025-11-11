import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

type Props = {
  title: string
  description?: string
  children: React.ReactNode
}

export default function AuthCard({ title, description, children }: Props) {
  return (
    <div className="flex min-h-[calc(100dvh-120px)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}


