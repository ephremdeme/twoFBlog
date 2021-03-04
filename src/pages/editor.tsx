import { Editor, Element, Frame } from "@craftjs/core";
import { Box, Container } from "@material-ui/core";
import React from "react";
import Blockqoute from "../components/user/blockqoute";

const EditorPage = () => {
  return (
    <Editor>
      <Frame>
        <Box my={8}>
          <Element is={Blockqoute} id="test" />
        </Box >
      </Frame>
    </Editor>
  );
};

export default EditorPage;
