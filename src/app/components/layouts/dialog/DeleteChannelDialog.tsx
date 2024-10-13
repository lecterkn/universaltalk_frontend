import { deleteChannel } from '@/app/api/api';
import { ChannelEntity } from '@/app/api/response/schema'
import { useChannelListStore } from '@/app/store/store';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import React from 'react'

interface DeleteChannelDialogProps {
    channel: ChannelEntity,
    open: boolean,
    setOpen: (open: boolean) => void;
}

const DeleteChannelDialog: React.FC<DeleteChannelDialogProps> = ({channel, open, setOpen}) => {
  const {removeChannel} = useChannelListStore()
  const onDelete = async () => {
    if (await deleteChannel(channel.id)) {
        removeChannel(channel.id)
    }
  }
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onDelete}>
                削除
            </AlertDialogAction>
            <AlertDialogCancel>
                キャンセル
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteChannelDialog
