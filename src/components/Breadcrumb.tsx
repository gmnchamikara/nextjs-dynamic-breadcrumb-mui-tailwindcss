'use client'

// React Imports
import { useState } from 'react'
import React, { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

// MUI Imports

import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

type TBreadCrumbProps = {
  homeElement: ReactNode,
  separator: ReactNode,
  containerClasses?: string,
  listClasses?: string,
  activeClasses?: string,
  capitalizeLinks?: boolean
}

const Breadcrumb = ({ homeElement, listClasses, activeClasses, capitalizeLinks }: TBreadCrumbProps) => {
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)

  // States
  const [open, setOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const getModeIcon = () => {
    return 'ri-arrow-right-s-fill'
  }

  return (
    <>
      <Tooltip
        title={'Navigator'}
        onOpen={() => setTooltipOpen(true)}
        onClose={() => setTooltipOpen(false)}
        open={open ? false : tooltipOpen ? true : false}
        PopperProps={{ className: 'capitalize' }}
      >
        <i className={getModeIcon()} />
      </Tooltip>
      <Breadcrumbs aria-label='breadcrumb'>
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`
          let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
          let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1) : link

          // Determine if the link should be disabled

          const isDisabled = itemLink === 'En' || itemLink === 'Dashboards'
          
          return (
            <Typography color='text.primary' key={index}>
              {isDisabled ? (
                <span className='font-bold' style={{ cursor: 'context-menu', color: 'grey' }}>
                  {itemLink}
                </span>
              ) : (
                <Link underline='hover' href={href} className={itemClasses}>
                  {itemLink}
                </Link>
              )}
            </Typography>
          )
        })}
      </Breadcrumbs>
    </>
  )
}

export default Breadcrumb
