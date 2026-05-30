import React, { useState } from 'react';
import { Search, Bell, Settings, User, LogOut, ChevronDown, Check } from 'lucide-react';
import { UserProfile, Task } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  tasks: Task[];
  onTaskSearch: (searchQuery: string) => void;
  onNewTaskClick: () => void;
  onLogout: () => void;
  onSelectTask: (task: Task) => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  user,
  tasks,
  onTaskSearch,
  onNewTaskClick,
  onLogout,
  onSelectTask,
}: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [bellOpen, setBellOpen] = useState(false);

  const notifications = [
    { id: '1', text: 'Alex Rivera created Update API Docs', time: '24 mins ago', isNew: true },
    { id: '2', text: 'Sarah Jenkins commented on Login Flow Redesign', time: '4 hrs ago', isNew: true },
    { id: '3', text: 'Mike Chen moved Database Migration to Review', time: 'Yesterday', isNew: false }
  ];

  const filteredSearchSuggestions = searchVal.trim()
    ? tasks.filter(t => t.title.toLowerCase().includes(searchVal.toLowerCase()) || t.category.toLowerCase().includes(searchVal.toLowerCase()))
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    onTaskSearch(val);
  };

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      {/* Left items - Logo & Navigation Tab Indicators */}
      <div className="flex items-center gap-8 lg:gap-12">
        <span 
          onClick={() => setCurrentTab('dashboard')} 
          className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400 cursor-pointer flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">T</span>
          TaskFlow
        </span>
        
        {/* Desktop Quick Nav Tags */}
        <div className="hidden lg:flex gap-6">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentTab === 'dashboard'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentTab('board')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentTab === 'board'
                ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 rounded-b-none'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Task Board
          </button>
          <button
            onClick={() => setCurrentTab('settings')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentTab === 'settings'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Team Workspace
          </button>
        </div>
      </div>

      {/* Center Search bar with active popup */}
      <div className="relative flex-1 max-w-sm mx-4 hidden md:block">
        <div className={`relative flex items-center bg-slate-100 dark:bg-slate-800 border ${
          searchFocused ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700'
        } rounded-xl pl-10 pr-4 py-2 transition-all`}>
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks or tags..."
            value={searchVal}
            onChange={handleSearchChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            className="bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 text-sm w-full"
          />
        </div>

        {/* Floating results recommendation cards */}
        {searchFocused && filteredSearchSuggestions.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            <div className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400">Search Results</div>
            {filteredSearchSuggestions.slice(0, 5).map(task => (
              <button
                key={task.id}
                onMouseDown={() => {
                  onSelectTask(task);
                  setCurrentTab('detail');
                  setSearchVal('');
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex justify-between items-center transition-colors"
              >
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{task.title}</div>
                  <div className="text-xs text-slate-400">{task.category}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  task.priority === 'High' ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400' :
                  task.priority === 'Medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400' :
                  'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400'
                }`}>
                  {task.priority}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right controls - Quick actions, alerts, profile */}
      <div className="flex items-center gap-3">
        {/* Global Add Task Trigger Button */}
        <button
          onClick={onNewTaskClick}
          className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 active:scale-95 transition-all outline-none"
        >
          + Add Task
        </button>

        {/* Active notification indicator */}
        <div className="relative">
          <button
            onClick={() => setBellOpen(!bellOpen)}
            className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors ${
              bellOpen ? 'bg-slate-100 dark:bg-slate-800 text-blue-600' : ''
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </button>

          {bellOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-850 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">Inbox Notifications</span>
                <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold">2 New</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.map(item => (
                  <div key={item.id} className={`p-4 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-850 ${item.isNew ? 'bg-slate-50/50 dark:bg-slate-800/10' : ''}`}>
                    <div className="text-slate-700 dark:text-slate-300 mb-1">{item.text}</div>
                    <div className="text-[10px] text-slate-400">{item.time}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setBellOpen(false)}
                className="w-full text-center py-2.5 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* Global Settings Trigger */}
        <button
          onClick={() => setCurrentTab('settings')}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer hidden sm:block transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User profile dropdown switcher */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-750 bg-slate-100">
              <img src={user.avatar} alt="User profile avatar image" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in-50 slide-in-from-top-3">
                <div className="p-4">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                  <p className="text-xs text-slate-400 select-none truncate">{user.email}</p>
                </div>
                <div className="p-1.5 space-y-0.5">
                  <button
                    onClick={() => {
                      setCurrentTab('settings');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-450" />
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
