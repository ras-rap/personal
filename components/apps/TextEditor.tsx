"use client";

import { useState, useEffect } from "react";

interface TextEditorAppProps {
  filePath: string;
  repo: string;
}

const TextEditorApp = ({ filePath, repo }: TextEditorAppProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`);
        const data = await response.json();
        if (data && data.content) {
          const content = atob(data.content);
          setText(content);
        }
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };

    fetchFileContent();
  }, [filePath, repo]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="text-white p-4 h-full flex flex-col">
      <h1 className="text-2xl mb-4">Text Editor</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        className="flex-1 p-2 rounded bg-darkSlateBlue text-white border border-gray-600 resize-none"
        style={{ minHeight: "400px", width: "100%" }}
      />
    </div>
  );
};

export default TextEditorApp;