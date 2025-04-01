"use client"

import { AuthContext } from '@/context/AuthContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Header() {
    const { user } = useContext(AuthContext)
    return (

        <div className='p-3 shadow-lg flex justify-between w-full items-center  '>
            <Image
                src={'logo.svg'}
                alt='logo'
                height={50}
                width={50}
            >

            </Image>

            {
                user?.picture && <Image
                    src={user?.picture}
                    alt='logo'
                    height={50}
                    width={50}
                    className='rounded-full'
                >

                </Image>
            }

        </div>
    )
}

export default Header

