import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import CalendarComponent from './components/Calendar';
import ActivityStream from './components/Activity';
import TaskDetail from './components/TaskDetail';
import SettingsComponent from './components/Settings';
import Auth from './components/Auth';

import { initialTasks, initialActivities, initialUser } from './data/initialData';
import { Task, Activity, UserProfile } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [selectedTask, setSelectedTask] = useState<Task | null>(initialTasks[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Search filter query application
  const filteredTasks = searchQuery.trim()
    ? tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : tasks;

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-200 text-slate-800 dark:text-slate-100 ${darkMode ? 'dark' : ''}`}>
      
      {/* Dynamic Background dots wrapper */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_0.8px,transparent_0.8px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-40 dark:opacity-20 z-0" />

      {/* Primary Navigation Top Header bar */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        tasks={tasks}
        onTaskSearch={setSearchQuery}
        onNewTaskClick={() => {
          setCurrentTab('board');
          setIsCreateModalOpen(true);
        }}
        onLogout={() => setIsAuthenticated(false)}
        onSelectTask={setSelectedTask}
      />

      {/* Collapsed/drawer Sidebar navigation panel */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        onNewTaskClick={() => {
          setCurrentTab('board');
          setIsCreateModalOpen(true);
        }}
      />

      {/* Main View scroll container */}
      <main className="md:pl-64 pt-20 pb-24 md:pb-8 min-h-screen relative z-10">
        <div className="px-4 md:px-12 py-6 max-w-7xl mx-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              tasks={filteredTasks}
              activities={activities}
              onSelectTask={setSelectedTask}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'board' && (
            <KanbanBoard
              tasks={filteredTasks}
              setTasks={setTasks}
              activities={activities}
              setActivities={setActivities}
              onSelectTask={setSelectedTask}
              setCurrentTab={setCurrentTab}
              isCreateModalOpen={isCreateModalOpen}
              setIsCreateModalOpen={setIsCreateModalOpen}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarComponent
              tasks={filteredTasks}
              onSelectTask={setSelectedTask}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'activity' && (
            <ActivityStream
              activities={activities}
              setActivities={setActivities}
              currentUser={user}
            />
          )}

          {currentTab === 'detail' && (
            <TaskDetail
              task={selectedTask}
              tasks={tasks}
              setTasks={setTasks}
              activities={activities}
              setActivities={setActivities}
              setCurrentTab={setCurrentTab}
              currentUser={user}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsComponent
              user={user}
              setUser={setUser}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}
        </div>
      </main>
    </div>
  );
}
