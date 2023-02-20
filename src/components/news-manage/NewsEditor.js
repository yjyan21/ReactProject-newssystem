import React,{useState} from 'react'
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor() {
	const [editorState, setEditorState] = useState("111")
  return (
    <div>
        <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
           
        />;
    </div>
  )
}
