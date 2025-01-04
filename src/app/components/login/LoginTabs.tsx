import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import LoginCard from './LoginCard'
import RegisterCard from './RegisterCard'

const LoginTabs = () => {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 m-auto">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginCard></LoginCard>
      </TabsContent>
      <TabsContent value="register">
        <RegisterCard></RegisterCard>
      </TabsContent>
    </Tabs>
  )
}

export default LoginTabs
