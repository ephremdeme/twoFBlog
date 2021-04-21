import React from 'react'
import { useState } from "react";
import { 
    AppBar, 
    Button, 
    makeStyles, 
    Toolbar, 
    Typography 
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Preview from '../../../components/Editor/Preview/Index';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import firebase, { storage } from '../../../firebase/firebase';

const useStyle = makeStyles((theme: any) =>(
    {
        appBar: {
            background:'none',
            position:'sticky'
        },
        button:{
            // flexGrow:1
        },
        appBarPost:{
            flexGrow:1
        },
        appBarWrapper:{
            width:'80%',
            margin:'0 auto'
        },
        linkStyle:{
            textDecoration:'none'
        }
    }
));

interface IEditorProps {
    editor: any,
    title:string,
    image: File | undefined
}

const Header = (props: IEditorProps) => {
    const classes = useStyle();

    const { editor, title, image } = props
    
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
    const [editorContent, setEditorContent] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const [publishing, setPublishing] = useState(false);
    const [notify, setNotify] = useState<boolean>(false);

    const handleClickPreview = () => {
        editor.save()
            .then((output: any) => {
                if(output.blocks.length){
                    output.title = title
                    // output.coverUrl =coverUrl
                    setEditorContent(output);
                }
            }).catch((error: any) => {
                console.log(error)
            });
        setOpenPreviewModal(true);
    }

    const handleCoverImage = () => {
        if(image) {
            return new Promise((resolve, reject) => {
                storage.ref(`covers/${image.name}`).put(image).on(
                    "state_changed",
                    snapShot => {},
                    error => {
                        reject(error);
                    },
                    () => {
                        return storage 
                            .ref('covers')
                            .child(image.name)
                            .getDownloadURL()
                            .then((url: string) => {
                                resolve(url)
                            });
                    }
                );
            });
        }
    }

    const handleClickPublish = () => {
        if(image != undefined && title != "" ){
            setPublishing(true);
            const blogRef = firebase.firestore().collection('f2-blogs');
            handleCoverImage()?.then((url) => {
                editor.save()
                    .then((output: any) => {
                        if(output.blocks.length){
                            output.title = title
                            output.coverUrl = url
                            blogRef.add(output)
                                .then(()=> { setPublishing(false); setNotify(true)})
                                .catch(()=>setPublishing(false))
                        }
                    })
                    .catch((error: any) => {
                        console.log(error)
                    });
                })
                .catch(err => console.log(err));
        } else {
            setOpen(true);
        }
    }

    return(
        <>
            <AppBar 
                className={classes.appBar} 
                elevation={0}
            >
                <Toolbar className={classes.appBarWrapper}>
                    <Link to="/posts/list" className={classes.linkStyle}>
                        <Button className={classes.button}><ChevronLeftIcon />Posts</Button>
                    </Link>

                    <Typography className={classes.appBarPost}></Typography>
                    <Button 
                        className={classes.button} 
                        onClick={handleClickPreview}
                    >
                        Preview
                    </Button>

                    <Button 
                        className={classes.button} 
                        onClick={handleClickPublish}
                        disabled={publishing}
                    >
                        { publishing ? 'Publishing...' : 'Publish' }
                    </Button>
                </Toolbar>
            </AppBar>
            <Collapse in={open && (!title || !image)} style={{ padding:10}}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="secondary"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }

                    severity="error"

                    color="error"

                    style={{
                        width:'50%',
                        margin: '0 auto'
                    }}
                >
                    <ul>
                        {! image ? <li>Cover image is required</li>: null}
                        {! title ? <li>Title is required</li>: null}
                    </ul>
                </Alert>
            </Collapse>

            <Preview setOpen={setOpenPreviewModal} open={openPreviewModal} editorContent={editorContent}/>
            <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={notify} 
                autoHideDuration={6000} 
                onClose={()=>setNotify(false)}
            >
            <MuiAlert 
                elevation={6} 
                variant="filled" 
                severity="success" 
                onClose={()=>setNotify(false)}
            >
                Published Successfully!
            </MuiAlert>
        </Snackbar>
        </>
    );
}

export default Header