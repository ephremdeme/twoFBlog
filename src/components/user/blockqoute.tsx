import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, makeStyles, Popper } from "@material-ui/core";
import { useNode, UserComponent } from "@craftjs/core";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { AnyCnameRecord } from "dns";

const useStyles = makeStyles({
  root: {
  },
  blockqoute: {
    display: "block",
    paddingLeft: "16px",
    marginLeft: "10px",
    borderLeftStyle: "solid",
    borderLeftColor: "#1279BE",
    minHeight: "70px",
  },
});

export const Blockqoute: UserComponent<BlockqouteProps> = ({
  text,
  textAlign,
  fontSize,
}) => {
  const classes = useStyles();
  const html = useRef(text || "Edit Blockqoute");
  const inputRef = useRef<HTMLLinkElement>(null);

  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (anchorEl) inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  const handleChange = (e: ContentEditableEvent) => {
    html.current = e.target.value;
  };
  return (
    <div
      className={classes.root}
      onClick={(e) => selected && setEditable(true)}
      ref={(ref) => connect(drag(ref))}
    >
      <ContentEditable
        innerRef={inputRef}
        html={html.current}
        onChange={handleChange}
        disabled={!editable}
        aria-describedby={id}
        onFocus={handleClick}
        tagName={"blockquote"}
        className={classes.blockqoute}
        style={{ fontSize: `${fontSize}px`, textAlign }}
        title="Editable"
      />

      <Popper id={id} open={open} anchorEl={anchorEl} placement={"top"}>
        <div style={{ display: "inline-block" }}>
          <EditButton cmd="bold" name={"B"} />
          <EditButton cmd="italic" name={"I"} />
          <EditButton cmd="underline" name={"U"} />
        </div>
      </Popper>
    </div>
  );
};

const EditButton: React.FC<{ name: string; cmd: string }> = (props) => {
  return (
    <Button
      key={props.cmd}
      style={{ margin: "8px" }}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </Button>
  );
};

type BlockqouteProps = {
  text?: string;
  fontSize?: number;
  textAlign?: string;
};




export default Blockqoute;
