import clsx from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'
interface LinkSidebarProps {
    children : string,
    icon? : React.ReactNode,
    active? : boolean,
    href :string
}
const LinkSidebar = ({children, icon, active,href} : LinkSidebarProps) => {
  return (
    <li>
        <Link to={href} className={
            clsx(`
                flex
                gap-2
                font-bold
                px-2
                py-3
                rounded-s-md
                hover:bg-[#f3f4f6ac]
            `,
            active && "text-primary"
            )}>
            {icon}
            <p className={
                clsx(`my-auto text-[18px] hidden lg:block`, active && "text-primary")
            }>{children}</p>
        </Link>
    </li>
  )
}

export default LinkSidebar