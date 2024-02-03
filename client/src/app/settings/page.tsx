import { ThemeToggler } from "@/components/UI/ThemeToggler";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="border-1 rounded-lg shadow-lg p-4 lg:p-6">
      <span className="flex items-center gap-2">
        Dark Mode: <ThemeToggler />
      </span>
    </div>
  );
};

export default SettingsPage;
