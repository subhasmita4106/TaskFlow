import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Plus, MapPin, AlertCircle, ArrowUpRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Task } from '../types';

interface CalendarProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  setCurrentTab: (tab: string) => void;
}

export default function CalendarComponent({ tasks, onSelectTask, setCurrentTab }: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const [currentMonth, setCurrentMonth] = useState('October 2026');

  // Days starting from Monday layout for Oct 2026 (Oct 1st is Thursday)
  // Calendar template offset cells
  const daysInMonth = 31;
  const startOffset = 3; // Thursday start offset
  
  const calendarCells = Array.from({ length: startOffset + daysInMonth }, (_, index) => {
    if (index < startOffset) {
      return null; // Empty placeholder pad cells
    }
    return index - startOffset + 1; // Actual days count index
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-400';
      default: return 'bg-green-500';
    }
  };

  // Check matching tasks due day
  // Oct 15, Oct 25, Oct 30 etc matching preset initialTasks dates
  const getTasksOnDay = (day: number | null): Task[] => {
    if (!day) return [];
    const formattedDayStr = `2026-10-${String(day).padStart(2, '0')}`;
    return tasks.filter(t => t.dueDate === formattedDayStr);
  };

  const hasTasksOnDay = (day: number | null): boolean => {
    return getTasksOnDay(day).length > 0;
  };

  const handleDayClick = (day: number | null) => {
    if (day) {
      setSelectedDay(day);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header bar section controls */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">Team Calendar</h1>
          <p className="text-sm text-slate-505 dark:text-slate-400 font-medium">Keep track of team deployments, release windows and audit sprints.</p>
        </div>
        
        <button
          onClick={() => {
            const evName = prompt('Enter task/event title to schedule:');
            if (evName) {
              alert(`Task "${evName}" successfully scheduled for active date Oct ${selectedDay || 15}, 2026!`);
            }
          }}
          className="bg-blue-650 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Schedule Event
        </button>
      </header>

      {/* Main double column grid layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Grid Sidebar: Real layout Calendar block */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
          
          <div className="flex justify-between items-center px-2 select-none">
            <h2 className="text-base font-bold text-slate-850 dark:text-slate-100 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <span>{currentMonth}</span>
            </h2>
            <div className="flex gap-1.5">
              <button 
                onClick={() => alert('Calendar bounds set to default Q4 2026 sprint.')}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                <ChevronLeft className="w-4 h-4 text-slate-500" />
              </button>
              <button 
                onClick={() => alert('Calendar bounds set to default Q4 2026 sprint.')}
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Days of week titles */}
          <div className="grid grid-cols-7 text-center text-[10px] uppercase font-bold tracking-wider text-slate-400 select-none pb-2 border-b border-slate-100 dark:border-slate-850">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <span key={day} className="py-1">{day}</span>
            ))}
          </div>

          {/* Interactive Date grid */}
          <div className="grid grid-cols-7 gap-2.5">
            {calendarCells.map((day, idx) => {
              const isSelected = selectedDay === day;
              const hasEvents = hasTasksOnDay(day);
              const dayTasks = getTasksOnDay(day);

              return (
                <div
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square sm:aspect-video md:aspect-square flex flex-col justify-between p-2.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden select-none ${
                    day 
                      ? isSelected 
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-605 text-blue-600'
                        : 'bg-slate-50/55 dark:bg-slate-850/20 border-slate-100 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-100/60'
                      : 'border-transparent text-transparent pointer-events-none'
                  }`}
                >
                  <span className={`text-xs font-bold leading-none ${isSelected ? 'text-blue-600 font-extrabold scale-105' : ''}`}>
                    {day}
                  </span>

                  {/* Red/Yellow/Green Event indicator dots */}
                  {hasEvents && (
                    <div className="flex gap-1 overflow-x-hidden pt-1">
                      {dayTasks.map((t, tIdx) => (
                        <div 
                          key={tIdx} 
                          className={`w-1.5 h-1.5 rounded-full ${getPriorityColor(t.priority)}`} 
                          title={`${t.title} (${t.priority})`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar panel - Current Day schedules details list */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-1">Checkpoints list</h2>
            <p className="text-xs text-slate-400 font-medium mb-6">Due for October {selectedDay || 15}, 2026</p>

            <div className="space-y-4">
              {getTasksOnDay(selectedDay).map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    onSelectTask(task);
                    setCurrentTab('detail');
                  }}
                  className="p-4 border border-slate-200 dark:border-slate-800 hover:border-slate-350 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Left indicator accent color */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityColor(task.priority)}`} />
                  
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-600">
                      {task.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">Due 10:00 AM</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 line-clamp-2 leading-relaxed">
                    {task.title}
                  </h3>

                  <div className="mt-4 flex justify-between items-center border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{task.priority} Priority</span>
                    </div>
                    {/* Tiny assignee avatar */}
                    <div className="w-5 h-5 rounded-full overflow-hidden border border-white dark:border-slate-900">
                      <img src={task.assignees[0]?.avatar} alt="Assignee face avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              ))}

              {getTasksOnDay(selectedDay).length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl text-xs text-slate-400 font-semibold flex flex-col items-center">
                  <AlertCircle className="w-8 h-8 mb-2 text-slate-300" />
                  <span>No events or deadlines due</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
