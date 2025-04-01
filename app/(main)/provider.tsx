"use client"

import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { GetUserData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { AssistantContext } from '@/context/AssistantContext';

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter()
    const convex = useConvex()
    const { user, setUser } = useContext(AuthContext)
    const [assistant, setAssistant] = useState();
    useEffect(() => {
        CheckUserAuth()

    }, [])

    const CheckUserAuth = async () => {
        const token = localStorage.getItem('user-token')
        const user = token && await GetUserData(token);
        if (!user?.email) {
            router.replace('sign-in')
            return;
        }

        try {
            const result = await convex.query(api.users.getUser, {
                email: user?.email
            })

            setUser(result)


        } catch (error) {

        }

    }
    return (
        <div>
            <div className='fixed w-full top-0 z-50 bg-none'>
                <Header></Header>
            </div>
            <div className='pt-20 sm:pt-10 z-10'>
                <AssistantContext.Provider value={{ assistant, setAssistant }}>


                    {children}
                </AssistantContext.Provider>
            </div>

        </div>
    )
}

export default Provider
