import React from 'react'
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { DropzoneArea } from 'material-ui-dropzone'

const useStyle = makeStyles(theme =>({
    root:{
       width:'45%',
       margin:'0 auto',
       padding:10
    },
    cover: {
        fontWeight:'bolder', 
        color:'#727171'
    },
    output: {
        width:'100%'
    },
    uploadIcon: {
        color:'#727171'
    }
}));

interface IImage {
    setImage: (image: File) => void,
    previousCover:string
}

const Cover = ({ setImage, previousCover }: IImage) => {
    const classes = useStyle()

    const handleUploadClick = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        const img: any = document.getElementById('output');

        const reader = new FileReader();

        reader.onload = () => {
            const result = reader.result;
            img.src = result
        }
        if(file){
            reader.readAsDataURL(file);
            setImage(file);
        }
    }

    const handleDropZone = (files: any) => {
       
    }

    const chooseImageButtonClick = () => {
        const cover: any = document.getElementById('cover_upload');
        cover.click();
    }

    return (
        <>
           <Grid
            className={classes.root}
           >
                {/* <DropzoneArea 
                    filesLimit={1}
                    onChange={handleDropZone}
                    showAlerts={false}
                /> */}
                <input 
                    accept="image/*"
                    type="file" 
                    onChange={handleUploadClick}
                    id="cover_upload"
                    hidden
                />
                <img 
                    className={classes.output} 
                    id="output"
                    src = {previousCover ? previousCover : ""}
                />
               <Button
                    color="default"
                    className={classes.cover}
                    onClick={chooseImageButtonClick}
                    startIcon={<CloudUploadIcon className={classes.uploadIcon} />}
                >
                    Cover Photo
                </Button>
           </Grid>            
        </>
    )
}

export default Cover