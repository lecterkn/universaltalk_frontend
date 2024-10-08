import { createChannel } from '@/app/api/api'
import { useChannelListStore } from '@/app/store/store'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "invalid message!",
  }),
  permission: z.string().trim().min(1, {
    message: "invalid permission!"
  })
})

const NewChat = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permission: "readOnly"
    }
  });

  const permissions = [
    {
      value: "readOnly",
      label: "閲覧のみ"
    },
    {
      value: "writable",
      label: "書込可能"
    },
    {
      value: "private",
      label: "非公開"
    }
  ]
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(1)
  const [name, setName] = React.useState("")
  const {addChannel} = useChannelListStore()
  const onSubmit = async () => {
    if (value < 0 || value >= permissions.length) {
      return
    }
    const channels = await createChannel(name, permissions[value].value)
    addChannel(channels)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button asChild variant="secondary" className="block flex items-center space-x-2">
          <div>
            <Plus />
            <span className="font-semibold">新規作成</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>チャットを新規作成</DialogTitle>
        </DialogHeader>
        <Input name="name" type="text" placeholder='chat name' onChange={(event) => {
          setName(event.target.value);
        }}></Input>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button role="combobox" aria-expanded={open}>
              {(value < 0 || value >= permissions.length) ? "select..." : permissions[value].label}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandList>
                <CommandEmpty>not found</CommandEmpty>
                <CommandGroup>
                  {permissions.map((perm, index) => (
                    <CommandItem key={index} value={perm.value} onSelect={(current) => {
                      setValue(index);
                      setOpen(false)
                    }}>
                      {(index == value) ? (<Check className="mr-2 h-4 w-4" />) : ""}
                      {perm.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={onSubmit}>
              作成
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default NewChat
