import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Hero = () => {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center px-4 py-8 bg-background">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
        Simplify Your Billing. Amplify Your Business.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Bilio is a single workspace to create branded invoices, track payments, record expenses, and generate tax summaries for agencies and freelancers.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mt-8">
          <Input 
            type="email" 
            placeholder="Enter Your Email" 
            className="w-full sm:flex-1 h-12 px-4 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button 
            size="lg" 
            className="w-full sm:w-auto h-12 px-8 bg-foreground text-background hover:bg-foreground/90 font-medium transition-colors"
          >
            Join the waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
