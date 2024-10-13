"use client";

import { postLogin } from '@/app/api/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { useCookies } from 'next-client-cookies';
import { redirect, useRouter } from 'next/navigation';

interface LoginDialogProps {
    open: boolean,
    setOpen: (open: boolean) => void;
}

const LoginDialog:React.FC<LoginDialogProps> = ({open, setOpen}) => {
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
      setOpen(true)
    }
  }
  return (
    <div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
        </DialogHeader>
        <Input name="username" type="text" placeholder='Username' onChange={(event) => {
          setUsername(event.target.value);
        }}></Input>
        <Input name="password" type="password" placeholder='Password' onChange={(event) => {
          setPassword(event.target.value);
        }}></Input>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={onLogin}>
              ログイン
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default LoginDialog
