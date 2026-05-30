import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, PlusCircle, CheckSquare, RefreshCw, Send, Users, Sparkles, Filter } from 'lucide-react';
import { Activity } from '../types';

interface ActivityProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  currentUser: { name: string; avatar: string };
}

export default function ActivityStream({ activities, setActivities, currentUser }: ActivityProps) {
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'add' | 'check' | 'comment' | 'edit'>('All');

  const filteredActivities = activeFilter === 'All'
    ? activities
    : activities.filter(act => act.type === activeFilter);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'comment',
      user: {
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      taskTitle: 'Workspace Dashboard',
      detail: broadcastMessage.trim(),
      timestamp: 'Just now'
    };

    setActivities(prev => [newAct, ...prev]);
    setBroadcastMessage('');
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
  };

  const getFeedIcon = (type: string) => {
    switch (type) {
      case 'add': return <PlusCircle className="w-4 h-4 text-green-500" />;
      case 'check': return <CheckSquare className="w-4 h-4 text-blue-500" />;
      case 'comment': return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      default: return <RefreshCw className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">Workspace Stream</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Real-time audit records of user interactions in the workspace environment.</p>
        </div>
      </header>

      {/* Main double column split layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: List updates feeds */}
        <section className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm space-y-6">
          {/* Header option tools */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-850">
            <h2 className="text-sm font-bold text-slate-850 dark:text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>Audit logs history</span>
            </h2>
            
            {/* Filter tags choices */}
            <div className="flex gap-1 bg-slate-50 dark:bg-slate-850 p-1 rounded-xl w-full sm:w-auto overflow-x-auto justify-start sm:justify-end">
              {(['All', 'add', 'check', 'comment', 'edit'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 text-[10px] font-extrabold tracking-wider uppercase rounded-lg transition-all border border-transparent ${
                    activeFilter === f
                      ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {f === 'add' ? 'Creation' : f === 'check' ? 'Checks' : f === 'comment' ? 'Comments' : f === 'edit' ? 'Edits' : 'All Logs'}
                </button>
              ))}
            </div>
          </div>

          {/* Activities list feeds list */}
          <div className="space-y-6 relative pl-3.5">
            {/* Direct vertical connecting line */}
            <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800" />

            {filteredActivities.map((act) => (
              <div 
                key={act.id} 
                className="flex gap-4 relative z-10 hover:translate-x-0.5 transition-transform duration-200"
              >
                {/* Visual bubble outline with absolute miniature identifier bubble */}
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-850 ring-2 ring-white dark:ring-slate-900">
                    <img src={act.user.avatar} alt="User representation face symbol" className="w-full h-full object-cover" />
                  </div>
                  {/* Miniature absolute status indicator bubble icon */}
                  <div className="absolute -bottom-1 -right-1 block bg-white dark:bg-slate-900 rounded-full p-1 border shadow">
                    {getFeedIcon(act.type)}
                  </div>
                </div>

                <div className="flex-1 text-xs space-y-1 bg-slate-50/40 dark:bg-slate-850/10 p-3.5 rounded-xl border border-slate-100 dark:border-slate-850/30">
                  <div className="flex items-center justify-between gap-2.5">
                    <p className="text-slate-750 dark:text-slate-300 leading-normal font-semibold">
                      <span className="font-extrabold text-slate-850 dark:text-slate-100">{act.user.name}</span>{' '}
                      {act.type === 'add' ? 'created new task' : act.type === 'check' ? 'completed checklist' : act.type === 'comment' ? 'commented on' : 'moved'}{' '}
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{act.taskTitle}</span>
                    </p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{act.timestamp}</span>
                  </div>
                  
                  {act.detail && (
                    <div className="mt-2 text-slate-550 dark:text-slate-400 italic bg-white dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800 p-3 rounded-lg leading-relaxed text-slate-650 font-medium">
                      "{act.detail}"
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredActivities.length === 0 && (
              <div className="text-center py-12 text-slate-400 font-semibold text-xs flex flex-col items-center">
                <Filter className="w-8 h-8 mb-2 text-slate-300" />
                <span>No activities match this category filter</span>
              </div>
            )}
          </div>
        </section>

        {/* Right Column sidebar: Quick broadcast post */}
        <section className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-850 dark:text-slate-200 uppercase tracking-widest mb-1">Collaborate Announce</h2>
            <p className="text-xs text-slate-400 font-semibold mb-6">Broadcast quick messages or status reports to all workspace team dashboards instantaneously.</p>

            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <textarea
                placeholder="Write your alert announcement..."
                value={broadcastMessage}
                rows={4}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 text-xs text-slate-800 dark:text-slate-100 focus:outline-none resize-none font-medium"
              />

              <button
                type="submit"
                className="w-full bg-blue-650 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer outline-none"
              >
                <span>Post Broadcast alert</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {isAlertVisible && (
                <div className="p-3 bg-green-50 text-green-600 border-2 border-green-200 rounded-xl text-center text-[10px] font-bold animate-pulse">
                  Broadcast added to live tracking streams!
                </div>
              )}
            </form>
          </div>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-850 mt-12 text-center text-slate-400 text-[10px] font-bold">
            <div className="flex justify-center gap-2 mb-2">
              <Users className="w-4.5 h-4.5 text-slate-350" />
              <span>Coordinated Sprint 4</span>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
