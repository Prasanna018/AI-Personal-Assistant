"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/context/AuthContext'
import { api } from '@/convex/_generated/api'
import { useConvex } from 'convex/react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { ASSISTANT } from '../../ai-assistants/page'
import { read } from 'fs'
import Image from 'next/image'
import { AssistantContext } from '@/context/AssistantContext'

function AssistantList() {
    const { user } = useContext(AuthContext)
    const convex = useConvex();
    const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
    const { assistant, setAssistant } = useContext(AssistantContext)
    useEffect(() => {
        user && GetAllUserAssistant();
    }, [user])


    const GetAllUserAssistant = async () => {
        const result = await convex.query(api.userAiAssistant.GetAllUserAssistants, {
            uid: user?._id
        })
        // console.log(result)
        setAssistantList(result)



    }
    console.log(assistantList)
    return (
        <div className='h-screen fixed overflow-y-auto bg-secondary text-center rounded-xl p-2 '>

            <h2 className='text-xl font-bold p-4 border '>Your Personal AI Assistant</h2>

            <Button className='w-full p-4 mt-3'>+ Add New Assistant</Button>

            <Input
                className=' mt-3 cursor-pointer'
                placeholder='Search 
            '></Input>

            <div className=''>
                {
                    assistantList.map((data, index) => (
                        <div key={data.id}

                            onClick={() => setAssistant(data)}
                            className={`p-2 flex gap-x-4 text-center hover:bg-gray-600 duration-300 rounded-lg cursor-pointer mt-2
                                ${data.id === assistant?.id && 'bg-gray-800'}
                                
                                `}
                        >
                            <Image
                                src={data.image}
                                alt={data.name}
                                width={60}
                                height={60}
                                className='h-[60px] w-[60px] object-cover rounded-lg'
                            >

                            </Image>

                            <div>

                                <h2 className='text-xl font-bold '>{data.name}</h2>
                                <h2 className='text-center text-gray-600 dark:text-gray-300'>{data.title}</h2>
                            </div>


                        </div>
                    ))
                }
            </div>

            <div className='mt-2 '>
                <footer className='flex items-center  justify-start gap-4 p-2'>
                    <Image
                        src={user?.picture}
                        width={30}
                        height={30}
                        alt={user?.name}

                        className='rounded-full'
                    >


                    </Image>

                    <h2 className='text-lg font-semibold'>{user?.name}</h2>

                    <div>
                        <span className='text-medium font-medium'>{user?.orderId ? 'Pro Plan' : "Free Plan"}</span>
                    </div>

                </footer>
            </div>

        </div >
    )
}

export default AssistantList
