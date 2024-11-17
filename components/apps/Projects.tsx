"use client";

import { useState } from "react";
import { LucideIcon, ExternalLink, Github, MessageSquare } from "lucide-react";

const projectsData = [
  {
    id: "krakenhosting",
    name: "KrakenHosting",
    description: "A cheap and affordable game hosting solution.",
    website: "https://krakenhosting.net/",
    discord: "https://discord.gg/krakenhosting",
    images: [
      "https://i.imgur.com/yOPSc1J.png",
      "https://cloud-g3fnx8eej-hack-club-bot.vercel.app/0image.png",
    ],
  },
  {
    id: "dmscreen",
    name: "DM Screen",
    description: "An all-in-one website for Dungeon Masters in D&D.",
    website: "https://dms.ras-rap.click",
    github: "https://github.com/ras-rap/dm-screen",
    images: [
      "https://cloud-8uov2clpn-hack-club-bot.vercel.app/0image.png",
    ],
  },
  {
    id: "personal",
    name: "Personal Website",
    description: "The website you're currently viewing!",
    github: "https://github.com/ras-rap/personal",
    images: [],}
];


export default function ProjectsApp({
  onImageClick,
}: {
  onImageClick: (image: string) => void;
}) {
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);

  const ActionButton = ({
    icon: Icon,
    label,
    url,
  }: {
    icon: LucideIcon;
    label: string;
    url: string;
  }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 p-2 rounded bg-deepViolet text-white hover:bg-darkSlateBlue"
    >
      <Icon size={16} />
      <span>{label}</span>
    </a>
  );

  return (
    <div className="flex h-full">
      <div className="w-1/4 bg-darkPurple text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        <ul className="space-y-2">
          {projectsData.map((project) => (
            <li key={project.id}>
              <button
                className={`w-full text-left p-2 rounded ${
                  selectedProject.id === project.id
                    ? "bg-deepViolet text-white"
                    : "hover:bg-darkSlateBlue hover:text-white"
                }`}
                onClick={() => setSelectedProject(project)}
              >
                {project.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-darkSlateBlue text-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">{selectedProject.name}</h1>
        <p className="mb-4">{selectedProject.description}</p>

        <div className="flex space-x-4 mb-6">
          {selectedProject.website && (
            <ActionButton
              icon={ExternalLink}
              label="Website"
              url={selectedProject.website}
            />
          )}
          {selectedProject.github && (
            <ActionButton
              icon={Github}
              label="GitHub"
              url={selectedProject.github}
            />
          )}
          {selectedProject.discord && (
            <ActionButton
              icon={MessageSquare}
              label="Discord"
              url={selectedProject.discord}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {selectedProject.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${selectedProject.name} screenshot ${index + 1}`}
              className="rounded shadow-lg cursor-pointer"
              onClick={() => onImageClick(img)} // Open media viewer on click
            />
          ))}
        </div>
      </div>
    </div>
  );
}