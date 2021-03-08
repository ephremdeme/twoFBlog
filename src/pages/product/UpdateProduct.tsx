import React from 'react'
import { useParams } from 'react-router'

const UpdateProduct = () => {
	const { prodId } = useParams()

	return (
		<div>
			Update Product Here /{prodId}/update
		</div>
	)
}

export default UpdateProduct
