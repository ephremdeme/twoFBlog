import React from 'react'
import { Container } from "@material-ui/core";
import RenderContent from './RenderContent';

const Index = (props: any) => {
    return (
        <>
            <Container maxWidth="xs">
              <RenderContent content={props.content} />
            </Container>
        </>
    );
}

export default Index
