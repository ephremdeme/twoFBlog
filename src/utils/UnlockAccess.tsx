import { useAppSelector } from 'app/hooks'
import { selectUserRole } from 'features/auth'
import { UserRole } from 'features/auth/types';
import React from 'react'

interface IProps {
  request: UserRole[],
  children: JSX.Element | JSX.Element[]
}

const UnlockAccess: React.FC<IProps> = ({ request, children }) => {
  const roles = useAppSelector(selectUserRole);
  const permission = roles.some((role) => request.indexOf(role) !== -1)

  return (
    <>
      {
        permission && (children)
      }
    </>
  )
}

export default UnlockAccess
