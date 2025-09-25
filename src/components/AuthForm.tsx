import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const AuthForm = () => {
  return (
    <form>
      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor='Email'>Email</Label>
        <Input id='Email' type='email' />
      </div>
      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor='Password'>Password</Label>
        <Input id='Password' type='password' />
      </div>

      <Button className='my-4 w-full'>Log In</Button>

    </form>
  )
}

export default AuthForm