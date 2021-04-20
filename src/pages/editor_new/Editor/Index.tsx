import React from 'react'
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import EditorJs from 'react-editor-js';
import EditorTools from "../../../components/Editor/EditorTools";
import Header from '../../../layouts/layouts/Editor/Header';
import Title from '../../../components/Editor/Title/Title';
import Cover from '../../../components/Editor/Cover/Cover'
const useStyle = makeStyles(theme => ({
    root: {
        marginTop: '2%'
    }
}));

const Index = () => {
    const [title, setTitle] = useState<string>("");
    const [image, setImage] = useState<File>();

    const [instance, setInstance] = useState<any>();
    const classes = useStyle();

    return (
        <>
            <Header editor={instance} title={title} image={image} />
            <Title setTitle={setTitle} previousTitle="" />
            <Cover setImage={setImage} previousCover="" />
            <EditorJs
                tools={EditorTools}
                placeholder="Write Your Story Here ..."
                instanceRef={instance => setInstance(instance)}
            />
        </>
    )
};

export default Index
