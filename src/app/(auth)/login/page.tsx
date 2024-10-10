"use client";

import LoginDialog from '@/app/components/login/LoginDialog';
import { useCookies } from 'next-client-cookies';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const cookie = useCookies();
  if (cookie.get("token") !== undefined) {
    redirect("/home")
  }
  const [openLoginDialog, setOpenLoginDialog] = useState(true);
  return (
    <div>
      <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog}></LoginDialog>
    </div>
  )
}

export default page