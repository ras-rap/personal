import React, { useState } from "react";
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd";

interface AppWindowProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  default: { x: number; y: number; width: number; height: number };
  zIndex: number;
  onFocus: () => void;
}

const AppWindow = ({ title, content, onClose, default: defaultProps, zIndex, onFocus }: AppWindowProps) => {
  const [position, setPosition] = useState({ x: defaultProps.x, y: defaultProps.y });
  const [size,] = useState({ width: defaultProps.width, height: defaultProps.height });
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
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStart}
      style={{ zIndex, opacity: isDragging ? 0.8 : 1 }}
    >
      <div className="window rounded-lg shadow-lg" onClick={handleClick} style={{ zIndex }}>
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
