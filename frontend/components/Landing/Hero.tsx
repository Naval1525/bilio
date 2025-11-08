import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const Hero = () => {
  return (
    <div>
      <h1>All Billings in one place</h1>
      <p>Bilio is a platform that helps you manage your billings in one place.</p>
      <Input type="email" placeholder="Enter your email" />
      <Button>Join the waitlist</Button>
    </div>
  )
}

export default Hero
