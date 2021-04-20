import React from 'react'
import { useEffect } from 'react';
import './Title.css';
interface ITitleProps {
    setTitle: (title: string) => void,
    previousTitle: string
}

const Title = (props: ITitleProps) => {
    const { setTitle, previousTitle } = props;

    useEffect(() => {
        if(previousTitle) {
            const titleHolder = document.getElementById('title');
            if(titleHolder){
                titleHolder.innerHTML = previousTitle;
            }
        }
    },[]);

    const handleTitleChange = () => {
        const title: any = document.getElementById('title')
        if(title){
            setTitle(title.innerHTML.trim())
        }
    }

    return (
        <>
            <div
                id='title'
                contentEditable='true'
                data-placeholder='Title...'
                className='title'
                onKeyUp={handleTitleChange}
            >
            </div>
        </>
    )
}

export default Title