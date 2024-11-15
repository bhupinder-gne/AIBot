"use client";

import Chat from "@/components/Chat";
import Header from "@/components/Header";
import { useState } from "react";
import { TabItem, TabEnum } from "@/models";

export default function Home() {
  const [tabs, setTabs] = useState<TabItem[]>([
    { label: TabEnum.Text, isActive: true },
    { label: TabEnum.Image },
  ]);
  const [activeTab, setActiveTab] = useState<TabEnum>(TabEnum.Text);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleTabClicked = (activeTab: TabEnum) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        isActive: tab.label === activeTab,
      }))
    );
    setActiveTab(activeTab);
  };

  const handleDrawerOpen = (isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  };

  return (
    <div className="flex h-screen antialiased text-gray-800 bg-black">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <Header
              tabs={tabs}
              onTabClicked={handleTabClicked}
              onDrawerOpen={handleDrawerOpen}
            />
            <Chat
              activeTab={activeTab}
              isDrawerOpen={isDrawerOpen}
              onDrawerOpen={handleDrawerOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
