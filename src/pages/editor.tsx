import { Editor, Element, Frame } from "@craftjs/core";
import { Box, Container } from "@material-ui/core";
import React from "react";
import Blockqoute from "../components/user/blockqoute";
import { RenderNode } from "../components/user/RenderNode";

const EditorPage = () => {
  return (
    <Editor enabled={true} resolver={{ Blockqoute }} onRender={RenderNode}>
      <Frame>
        <Box my={8}>
          <Element is={Blockqoute} id="test" />
          <Element is={Blockqoute} id="test2" />
        </Box>
      </Frame>
    </Editor>
  );
};

export default EditorPage;
