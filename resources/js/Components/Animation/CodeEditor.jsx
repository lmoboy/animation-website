import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-dark.css';

export default function CodeEditor({ initialValue = '', onCodeChange }) {
  const [code, setCode] = useState(initialValue);

  return (
    <div className="code-editor-container border border-gray-700 rounded-lg overflow-hidden">
      <Editor
        value={code}
        onValueChange={(newCode) => {
          setCode(newCode);
          onCodeChange?.(newCode);
        }}
        highlight={code => highlight(code, languages.js)}
        padding={15}
        className="font-mono text-sm bg-gray-900 text-gray-100"
        style={{
          minHeight: '200px',
          caretColor: '#a855f7',
        }}
        textareaClassName="focus:outline-none"
        preClassName="overflow-auto"
        tabSize={2}
        insertSpaces={true}
        ignoreTabKey={false}
      />
    </div>
  );
}