import React from 'react'
import { Grid, makeStyles, Typography , Button} from '@material-ui/core';
import { Markup } from 'interweave';

const useStyles = makeStyles((theme: any) => ({
    root:{
        marginTop:10,
        width:'75%',
        margin:'0 auto',
    },
    titleStyle:{
        marginTop:10,
    }
}));

const RenderContent = (props: any) => {
    const classes = useStyles();

    const displayContent = (content: any) => {
        console.log(content.type)
        switch (content.type) {
            case "Embed":
                return(
                    <iframe 
                        width="90%" 
                        height="400" 
                        src={content.data.embed} 
                        style={{ margin:'0 auto'}}
                    />
                )
            case "List":
                if(content.data.style === "ordered"){
                    return (
                        <ol>
                            {
                                content.data.items.map((item: any) => {
                                    return <li style={{ padding:5}}><Markup content={item}/></li>
                                })
                            }
                        </ol>
                    )
                }else {
                    return (
                        <ul>
                            {
                                content.data.items.map((item: any) => {
                                    return <li style={{ padding:5}}><Markup content={item}/></li>
                                })
                            }
                        </ul>
                    )
                }
            case "Delimiter":
                return <Typography variant="h3" style={{ alignSelf:'center'}}>* * *</Typography>
            case "Header":
                return <Typography variant="h4"><Markup content={content.data.text}/></Typography>
            case "Image":
                return <img 
                            src={content.data.file.url} 
                            width="100%"
                            style={{ margin:'0 auto', padding:5}}
                        />
            default:
                return <Markup content={content.data.text}/>
        }
        
    }

    const onlyMembers = () => {
        return (
            <Grid 
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <p 
                    style={{ 
                        fontWeight:'bolder', 
                        fontSize:20, 
                        fontFamily:'monospace', 
                        color:'#534F4F'
                    }}
                >
                    YOU NEED TO LOGIN TO SEE MORE
                </p>
                <Button
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </Grid>
        )
    }

    return (
        <Grid>
            {props.content ? <h1 style={{ textAlign:'center'}}>{props.content.title}</h1> : null}
            {
                props.content ? props.content.blocks.map((content: any) => {
                    return (
                        <Grid
                            container
                            direction="column"
                            className={classes.root}
                           >
                                <>
                                  {content.type == "MembersOnly" ? onlyMembers() : displayContent(content)}
                                </>
                        </Grid>
                    )
                }): null
            }
        </Grid>
    )
};

export default RenderContent;