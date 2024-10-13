import { registerUser } from '@/app/api/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onRegister = async() => {
    const user = await registerUser(username, password)
    if (user !== null) {
      toast({
        title: "registered user",
        description: user.createdAt.toLocaleString(),
        action: (
          <ToastAction altText='close'>Close</ToastAction>
        )
      })
    }
    else {
      toast({
        title: "register failed",
        description: "failed to register user",
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
          <CardTitle>Register</CardTitle>
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
          <Button onClick={onRegister}>Register</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterCard
