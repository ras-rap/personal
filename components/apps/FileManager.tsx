"use client";

import { useState, useEffect } from "react";
import { Folder as FolderIcon, FileText as FileIcon } from "lucide-react";

interface FileManagerAppProps {
  defaultRepo: string;
  remoteRepo?: string;
  openFile: (path: string, repo: string) => void;
}

interface File {
  name: string;
  path: string;
  type: string;
}

const FileManagerApp = ({ defaultRepo, remoteRepo, openFile }: FileManagerAppProps) => {
  const [repo, setRepo] = useState(remoteRepo || defaultRepo);
  const [inputRepo, setInputRepo] = useState(remoteRepo || defaultRepo);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const fetchFiles = async (retryCount = 0) => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${currentPath}`);
        if (response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0") {
          const resetTime = response.headers.get("X-RateLimit-Reset");
          const delay = resetTime ? (parseInt(resetTime) - Math.floor(Date.now() / 1000)) * 1000 : 60000;
          console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
          setTimeout(() => fetchFiles(retryCount + 1), delay);
          return;
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setFiles(data);
        } else {
          setFiles([]);
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setFiles([]);
      }
      setLoading(false);
    };

    fetchFiles();
  }, [repo, currentPath]);

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputRepo(event.target.value);
  };

  const handleRepoSubmit = () => {
    if (inputRepo !== repo) {
      setRepo(inputRepo);
    }
  };

  const handleRepoKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleRepoSubmit();
    }
  };

  const handleFolderClick = (path: string) => {
    setCurrentPath(path);
  };

  const handleFileDoubleClick = (path: string) => {
    openFile(path, repo);
  };

  const handleBackClick = () => {
    const pathParts = currentPath.split("/").filter(Boolean);
    pathParts.pop();
    setCurrentPath(pathParts.join("/"));
  };

  return (
    <div className="text-white p-4">
      <h1 className="text-2xl mb-4">File Manager</h1>
      <div className="mb-4">
        <label className="block mb-2">GitHub Repository</label>
        <input
          type="text"
          value={inputRepo}
          onChange={handleRepoChange}
          onKeyPress={handleRepoKeyPress}
          onBlur={handleRepoSubmit}
          className="w-full p-2 rounded bg-darkSlateBlue text-white border border-gray-600"
        />
      </div>
      <div className="mb-4">
        <button onClick={handleBackClick} className="text-white bg-darkSlateBlue p-2 rounded">Back</button>
      </div>
      {loading ? (
        <p>Loading files...</p>
      ) : (
        <ul className="list-disc list-inside">
          {files.map((file) => (
            <li
              key={file.path}
              className="flex items-center space-x-2 p-2 rounded hover:bg-darkSlateBlue cursor-pointer"
              onClick={() => file.type === "dir" ? handleFolderClick(file.path) : handleFileDoubleClick(file.path)}
            >
              {file.type === "dir" ? (
                <FolderIcon size={16} />
              ) : (
                <FileIcon size={16} />
              )}
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileManagerApp;