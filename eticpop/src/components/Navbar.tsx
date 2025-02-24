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
  } from "@/components/ui/navigation-menu"
  

export default function Navbar() {
  return (
    <div className='fixed flex top-0 justify-end w-full'>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                <NavigationMenuTrigger>UsernamePH</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <NavigationMenuLink>Link to the profile</NavigationMenuLink>
                    <NavigationMenuLink>Logout</NavigationMenuLink>
                </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  )
}
