import React from "react";

export default function SettingsApp({
  changeBackground,
}: {
  changeBackground: (url: string) => void;
}) {
  const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const url = URL.createObjectURL(event.target.files[0]);
      changeBackground(url);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Change Background</label>
          <input type="file" accept="image/*" onChange={handleBackgroundChange} />
        </div>
      </div>
    </div>
  );
}
