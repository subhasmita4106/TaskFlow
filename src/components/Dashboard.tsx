import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Play, CheckCircle, AlertTriangle, ArrowUpRight, MessageSquare, ChevronRight, Filter, CalendarCheck2 } from 'lucide-react';
import { Task, Activity, TaskPriority } from '../types';

interface DashboardProps {
  tasks: Task[];
  activities: Activity[];
  onSelectTask: (task: Task) => void;
  setCurrentTab: (tab: string) => void;
}

export default function Dashboard({ tasks, activities, onSelectTask, setCurrentTab }: DashboardProps) {
  // Live computed metrics based on tasks list
  const totalTasksCount = tasks.length;
  const inProgressCount = tasks.filter(t => t.status === 'InProgress').length;
  const completedCount = tasks.filter(t => t.status === 'Done').length;
  const overdueCount = tasks.filter(t => t.status === 'Todo' && t.priority === 'High').length;

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getPriorityLabelBg = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-600 dark:bg-red-950/25 dark:text-red-400';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-950/25 dark:text-amber-400';
      default:
        return 'bg-green-50 text-green-600 dark:bg-green-950/25 dark:text-green-400';
    }
  };

  const trendData = [
    { day: 'Mon', height: 'h-[60%]', count: '12' },
    { day: 'Tue', height: 'h-[45%]', count: '9' },
    { day: 'Wed', height: 'h-[85%]', count: '17' },
    { day: 'Thu', height: 'h-[70%]', count: '14' },
    { day: 'Fri', height: 'h-[95%]', count: '19' },
    { day: 'Sat', height: 'h-[30%]', count: '6' },
    { day: 'Sun', height: 'h-[20%]', count: '4' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Welcome back, you have <span className="font-bold text-blue-600 dark:text-blue-400">{overdueCount} critical tasks</span> pending your review today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCurrentTab('board')}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all shadow-sm"
          >
            <Filter className="w-4 h-4 text-slate-450" /> Filter
          </button>
          <button 
            onClick={() => alert('Viewing system metrics from last 7 days.')}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-all shadow-sm"
          >
            <CalendarCheck2 className="w-4 h-4 text-slate-450" /> Last 7 Days
          </button>
        </div>
      </div>

      {/* Dynamic Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <motion.div
          whileHover={{ translateY: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
              <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-2.5 py-1 rounded-full">+12% MoM</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Tasks</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{totalTasksCount + 120}</h3>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ translateY: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
              <Play className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-indigo-600/10" />
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-450 bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1 rounded-full">ACTIVE</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">In Progress</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{inProgressCount + 38}</h3>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ translateY: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-full">COMPLETED</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Completed</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{completedCount + 78}</h3>
          </div>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          whileHover={{ translateY: -3 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-650 dark:text-red-400 animate-pulse" />
            </div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2.5 py-1 rounded-full">CRITICAL</span>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Overdue</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{String(overdueCount).padStart(2, '0')}</h3>
          </div>
        </motion.div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Bento Chart + Deadlines Stream */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Completion Trend Bar Graphic */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[350px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-850 dark:text-slate-105">Task Completion Trend</h2>
                <p className="text-xs text-slate-400 font-medium">Daily completion velocity tracker</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-blue-650 dark:bg-blue-500 rounded-full" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed Projects</span>
              </div>
            </div>
            
            {/* Simple Dynamic SVG Mock Bar Chart */}
            <div className="flex-1 flex items-end justify-between gap-3 px-4 pb-2 pt-6">
              {trendData.map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2.5 w-full group">
                  <div className="relative w-full flex items-end justify-center bg-slate-50 dark:bg-slate-800/30 rounded-t-lg h-full overflow-hidden">
                    {/* Tooltip */}
                    <div className="absolute top-2 opacity-0 group-hover:opacity-100 bg-slate-800 dark:bg-slate-700 text-white text-[10px] px-1.5 py-0.5 rounded transition-opacity pointer-events-none font-bold z-20">
                      {bar.count} tasks
                    </div>
                    {/* Interactive Animated Fill */}
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: bar.height.replace('h-[', '').replace('%]', '%') }}
                      transition={{ delay: idx * 0.05, duration: 0.6 }}
                      className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-lg group-hover:brightness-110 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Upcoming Deadlines */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-850 dark:text-slate-105">Upcoming Deadlines</h2>
                <p className="text-xs text-slate-400 font-medium">Critical timing task checkpoints</p>
              </div>
              <button 
                onClick={() => setCurrentTab('board')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                View All Board
              </button>
            </div>
            <div className="space-y-4">
              {tasks.filter(t => t.status !== 'Done').slice(0, 3).map((task) => (
                <div 
                  key={task.id}
                  onClick={() => {
                    onSelectTask(task);
                    setCurrentTab('detail');
                  }}
                  className="flex items-center p-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all group cursor-pointer"
                >
                  <div className={`w-1.5 h-10 ${getPriorityColor(task.priority)} rounded-full mr-4`} />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{task.title}</h4>
                    <p className="text-xs font-medium text-slate-450 dark:text-slate-400 mt-0.5">{task.category} • Due {task.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 px-2.5 py-0.5 rounded-full ${getPriorityLabelBg(task.priority)}`}>
                      {task.priority}
                    </span>
                    {/* Avatars */}
                    <div className="flex -space-x-1.5 overflow-hidden">
                      {task.assignees.slice(0, 2).map((assignee, index) => (
                        <div key={index} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-100">
                          <img src={assignee.avatar} alt="Assignee image face" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-350 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Activity Widget */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-1">Recent Activity</h2>
              <p className="text-xs text-slate-400 font-medium mb-6">Real-time update streams in this workspace</p>
              
              <div className="relative space-y-6">
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800" />
                {activities.map((act) => (
                  <div key={act.id} className="flex gap-4 relative z-10 transition-transform duration-200 hover:translate-x-0.5">
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 border-2 border-white dark:border-slate-900 overflow-hidden flex-shrink-0 bg-slate-100">
                      <img src={act.user.avatar} alt="Profile photo avatar representation" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="text-slate-750 dark:text-slate-300 leading-normal">
                        <span className="font-bold text-slate-850 dark:text-slate-100">{act.user.name}</span>{' '}
                        {act.type === 'add' ? 'created new task' : act.type === 'check' ? 'completed' : act.type === 'comment' ? 'commented on' : 'moved'}{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{act.taskTitle}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">{act.timestamp}</p>
                      {act.detail && (
                        <div className="mt-2 p-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/50 rounded-lg text-slate-550 dark:text-slate-400 italic line-clamp-3 leading-relaxed">
                          "{act.detail}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => alert('Viewing system security audits list.')}
              className="w-full mt-8 py-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-300 dark:hover:border-slate-700 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              View All Activities
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
