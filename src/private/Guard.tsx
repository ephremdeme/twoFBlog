import { UserRole } from 'features/auth/types'
import React from 'react'

interface IProps {
  children: JSX.Element | JSX.Element[],
  allowedRoles: any[]
}

const Guard: React.FC<IProps> = ({ children, allowedRoles }) => {
  return (
    <div>
      Guarding...
      {children}
    </div>
  )
}

export default Guard
