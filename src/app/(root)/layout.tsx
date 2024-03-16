import SideBar from '@/components/shared/SideBar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
        <main className='root'>

                <SideBar />
             {/* <MobileNav /> */}
            <div className='mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10'>
                <div className='wrapper'>
                    {children}
                </div>
            </div>
        </main>
  )
}

export default Layout