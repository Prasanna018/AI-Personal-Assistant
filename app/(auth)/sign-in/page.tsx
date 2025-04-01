"use client"

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { GetUserData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { Sacramento } from 'next/font/google';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { resourceLimits } from 'worker_threads';

function SignIn() {
    const createUser = useMutation(api.users.createUser)
    const { user, setUser } = useContext(AuthContext)
    const router = useRouter()

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse)

            if (typeof window !== "undefined") {
                localStorage.setItem('user-token', tokenResponse.access_token)
            }

            const user = await GetUserData(tokenResponse.access_token)


            const saveData = await createUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture


            })
            setUser(saveData)
            router.replace('/ai-assistants')
            // console.log(saveData)

        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <div className='flex w-full h-screen justify-center items-center flex-col '>
            <div className='flex flex-col items-center border p-8 m-2 rounded-xl shadow-2xl '>

                <div className='flex sm:flex-row flex-col text-center gap-6 justify-center items-center'>
                    <Image
                        src={'logo.svg'} alt='logo'
                        height={100}
                        width={100}

                    >

                    </Image>
                    <h2 className='font-bold lg:text-3xl md:text-2xl text-xl bg-gradient-to-r from-zinc-400 to-indigo-600 bg-clip-text text-transparent'>Welcome to Personal AI Assistant</h2>

                </div>
                <div className='pt-6 '>
                    <Button
                        onClick={() => googleLogin()}
                        className='cursor-pointer'>Sign in with Google</Button>

                </div>
            </div>
        </div>
    )
}

export default SignIn
