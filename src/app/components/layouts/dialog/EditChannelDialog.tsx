import { updateChannel } from '@/app/api/api'
import { ChannelEntity, ChannelPermissions } from '@/app/api/response/schema'
import { useChannelListStore } from '@/app/store/store'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
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

interface EditChatProps {
    channel: ChannelEntity,
    open: boolean,
    setOpen: (open: boolean) => void;
}

const EditChat: React.FC<EditChatProps> = ({channel, open, setOpen}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      permission: "readOnly"
    }
  });

  const [popup, setPopup] = React.useState(false)
  const [value, setValue] = React.useState(ChannelPermissions.findIndex(({value}) => value == channel.permission) ?? 1)
  const [name, setName] = React.useState(channel.name)
  const {editChannel} = useChannelListStore()
  const onSubmit = async () => {
    if (value < 0 || value >= ChannelPermissions.length) {
      return
    }
    const channels = await updateChannel(channel.id, name, ChannelPermissions[value].value)
    editChannel(channels)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
        </DialogHeader>
        <Input name="name" value={name} type="text" placeholder='chat name' onChange={(event) => {
          setName(event.target.value);
        }}></Input>
        <Popover open={popup} onOpenChange={setPopup}>
          <PopoverTrigger asChild>
            <Button role="combobox" aria-expanded={popup}>
              {(value < 0 || value >= ChannelPermissions.length) ? "select..." : ChannelPermissions[value].label}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandList>
                <CommandEmpty>not found</CommandEmpty>
                <CommandGroup>
                  {ChannelPermissions.map((perm, index) => (
                    <CommandItem key={index} value={perm.value} onSelect={(current) => {
                      setValue(index);
                      setPopup(false)
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
              更新
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditChat 
