import React from 'react'
import AssistantList from './_components/AssistantList'

function WorkSpace() {



    return (
        <div className='pt-12'>
            <div className='grid grid-cols-5'>

                <div className='hidden md:block'>

                    <AssistantList></AssistantList>
                </div>

                <div className='md:col-span-4 lg:col-span-3'>
                    {/* chat ui */}
                    chat ui
                </div>

                <div className='hidden lg:block'>
                    {/* settings */}
                    settings
                </div>

            </div>
        </div>
    )
}

export default WorkSpace
