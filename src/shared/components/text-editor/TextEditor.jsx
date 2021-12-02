import React, { memo, useState } from "react";
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";

const ToolbarOptions = {
  options: ["inline", "blockType", "list", "textAlign", "link", "history"],
  inline: {
    options: ["bold", "italic", "underline"],
  },
};

const TextEditorTwo = memo(({ onChange, initVal }) => {
  const _getInitValue = () => {
    if (initVal) {
      const contentBlocks = convertFromHTML("<p>Hello world</p>");
      const contentState = ContentState.createFromBlockArray(contentBlocks);
      return convertToRaw(contentState);
    } else {
      return EditorState.createEmpty();
    }
  };
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorState, setEditorState] = useState(_getInitValue());

  const onEditorStateChange = (items) => {
    setEditorState(items);
    if (onChange) {
      onChange(draftToHtml(convertToRaw(items.getCurrentContent())));
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
});

TextEditorTwo.propTypes = {
  onChange: PropTypes.func,
};

TextEditorTwo.defaultProps = {
  onChange: () => {},
};

export default TextEditorTwo;
