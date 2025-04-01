"use client"

import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import AiAssistantsList from '../_components/AiAssistantsList'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { BlurFade } from '@/components/magicui/blur-fade'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { AuthContext } from '@/context/AuthContext'

import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'


export type ASSISTANT = {
    id: number
    name: string,
    title: string,
    image: string,
    instruction: string,
    userInstruction: string,
    sampleQuestions: string[]
}
function AIassistant() {
    const [selectedAssistant, setSelectedAssistant] = useState<ASSISTANT[]>([]);

    const insertAssistant = useMutation(api.userAiAssistant.InsertedSelectedAssistant)
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const convex = useConvex();
    const router = useRouter();

    useEffect(() => {

        user && GetAllUserAssistant();
    }, [user])


    const GetAllUserAssistant = async () => {
        const result = await convex.query(api.userAiAssistant.GetAllUserAssistants, {
            uid: user?._id
        })

        if (result.length > 0) {
            router.replace('/workspace');
            return

        }

    }

    const onSelect = (assistant: ASSISTANT) => {
        const item = selectedAssistant.find((item: ASSISTANT) => item.id === assistant.id)

        if (item) {
            setSelectedAssistant(selectedAssistant.filter((item: ASSISTANT) => item.id !== assistant.id));
            return;
        }

        setSelectedAssistant(prev => [...prev, assistant]);


    }

    const isAssistantChecked = (assistant: ASSISTANT) => {
        const item = selectedAssistant.find((item: ASSISTANT) => item.id === assistant.id)
        return item ? true : false
    }

    const onContinue = async () => {
        setLoading(true)
        const result = await insertAssistant({
            records: selectedAssistant,
            uid: user?._id
        })
        setLoading(false)

        console.log(result)

    }

    console.log(selectedAssistant)
    return (
        <div className='px-4 sm:px-18 md:px-28 lg:px-48 mt-10 md:mt-20
        '>
            <div className='flex md:flex-row space-y-4 text-center  flex-col justify-between items-center'>
                <div>
                    <h2 className='md:text-3xl text-2xl font-extrabold bg-gradient-to-tr from-slate-800 to-indigo-600 bg-clip-text text-transparent'>Welcome to the world of personal AI assistant  </h2>
                    <p className='text-xl font-medium'>Choose your AI companion to simplify your life 🚀</p>
                </div>
                <Button

                    disabled={selectedAssistant.length !== 0 ? false : loading && true}
                    className='cursor-pointer' variant={'default'}
                    onClick={onContinue}
                >{loading ? <Loader2Icon className='animate-spin'></Loader2Icon> : "Continue"}</Button>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5
            '>
                {AiAssistantsList.map((data, index) => {
                    return (
                        <BlurFade key={data.image} delay={0.25 + index * 0.05} inView>

                            <div

                                onClick={() => onSelect(data)}
                                className='p-2 hover:scale-105 duration-200 relative'
                                key={data.name}>
                                <Checkbox

                                    checked={isAssistantChecked(data)}
                                    className='absolute m-2'></Checkbox>
                                <Image
                                    width={600}
                                    height={600}
                                    src={data.image}
                                    alt={data.name}
                                    className='rounded-xl object-cover w-full lg:h-[280px] sm:h-[200px] h-[160px] '

                                >

                                </Image>

                                <h2 className='text-xl text-center font-bold '>{data.name}</h2>
                                <span className='text-center text-lg text-gray-600 dark:text-gray-300'>{data.title}</span>


                            </div>
                        </BlurFade>
                    )
                })}
            </div>
        </div>
    )
}

export default AIassistant
