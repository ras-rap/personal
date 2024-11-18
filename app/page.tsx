'use client'

import React, { useState, useEffect } from "react";
import StartupScreen from "@/components/StartupScreen";
import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";
import AppWindow from "@/components/AppWindow";
import SettingsApp from "@/components/apps/Settings";
import ProjectsApp from "@/components/apps/Projects";
import MediaViewerApp from "@/components/apps/MediaViewer";
import AboutMeApp from "@/components/apps/AboutMe";
import FileManagerApp from "@/components/apps/FileManager";
import TextEditorApp from "@/components/apps/TextEditor";
import { Settings, Folder, Info, Image, FileText, Edit } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [background, setBackground] = useState("https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?cs=srgb&dl=pexels-8moments-1323550.jpg&fm=jpg");
  const [mediaViewerImage, setMediaViewerImage] = useState<string | null>(null);
  const [textEditorFile, setTextEditorFile] = useState<{ path: string, repo: string } | null>(null);
  const [zIndices, setZIndices] = useState<{ [key: string]: number }>({});
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openApp = (app: string) => {
    if (!openApps.includes(app)) setOpenApps([...openApps, app]);
    setZIndices({ ...zIndices, [app]: highestZIndex + 1 });
    setHighestZIndex(highestZIndex + 1);
  };

  const closeApp = () => {
    setOpenApps([]);
    setMediaViewerImage(null);
    setTextEditorFile(null);
  };

  const changeBackground = (url: string) => setBackground(url);
  const bringToFront = (app: string) => {
    setZIndices({ ...zIndices, [app]: highestZIndex + 1 });
    setHighestZIndex(highestZIndex + 1);
  };

  const appContents: { [key: string]: JSX.Element } = {
    settings: <SettingsApp changeBackground={changeBackground} />,
    projects: (
      <ProjectsApp
        onImageClick={(image) => {
          setMediaViewerImage(image);
          if (!openApps.includes("mediaviewer")) openApp("mediaviewer");
        }}
      />
    ),
    about: <AboutMeApp />,
    filemanager: (
      <FileManagerApp
        defaultRepo="ras-rap/personal"
        openFile={(path, repo) => {
          setTextEditorFile({ path, repo });
          if (!openApps.includes("texteditor")) openApp("texteditor");
        }}
      />
    ),
    texteditor: textEditorFile ? (
      <TextEditorApp filePath={textEditorFile.path} repo={textEditorFile.repo} />
    ) : (
      <div className="text-white p-4">No file selected.</div>
    ),
    mediaviewer: mediaViewerImage ? (
      <MediaViewerApp image={mediaViewerImage} />
    ) : (
      <div className="text-white p-4">No image selected.</div>
    ),
  };

  const appIcons = {
    settings: <Settings />,
    projects: <Folder />,
    about: <Info />,
    filemanager: <FileText />,
    texteditor: <Edit />,
    mediaviewer: <Image />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
        openApp("about");
      }, 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className={`transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <StartupScreen onFinish={() => setLoading(false)} />
        </div>
      ) : (
        <div
          className={`h-screen w-screen relative bg-cover bg-center transition-opacity duration-1000 opacity-100 ${isMobile ? 'mobile-layout' : ''}`}
          style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
        >
          <Desktop openApp={openApp} isMobile={isMobile} />
          <Taskbar openApps={openApps} onOpenApp={openApp} onCloseApp={closeApp} appIcons={appIcons} isMobile={isMobile} />
          {openApps.map((app) => (
            <AppWindow
              key={app}
              title={app === "mediaviewer" ? "Media Viewer" : app === "filemanager" ? "File Manager" : app === "texteditor" ? "Text Editor" : app.charAt(0).toUpperCase() + app.slice(1)}
              content={appContents[app]}
              onClose={() => closeApp()}
              default={{
                x: app === "about" ? window.innerWidth / 2 - 400 : 100,
                y: app === "about" ? window.innerHeight / 2 - 300 : 100,
                width: isMobile ? window.innerWidth : 800,
                height: isMobile ? window.innerHeight - 48 : 600, // Adjust height to account for taskbar
              }}
              zIndex={zIndices[app] || 1}
              onFocus={() => bringToFront(app)}
              isMobile={isMobile}
            />
          ))}
        </div>
      )}
    </>
  );
}