import { IProduct } from 'features/product/types'
import React from 'react'

interface IProps {
  product: IProduct
}

const AdditionalDetail: React.FC<IProps> = ({product}) => {
  return (
    <div>
      Additional Detail
    </div>
  )
}

export default AdditionalDetail
