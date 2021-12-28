import React, { memo, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import PropTypes, { string } from "prop-types";

function TextEditorTwo(props) {
  const ToolbarOptions = {
    options: ["inline", "blockType", "list", "textAlign", "link", "history"],
    inline: {
      options: ["bold", "italic", "underline"],
    },
  };

  const _getInitValue = () => {
    if (props.initVal) {
      console.log(props.initVal);
      const contentBlocks = convertFromHTML(props.initVal);
      const contentState = ContentState.createFromBlockArray(contentBlocks);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  };
  const [editorState, setEditorState] = useState(_getInitValue());

  const onEditorStateChange = (items) => {
    setEditorState(items);
    if (props.onChange) {
      props.onChange(draftToHtml(convertToRaw(items.getCurrentContent())));
    }
  };

  return (
    <div className="text-editor">
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={ToolbarOptions}
        rawContentState={editorState}
      />
    </div>
  );
}

export default TextEditorTwo;
