"use client";

import LoginDialog from '@/app/components/login/LoginDialog';
import LoginTabs from '@/app/components/login/LoginTabs';
import { useCookies } from 'next-client-cookies';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const cookie = useCookies();
  if (cookie.get("token") !== undefined) {
    redirect("/home")
  }
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  return (
    <div className="w-screen h-screen bg-gray-700">
      <div className="h-screen flex">
        <div className="m-auto">
          <LoginTabs></LoginTabs>
          <LoginDialog open={openLoginDialog} setOpen={setOpenLoginDialog}></LoginDialog>
        </div>
      </div>
    </div>
  )
}

export default page