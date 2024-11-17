import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { Folder, Info, FileText } from "lucide-react";

function getLuminance(color: string) {
  const rgb = color.match(/\d+/g);
  if (!rgb) return 0;
  const [r, g, b] = rgb.map(Number);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance;
}

function getTextColor(backgroundColor: string) {
  const luminance = getLuminance(backgroundColor);
  return luminance > 128 ? "black" : "white";
}

export default function Desktop({ openApp }: { openApp: (app: string) => void }) {
  const [backgroundColor, setBackgroundColor] = useState("rgb(57, 48, 83)"); // Default background color
  const [textColor, setTextColor] = useState(getTextColor(backgroundColor));

  useEffect(() => {
    const bgColor = getComputedStyle(document.body).backgroundColor;
    setBackgroundColor(bgColor);
    setTextColor(getTextColor(bgColor));
  }, []);

  const icons = [
    { id: "about", label: "About Me", icon: <Info />, defaultPosition: { x: 50, y: 50 } },
    { id: "projects", label: "Projects", icon: <Folder />, defaultPosition: { x: 150, y: 50 } },
    { id: "filemanager", label: "File Manager", icon: <FileText />, defaultPosition: { x: 250, y: 50 } },
  ];

  return (
    <div className="desktop-container h-full w-full relative" style={{ height: "calc(100vh - 3rem)" }}> {/* Adjust height to account for taskbar */}
      {icons.map((icon) => (
        <Rnd
          key={icon.id}
          default={{ ...icon.defaultPosition, width: 80, height: 100 }}
          bounds="parent"
        >
          <button
            onDoubleClick={() => openApp(icon.id)}
            className="flex flex-col items-center space-y-1"
          >
            <div className="w-16 h-16 flex justify-center items-center bg-darkSlateBlue rounded">
              {icon.icon}
            </div>
            <span className="text-sm" style={{ color: textColor }}>{icon.label}</span>
          </button>
        </Rnd>
      ))}
    </div>
  );
}
