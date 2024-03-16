import React from 'react'

const Header = ({title,subtitle}:{title:string,subtitle?:string}) => {
  return (
    <>
        <h1 className='text-3xl'> {title}</h1>
        {subtitle && <p className='p-16-regular mt-4'> {subtitle} </p>}
    </>
  )
}

export default Header