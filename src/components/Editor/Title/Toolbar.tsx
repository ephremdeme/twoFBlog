import React from 'react'
import './Toolbar.css'
const Toolbar = () => {
    const format = (arg: string) => {

    }

    const addLink = () => {

    }

    const setUrl = (arg: any) => {

    }

    const setHeader = () => {

    }

    const addCodeBlock = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div className="toolbar">
            <button onClick={e => format('bold')}>Bold</button>
            <button onClick={e => format('italic')}>Italic</button>
            <button
                onClick={e => format('insertUnorderList')}
            >
            <button onClick={e => addLink()}>Link</button>
            <div id='url-input' className='hidden'>
                <input id='txtFormatUrl' placeholder='url'/>
                <button onClick={e => setUrl(e)}>Create Link</button>
            </div>
            <button onClick={e => setHeader()}>Header</button>
            <button onClick={e => addCodeBlock()}>CodeBlock</button>
            <button onClick={e => handleSubmit()}>Submit</button>
            </button>
        </div>
    )
}

export default Toolbar;