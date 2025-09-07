import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    console.log(user)
  },[])

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>getUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  
  const getUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialogue(false);
      window.location.reload();
    })
  }

  const [openDialogue, setOpenDialogue] = useState(false);

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href='/'><img src='/logo.svg'/></a>
        <div>
          {
            user ? 
            <div className='flex items-center gap-3'>
              <a href='/create-trip'><Button variant="outline" className='rounded-full cursor-pointer'>+ Create Trips</Button></a> 
              <a href='/my-trips'><Button variant="outline" className='rounded-full cursor-pointer'>My Trips</Button></a> 
              <Popover>
                <PopoverTrigger><img src={user?.picture} className='h-[35px] w-[35px] rounded-full cursor-pointer'/></PopoverTrigger>
                <PopoverContent className='w-50'><a href='/' className='cursor-pointer text-gray-400 hover:text-black' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                }}>Logout</a></PopoverContent>
              </Popover>
            </div>
            : <Button onClick={()=>setOpenDialogue(true)}>Sign In</Button>
          }
        </div>
      <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign In to the App with Google Authentication securely</p>
              <Button onClick={login}
                className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
