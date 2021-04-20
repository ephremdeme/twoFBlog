import React from 'react'
import { Grid } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import EditHeader from '../../../layouts/layouts/Posts/EditHeader';
import Editorjs from 'react-editor-js';
import EditorTools from '../../../components/Editor/EditorTools';
import { useState } from 'react';
import Title from '../../../components/Editor/Title/Title';
import Cover from '../../../components/Editor/Cover/Cover'

const Edit = () => {
    const [instance, setInstance] = useState<any>();
    const location: any = useLocation();
    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<File>();

    return (
        <>
            <EditHeader 
                id={location.state.id} 
                editor={instance} 
                title={title}
                image={image}
                previousCover={location.state.blog.coverUrl}
                previousTitle={location.state.blog.title}
            />

            <Title setTitle={setTitle} previousTitle={location.state.blog.title}/>

            <Cover setImage={setImage} previousCover={location.state.blog.coverUrl}/>
            
            <Editorjs 
                data={location.state.blog}
                tools={EditorTools}
                instanceRef={instance => setInstance(instance)}
            />
        </>
    )
}

export default Edit;