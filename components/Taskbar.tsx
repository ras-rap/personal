import { useState } from "react";
import { Folder, Info, Home, Search, FileText, X } from "lucide-react";

export default function Taskbar({ openApps, onOpenApp, onCloseApp, appIcons, isMobile }: { openApps: string[]; onOpenApp: (app: string) => void; onCloseApp: () => void; appIcons: { [key: string]: JSX.Element }, isMobile: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pinnedApps = [
    { id: "about", icon: <Info />, label: "About Me" },
    { id: "projects", icon: <Folder />, label: "Projects" },
    { id: "filemanager", icon: <FileText />, label: "File Manager" },
  ];

  return (
    <div className={`fixed bottom-0 left-0 w-full h-12 bg-darkPurple flex items-center px-4 ${isMobile ? 'mobile-taskbar' : ''}`}>
      {isMobile && openApps.length > 0 ? (
        <div className="flex justify-center w-full">
          <button
            onClick={onCloseApp}
            className="flex items-center text-gray-300 hover:text-white px-3 py-1 bg-darkSlateBlue rounded"
          >
            <X />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center text-gray-300 hover:text-white px-3 py-1 bg-darkSlateBlue rounded"
          >
            <Home />
          </button>
          {menuOpen && (
            <div className="absolute bottom-12 left-4 w-64 bg-darkSlateBlue rounded shadow-lg p-4">
              <div className="flex items-center mb-4">
                <Search className="text-gray-300" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="ml-2 p-1 w-full bg-darkSlateBlue text-white border border-gray-600 rounded"
                />
              </div>
              <ul className="space-y-2">
                {pinnedApps.map((app) => (
                  <li key={app.id}>
                    <button
                      onClick={() => {
                        onOpenApp(app.id);
                        setMenuOpen(false);
                      }}
                      className="flex items-center text-gray-300 hover:text-white w-full text-left p-2 rounded"
                    >
                      {app.icon}
                      <span className="ml-2">{app.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {pinnedApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id)}
              className="flex flex-col items-center text-gray-300 hover:text-white"
            >
              {app.icon}
              <span className="text-xs">{app.label}</span>
            </button>
          ))}
          <div className="ml-auto flex space-x-2">
            {openApps.map((app) => (
              <button
                key={app}
                onClick={() => onOpenApp(app)}
                className="flex items-center text-gray-300 hover:text-white px-3 py-1 bg-darkSlateBlue rounded"
              >
                {appIcons[app]}
                <span className="ml-2">{app === "mediaviewer" ? "Media" : app.charAt(0).toUpperCase() + app.slice(1)}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}