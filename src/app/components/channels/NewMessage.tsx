"use client";

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { sendMessage } from '@/app/api/api'
import { UUID } from 'crypto'
import { useMessageStore } from '@/app/store/store';
import { MessageEntity } from '@/app/api/response/schema';

interface NewMessageProps {
  channelId: UUID
}

const formSchema = z.object({
  message: z.string().trim().min(1, {
    message: "empty message!",
  }),
})


const NewMessage:React.FC<NewMessageProps>= ({channelId}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  });
  const {addMessages} = useMessageStore();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await sendMessage(channelId, values.message);
    if (response != null) {
      console.log(response);
      addMessages(channelId, [response]);
    }
    form.reset({message:""});
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column space-x-2">
        <FormField
          control={form.control}
          name='message'
          render={({field}) => (
            <FormControl>
              <Input
                {...field}
                type='text'
                autoComplete='off'
                placeholder="message here"
              />
            </FormControl>
          )}
        />
        <Button asChild size="icon" type='submit' variant="secondary" onClick={form.handleSubmit(onSubmit)}>
          <Send className='p-2'/>
        </Button>
      </form>
    </Form>
  )
}

export default NewMessage
