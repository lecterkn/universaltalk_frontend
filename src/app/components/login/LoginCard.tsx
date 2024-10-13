import { postLogin } from '@/app/api/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/hooks/use-toast'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginCard = () => {
  const cookies = useCookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onLogin = async() => {
    const jwtToken = await postLogin(username, password)
    if (jwtToken !== null) {
      cookies.set("token", jwtToken.token)
      router.push("/home")
    }
    else {
      toast({
        title: "login failed",
        description: "failed to login user",
        variant: "destructive",
        action: (
          <ToastAction altText='close'>Close</ToastAction>
        )
      })
    }
  }
  return (
    <div>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grif w-full items-center gap-4">
            <div className="flex flex-col space-y-1 5">
              <Label>Name</Label>
              <Input placeholder="username" onChange={(event) => {
                setUsername(event.target.value);
              }}/>
            </div>
            <div className="flex flex-col space-y-1 5">
              <Label>Password</Label>
              <Input type="password" placeholder="username" onChange={(event) => {
                setPassword(event.target.value);
              }}/>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justifty-between">
          <Button onClick={onLogin}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginCard

