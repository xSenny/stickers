'use client'
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from '@clerk/nextjs'
import Image from "next/image";
import {usePathname} from "next/navigation";


import Link from "next/link";

const Header = () => {
  const pathName = usePathname()
  console.log(pathName)

  return (
    <header className="w-full h-20 flex justify-between items-end px-8">
      <Link href={'/'}><h1 className="font-inika text-[36px]">Stickers</h1></Link>
      <SignedOut>
        <div className="flex gap-5 h-20 items-center pt-4">
          <Link href={'/sign-in'}>Login</Link>
          <Link href={'/sign-up'}>Sign up</Link>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex gap-8 itemms-center">
        <Link href={pathName === '/upload' ? '/' : '/upload'}>
          <div className="flex gap-2 items-center ">
          <Image src={'/assets/icons/add.png'} width={32} height={16} alt="Upload icon"/>
            <p>{pathName === '/upload' ? 'Browse stickers' : 'Upload a sticker'}</p>
          </div>
          </Link>
          <UserButton afterSignOutUrl='/' />
        </div>
      </SignedIn>
    </header>
  )
}

export default Header;