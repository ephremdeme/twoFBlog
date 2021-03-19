import { RootState } from 'app/store'
import { getMeTheFire } from 'features/user'
import React, { useEffect } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'

export default function GuestsHomePage() {
    const test = useSelector((state: RootState) => state.user.test)
    const dispatch = useDispatch()

    return (
        <div>
            <h3>GuestsHomePage</h3>
        </div>
    )
}


