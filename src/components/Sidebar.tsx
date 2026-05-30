import React from 'react';
import { LayoutDashboard, KanbanSquare, Calendar, History, Settings, HelpCircle, PlusCircle, Building2 } from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  onNewTaskClick: () => void;
}

export default function Sidebar({ currentTab, setCurrentTab, user, onNewTaskClick }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'board', label: 'Task Board', icon: KanbanSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'activity', label: 'Activity', icon: History },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex flex-col p-4 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 hidden md:flex">
        {/* Workspace Info */}
        <div className="flex items-center gap-3 px-4 py-5 mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
            TF
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">Workspace</h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{user.company}</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold shadow-sm shadow-blue-500/5'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Lower Core Actions */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <button
            onClick={onNewTaskClick}
            id="sidebar-new-project-btn"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            New Task
          </button>
          
          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              currentTab === 'settings'
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            Settings
          </button>

          <button
            onClick={() => alert('Support tickets and documentation can be requested here.')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200"
          >
            <HelpCircle className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            Support
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-16 flex justify-around items-center px-4 z-40 shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all text-xs ${
                isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={onNewTaskClick}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg -translate-y-4 hover:bg-blue-700 transition-all duration-200 cursor-pointer"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentTab('settings')}
          className={`flex flex-col items-center gap-1 transition-all text-xs ${
            currentTab === 'settings' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </nav>
    </>
  );
}
