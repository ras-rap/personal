"use client";

import { Github, MessageSquare, Youtube } from "lucide-react";

export default function AboutMeApp() {
  return (
    <div className="text-white p-4">
      <h1 className="text-2xl mb-4">About Me</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl">Username</h2>
          <p>Ras_rap</p>
        </div>
        <div>
          <h2 className="text-xl">Socials</h2>
          <div className="flex space-x-4">
            <a href="https://github.com/ras-rap" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-2 rounded bg-deepViolet text-white hover:bg-darkSlateBlue">
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a href="https://discord.com/users/867970591267881000" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-2 rounded bg-deepViolet text-white hover:bg-darkSlateBlue">
              <MessageSquare size={16} />
              <span>Discord</span>
            </a>
            <a href="https://www.youtube.com/@Ras_rap" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 p-2 rounded bg-deepViolet text-white hover:bg-darkSlateBlue">
              <Youtube size={16} />
              <span>YouTube</span>
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-xl">Languages I Code In</h2>
          <ul className="list-disc list-inside">
            <li>Python</li>
            <li>TypeScript</li>
            <li>CSS</li>
            <li>HTML</li>
            <li>C#</li>
          </ul>
        </div>
      </div>
    </div>
  );
}