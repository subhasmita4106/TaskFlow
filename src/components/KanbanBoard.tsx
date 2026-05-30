import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MoreHorizontal, Plus, ArrowLeft, ArrowRight, Calendar, MessageSquare, Paperclip, CheckSquare, PlusCircle, CheckCircle } from 'lucide-react';
import { Task, TaskStatus, TaskPriority, Activity } from '../types';

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  onSelectTask: (task: Task) => void;
  setCurrentTab: (tab: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (isOpen: boolean) => void;
}

export default function KanbanBoard({
  tasks,
  setTasks,
  activities,
  setActivities,
  onSelectTask,
  setCurrentTab,
  isCreateModalOpen,
  setIsCreateModalOpen,
}: KanbanBoardProps) {
  const [boardView, setBoardView] = useState<'Kanban' | 'List' | 'Timeline'>('Kanban');
  
  // Create Modal input States
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Website Redesign');
  const [newPriority, setNewPriority] = useState<TaskPriority>('Medium');
  const [newStatus, setNewStatus] = useState<TaskStatus>('Todo');
  const [newTags, setNewTags] = useState('v1.0');
  const [newDueDate, setNewDueDate] = useState('2026-06-30');

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'Todo', label: 'To Do', color: 'bg-slate-400' },
    { id: 'InProgress', label: 'In Progress', color: 'bg-blue-600' },
    { id: 'InReview', label: 'In Review', color: 'bg-indigo-500' },
    { id: 'Done', label: 'Done', color: 'bg-emerald-500' },
  ];

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400';
      case 'Medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400';
      default: return 'text-green-600 bg-green-50 dark:bg-green-950/20 dark:text-green-400';
    }
  };

  const getLeftBarColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-400';
      default: return 'bg-green-500';
    }
  };

  const moveTaskStatus = (task: Task, direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    const statusOrder: TaskStatus[] = ['Todo', 'InProgress', 'InReview', 'Done'];
    const currentIndex = statusOrder.indexOf(task.status);
    let nextIndex = currentIndex + (direction === 'left' ? -1 : 1);

    if (nextIndex >= 0 && nextIndex < statusOrder.length) {
      const targetStatus = statusOrder[nextIndex];
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: targetStatus } : t));
      
      // Log as Activity
      const newAct: Activity = {
        id: `act-${Date.now()}`,
        type: 'edit',
        user: {
          name: 'Sarah Jenkins',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEN2pvJ1xTarICZE3ox_KYKA6mdLwHSOMBzExwXLGpokFxdM8yaqElkb1zOa7uCMsNMVC05tO6GKvzXJEwCuPYVa17q9UsL1ipNepbxfhwj7lv70nm2WAJwwTYMd7cQPOhe6OHwkkQaGtYjVwNks_eIFhPzpPdGPq8eYoMyEfOdA2Kaf6c3w_EdLLV3O8iz4cAD4cewTrCQAXvvl1TVNt7jejV_XcSiY2Q3IqzQbp1Arq48K9PZKGoJGgTABo-HNogXbSVf7KT2V8'
        },
        taskTitle: `${task.title} changed status to ${targetStatus}`,
        timestamp: 'Just now'
      };
      setActivities(prev => [newAct, ...prev]);
    }
  };

  const createNewTaskHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      status: newStatus,
      priority: newPriority,
      category: newCategory,
      dueDate: newDueDate,
      assignees: [
        {
          name: 'Sarah Jenkins',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEN2pvJ1xTarICZE3ox_KYKA6mdLwHSOMBzExwXLGpokFxdM8yaqElkb1zOa7uCMsNMVC05tO6GKvzXJEwCuPYVa17q9UsL1ipNepbxfhwj7lv70nm2WAJwwTYMd7cQPOhe6OHwkkQaGtYjVwNks_eIFhPzpPdGPq8eYoMyEfOdA2Kaf6c3w_EdLLV3O8iz4cAD4cewTrCQAXvvl1TVNt7jejV_XcSiY2Q3IqzQbp1Arq48K9PZKGoJGgTABo-HNogXbSVf7KT2V8'
        }
      ],
      subtasks: [],
      comments: [],
      attachments: [],
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setTasks(prev => [...prev, newTask]);

    const newAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'add',
      user: {
        name: 'Sarah Jenkins',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEN2pvJ1xTarICZE3ox_KYKA6mdLwHSOMBzExwXLGpokFxdM8yaqElkb1zOa7uCMsNMVC05tO6GKvzXJEwCuPYVa17q9UsL1ipNepbxfhwj7lv70nm2WAJwwTYMd7cQPOhe6OHwkkQaGtYjVwNks_eIFhPzpPdGPq8eYoMyEfOdA2Kaf6c3w_EdLLV3O8iz4cAD4cewTrCQAXvvl1TVNt7jejV_XcSiY2Q3IqzQbp1Arq48K9PZKGoJGgTABo-HNogXbSVf7KT2V8'
      },
      taskTitle: newTitle,
      timestamp: 'Just now'
    };
    setActivities(prev => [newAct, ...prev]);

    // Reset Inputs
    setNewTitle('');
    setNewDesc('');
    setIsCreateModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Top Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Project Board</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Marketing Campaign 2024 • Phase 2</p>
        </div>
        
        {/* Toggle choices */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-start sm:self-auto">
          {['Kanban', 'List', 'Timeline'].map((view) => (
            <button
              key={view}
              onClick={() => setBoardView(view as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                boardView === view
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </header>

      {/* Render selected view */}
      <AnimatePresence mode="wait">
        {boardView === 'Kanban' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thin scrollbar-thumb-slate-250 items-start min-h-[500px]"
          >
            {columns.map((col) => {
              const columnTasks = tasks.filter(t => t.status === col.id);
              return (
                <div key={col.id} className="flex-1 min-w-[280px] max-w-[320px] bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800/10 flex flex-col h-full max-h-[calc(100vh-270px)]">
                  {/* Status header */}
                  <div className="flex justify-between items-center mb-4 px-1 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                      <h2 className="font-bold text-sm text-slate-800 dark:text-slate-200">{col.label}</h2>
                      <span className="text-[10px] bg-slate-200/60 dark:bg-slate-800 font-bold text-slate-500 dark:text-slate-450 px-2 py-0.5 rounded-full">
                        {columnTasks.length}
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 max-h-[25px]">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Task Card lists */}
                  <div className="space-y-4 overflow-y-auto overflow-x-hidden flex-1 select-none pr-0.5">
                    {columnTasks.map((task) => {
                      const completedCount = task.subtasks.filter(st => st.completed).length;
                      const hasSubtasks = task.subtasks.length > 0;
                      return (
                        <div
                          key={task.id}
                          onClick={() => {
                            onSelectTask(task);
                            setCurrentTab('detail');
                          }}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer relative overflow-hidden group"
                        >
                          {/* Priority Tag line */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${getLeftBarColor(task.priority)}`} />
                          
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-blue-50/70 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 truncate">
                              {task.category}
                            </span>
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-850 dark:text-slate-100 text-sm mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                            {task.title}
                          </h3>

                          {task.description && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2 mb-4 leading-normal">
                              {task.description}
                            </p>
                          )}

                          {/* Progress bar inside card if progress list is present */}
                          {hasSubtasks && (
                            <div className="mb-4">
                              <div className="flex justify-between text-[10px] text-slate-450 dark:text-slate-500 font-bold mb-1.5">
                                <span>Checklist</span>
                                <span>{completedCount} / {task.subtasks.length}</span>
                              </div>
                              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-blue-600 h-full rounded-full transition-all" 
                                  style={{ width: `${(completedCount / task.subtasks.length) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between items-center sm:gap-2">
                            {/* Assignee circles */}
                            <div className="flex -space-x-1.5">
                              {task.assignees.map((assignee, idx) => (
                                <div key={idx} className="w-6 h-6 rounded-full border border-white dark:border-slate-900 overflow-hidden bg-slate-100" title={assignee.name}>
                                  <img src={assignee.avatar} alt="Profile assignee faces" className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>

                            {/* Attach indicators / Comment icon */}
                            <div className="flex items-center gap-2.5 text-slate-350 dark:text-emerald-400 text-[10px] font-bold">
                              {task.comments.length > 0 && (
                                <div className="flex items-center gap-0.5">
                                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{task.comments.length}</span>
                                </div>
                              )}
                              {task.attachments.length > 0 && (
                                <Paperclip className="w-3.5 h-3.5 text-slate-450" />
                              )}
                            </div>

                            {/* Move Quick triggers */}
                            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => moveTaskStatus(task, 'left', e)}
                                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition-colors"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => moveTaskStatus(task, 'right', e)}
                                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition-colors"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {columnTasks.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-800/80 rounded-xl text-xs text-slate-400 font-medium">
                        Column empty
                      </div>
                    )}
                  </div>

                  {/* Add action shortcut */}
                  <button
                    onClick={() => {
                      setNewStatus(col.id);
                      setIsCreateModalOpen(true);
                    }}
                    className="mt-4 flex items-center justify-center gap-1.5 w-full py-2.5 bg-white dark:bg-slate-850 hover:bg-slate-50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-300 dark:hover:border-slate-700 transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Task
                  </button>
                </div>
              );
            })}

            {/* Simulated Add new column button */}
            <button
              onClick={() => {
                setNewStatus('Todo');
                setIsCreateModalOpen(true);
              }}
              className="min-w-[280px] h-[150px] border-2 border-dashed border-slate-300 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/10 rounded-2xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-600 hover:border-blue-400 transition-all cursor-pointer group"
            >
              <PlusCircle className="w-6 h-6 mb-1.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-xs font-bold">Add Column</span>
            </button>
          </motion.div>
        )}

        {boardView === 'List' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-150 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[10px] font-bold uppercase text-slate-400">
                    <th className="p-4 pl-6">Title</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4 pr-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                  {tasks.map((task) => (
                    <tr 
                      key={task.id}
                      onClick={() => {
                        onSelectTask(task);
                        setCurrentTab('detail');
                      }}
                      className="group hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors cursor-pointer text-xs"
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <span className={`w-1.5 h-6 rounded-full ${getLeftBarColor(task.priority)} flex-shrink-0`} />
                          <h4 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors">{task.title}</h4>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400 font-semibold">{task.category}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-medium">{task.dueDate}</td>
                      <td className="p-4 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            onSelectTask(task);
                            setCurrentTab('detail');
                          }}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {boardView === 'Timeline' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => {
                  onSelectTask(task);
                  setCurrentTab('detail');
                }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-slate-350"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl text-white ${task.status === 'Done' ? 'bg-emerald-500' : 'bg-blue-655 bg-blue-600'}`}>
                    {task.status === 'Done' ? <CheckCircle className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">{task.title}</h3>
                    <p className="text-xs text-slate-400 font-medium">{task.category} • Task priority {task.priority}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-xs text-slate-405 font-bold">Planned Release: Oct 2026</div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-500`}>
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Creation Dialog Modal Overlay */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative overflow-hidden"
            >
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Add Project Task</h2>
              <p className="text-xs text-slate-420 dark:text-slate-400 mb-6">Provision task inputs directly to active data column lists.</p>

              <form onSubmit={createNewTaskHandler} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Task Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter short descriptive title..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Description</label>
                  <textarea
                    placeholder="Provide a quick breakdown..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Frontend">Frontend</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Initial Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="Todo">To Do</option>
                      <option value="InProgress">In Progress</option>
                      <option value="InReview">In Review</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Due Date</label>
                    <input
                      type="date"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    placeholder="Frontend, UX, Security"
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-xl outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer outline-none"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
