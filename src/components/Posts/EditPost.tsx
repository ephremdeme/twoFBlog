import React from 'react'
import EditorJs from 'react-editor-js';
import EditorTools from '../Editor/EditorTools';

const EditPost = (props: any) => {
    return (
        <>
            <EditorJs 
                tools={EditorTools}
                data={props.blog}
            />
        </>
    )
}

export default EditPost