import { SignUp } from '@clerk/nextjs'
import React from 'react'

export default function SignUpPage() {
  return (
    <div className="absolute inset-0 w-screen h-screen flex justify-center items-center bg-background">
        <SignUp />
    </div>
  )
}
