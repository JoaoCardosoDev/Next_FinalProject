'use client'

import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "~/components/ui/navigation-menu"
import { useSession } from 'next-auth/react';
import LoginBtn from './login-btn';
  

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className='fixed flex top-0 justify-end w-full'>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem className='mr-8'>
                <NavigationMenuTrigger>UsernamePH</NavigationMenuTrigger>
                <NavigationMenuContent className='p-8 min-w-24'>
                  {session ? (
                          <h1>Welcome, {session.user.name}</h1>
                        ) : (
                          <div>
                            <h1>Please log in</h1>
                            <LoginBtn />
                          </div>
                        )}
                    <NavigationMenuLink>Logout</NavigationMenuLink>
                </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  )
}
