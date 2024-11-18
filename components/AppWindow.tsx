import React, { useState } from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";

interface AppWindowProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  default: { x: number; y: number; width: number; height: number };
  zIndex: number;
  onFocus: () => void;
  isMobile: boolean;
}

const AppWindow = ({ title, content, onClose, default: defaultProps, zIndex, onFocus, isMobile }: AppWindowProps) => {
  const [position, setPosition] = useState({ x: defaultProps.x, y: defaultProps.y });
  const [size] = useState({ width: defaultProps.width, height: defaultProps.height });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart: RndDragCallback = () => {
    setIsDragging(true);
    onFocus();
  };

  const handleDragStop: RndDragCallback = (e, d) => {
    setIsDragging(false);
    setPosition({ x: d.x, y: d.y });
  };

  const handleResizeStart: RndResizeCallback = () => {
    setIsDragging(true);
    onFocus();
  };

  const handleClick = () => {
    onFocus();
  };

  return (
    <Rnd
      size={{ width: isMobile ? '100vw' : size.width, height: isMobile ? 'calc(100vh - 3rem)' : size.height }}
      position={{ x: isMobile ? 0 : position.x, y: isMobile ? 0 : position.y }}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStart}
      bounds="window"
      minWidth={300}
      minHeight={200}
      style={{ zIndex, opacity: isDragging ? 0.8 : 1 }}
      disableDragging={isMobile}
      enableResizing={!isMobile}
    >
      <div className={`window rounded-lg shadow-lg ${isMobile ? 'mobile-window' : ''}`} onClick={handleClick} style={{ zIndex }}>
        <div className="window-header flex justify-between items-center p-2 bg-darkSlateBlue text-white rounded-t-lg">
          <span>{title}</span>
          <button onClick={onClose} className="text-white">X</button>
        </div>
        <div className="window-content p-2 bg-darkSlateBlue text-white rounded-b-lg">
          {content}
        </div>
      </div>
    </Rnd>
  );
};

export default AppWindow;