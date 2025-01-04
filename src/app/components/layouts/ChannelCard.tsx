import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Captions, PencilOff, Lock } from 'lucide-react'
import { ChannelEntity, ChannelPermissions } from '@/app/api/response/schema'
import { Skeleton } from '@/components/ui/skeleton'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu'
import { deleteChannel } from '@/app/api/api'
import { useChannelListStore } from '@/app/store/store'
import EditChat from './dialog/EditChannelDialog'
import EditChatDialog from './dialog/EditChannelDialog'
import DeleteChannelDialog from './dialog/DeleteChannelDialog'

interface ChannelCardProps {
  channel: ChannelEntity;
}

const getIconFromIndex = (index: number) => {
  if (index == 0) {
    return (
      <PencilOff/>
    )
  }
  else if (index == 1) {
    return (
      <Captions/>
    )
  }
  return (
    <Lock/>
  )
}

const ChannelCard: React.FC<ChannelCardProps> = ({channel}) => {
  const [isOpenDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [isOpenEditDialog, setOpenEditDialog] = React.useState(false);
  const openDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }
  const openEditDialog = () => {
    setOpenEditDialog(true);
  }
  console.log(channel.name + ":" + channel.permission)
  return (
    <div>
      <DeleteChannelDialog channel={channel} open={isOpenDeleteDialog} setOpen={setOpenDeleteDialog}></DeleteChannelDialog>
      <EditChatDialog channel={channel} open={isOpenEditDialog} setOpen={setOpenEditDialog}></EditChatDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Button asChild variant="ghost" className='block flex justify-start items-center space-x-2'>
            <Link href={`/channels/${channel.id}`}>
              {getIconFromIndex(ChannelPermissions.findIndex(({value}) => value == channel.permission))}
              <span className="text-md font-semibold">{channel.name}</span>
            </Link>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent className='w-64'>
          <ContextMenuItem inset onClick={openEditDialog}>編集</ContextMenuItem>
          <ContextMenuItem inset onClick={openDeleteDialog}>削除</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}

export const ChannelCardSkeleton = () => {
  return (
    <div>
      <div className='block flex justify-start items-center space-x-2'>
        <Skeleton className="h-8 w-64 mx-4 my-2 rounded-full"/>
      </div>
    </div>
  )
}

export default ChannelCard
