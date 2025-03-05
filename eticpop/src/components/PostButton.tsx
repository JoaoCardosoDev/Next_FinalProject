import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from './ui/button'
import { Textarea } from "@/components/ui/textarea"

export default function PostButton() {
  return (
    <div className='fixed bottom-0 flex justify-end w-full p-2'>
        <Drawer>
            <DrawerTrigger>Post</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Create a new Post</DrawerTitle>
                <DrawerDescription>Please refrain to the TOS when posting.</DrawerDescription>
                </DrawerHeader>
                <div className='px-4'>

                <Textarea className='max-w-full'/>
                </div>
                <DrawerFooter>
                <Button>Post</Button>
                    <DrawerClose className='bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
                        Cancel
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </div>
  )
}
