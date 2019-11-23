import React, { FC } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { EditorConfiguration, Editor } from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/javascript/javascript.js';
import { CodeEditorProps } from 'src/types/code-editor';

const CodeEditor: FC<CodeEditorProps> = (props) =>{
  const codeOptions: EditorConfiguration = {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true,
    readOnly: true,
  };

  const handleEditorDidMount = (editor: Editor) => {
    // 设置宽度、高度自适应
    editor.setSize('100%', props.height);
  };

  return (
    <CodeMirror
      value={props.data}
      options={codeOptions}
      editorDidMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
