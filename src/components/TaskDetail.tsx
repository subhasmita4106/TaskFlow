import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, MoreVertical, CheckCircle2, Circle, Paperclip, MessageSquare, Plus, FileText, Download, CheckSquare2, Shield, Trash2, Calendar, Smile, Send, AtSign } from 'lucide-react';
import { Task, SubTask, Comment, Attachment, TaskPriority, TaskStatus, Activity } from '../types';

interface TaskDetailProps {
  task: Task | null;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  setCurrentTab: (tab: string) => void;
  currentUser: { name: string; avatar: string };
}

export default function TaskDetail({
  task,
  tasks,
  setTasks,
  activities,
  setActivities,
  setCurrentTab,
  currentUser,
}: TaskDetailProps) {
  // Graceful fallback if no task is currently active/selected
  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center max-w-xl mx-auto">
        <CheckSquare2 className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4 animate-bounce" />
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Task Selected</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-sm">
          Select or search any task from the Project Board or Overview Dashboard to view and edit granular details here.
        </p>
        <button
          onClick={() => setCurrentTab('board')}
          className="mt-6 bg-blue-655 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs"
        >
          Go to Board
        </button>
      </div>
    );
  }

  const [commentText, setCommentText] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Derive progress percentages
  const completedSubtasksCount = task.subtasks.filter(s => s.completed).length;
  const progressPercent = task.subtasks.length > 0 
    ? Math.round((completedSubtasksCount / task.subtasks.length) * 100) 
    : 0;

  // Handler to toggle sub-task completions
  const handleToggleSubtask = (subId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === task.id) {
        const updatedSubtasks = t.subtasks.map(s => s.id === subId ? { ...s, completed: !s.completed } : s);
        return { ...t, subtasks: updatedSubtasks };
      }
      return t;
    }));

    // Register activity log
    const sub = task.subtasks.find(s => s.id === subId);
    if (sub) {
      const activeState = !sub.completed ? 'completed' : 'reopened';
      const logAct: Activity = {
        id: `act-${Date.now()}`,
        type: 'check',
        user: { name: currentUser.name, avatar: currentUser.avatar },
        taskTitle: `checklist item "${sub.title}" (${activeState}) in ${task.title}`,
        timestamp: 'Just now'
      };
      setActivities(prev => [logAct, ...prev]);
    }
  };

  // Handler to create subtask item
  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSub: SubTask = {
      id: `sub-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false
    };

    setTasks(prev => prev.map(t => {
      if (t.id === task.id) {
        return { ...t, subtasks: [...t.subtasks, newSub] };
      }
      return t;
    }));

    setNewSubtaskTitle('');
    setAddingSubtask(false);

    // Activity log
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'add',
      user: { name: currentUser.name, avatar: currentUser.avatar },
      taskTitle: `added sub-task "${newSub.title}" to ${task.title}`,
      timestamp: 'Just now'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  // Handler to post a comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      user: {
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      text: commentText.trim(),
      timestamp: 'Just now'
    };

    setTasks(prev => prev.map(t => {
      if (t.id === task.id) {
        return { ...t, comments: [...t.comments, newComment] };
      }
      return t;
    }));

    // Log Activity
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'comment',
      user: { name: currentUser.name, avatar: currentUser.avatar },
      taskTitle: task.title,
      detail: commentText.trim(),
      timestamp: 'Just now'
    };
    setActivities(prev => [newAct, ...prev]);

    setCommentText('');
  };

  // Handler to update global priority
  const handleChangePriority = (prio: TaskPriority) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, priority: prio } : t));
  };

  // Handler to change task status
  const handleChangeStatus = (status: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status } : t));
    setStatusDropdownOpen(false);
  };

  // Handler to upload file simulator
  const handleSimulateUpload = () => {
    const fileMockNames = ['dashboard_figma_specs.pdf', 'api_gateway_cluster_docs.docx', 'screen_mockup_wireframes3.png'];
    const selectedFile = fileMockNames[Math.floor(Math.random() * fileMockNames.length)];
    const fileType = selectedFile.endsWith('.pdf') ? 'pdf' : selectedFile.endsWith('.png') ? 'image' : 'doc';

    const newAttach: Attachment = {
      id: `attach-${Date.now()}`,
      name: selectedFile,
      type: fileType as any,
      url: fileType === 'image' ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBOAvit27caEHMrCL_fjgCHuH4z3q0bAy2DJ8Cgphi0hbxWvN5Nc7aGz5QBg-g6r_8b0gNigWTJ-FHCX4r6R68ucq3fTctKp5WPBu4BCg0B9EVoEnZ6PYpyV5y11obR3_s6GRpImA-Kvcej3S_NYkoiZWc9OrsE0Vgl-krmXaxwHhRJ7h8FB3Z0kdfSMGwlHUs_JueMtmpF538lX5eJf4tJ-bDlUbpJOO3P-pUXkemXDRx758_tComEzMJjWwcBEHamWyc3cphhH4' : undefined
    };

    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, attachments: [...t.attachments, newAttach] } : t));

    // Register Activity logger
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'add',
      user: { name: currentUser.name, avatar: currentUser.avatar },
      taskTitle: `uploaded attachment "${selectedFile}" to ${task.title}`,
      timestamp: 'Just now'
    };
    setActivities(prev => [newAct, ...prev]);
  };

  const getPriorityLeftColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-400';
      default: return 'bg-green-500';
    }
  };

  const statusMap: Record<TaskStatus, { label: string; color: string }> = {
    Todo: { label: 'To Do', color: 'bg-slate-450' },
    InProgress: { label: 'In Progress', color: 'bg-blue-600' },
    InReview: { label: 'In Review', color: 'bg-indigo-500' },
    Done: { label: 'Done', color: 'bg-emerald-500' },
  };

  // Sync state modifications: find current updated task
  const syncedTask = tasks.find(t => t.id === task.id) || task;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Breadcrumbs navigation details */}
      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-semibold select-none">
        <span onClick={() => setCurrentTab('board')} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Projects</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-500 truncate max-w-[120px] sm:max-w-none">{syncedTask.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 truncate font-bold">{syncedTask.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Primary Content Block */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Title and description */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getPriorityLeftColor(syncedTask.priority)}`} />
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                  {syncedTask.title}
                </h1>
              </div>
              <button className="p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 rounded-full transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line font-medium">
              {syncedTask.description || 'No detailed tasks description provided. Open subtasks list checklist below to collaborate.'}
            </p>
          </section>

          {/* Sub-tasks lists Checklist section */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CheckSquare2 className="w-5 h-5 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-850 dark:text-slate-100 uppercase tracking-wider">Sub-tasks Checklist</h2>
              </div>
              <span className="text-[11px] font-bold bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                {completedSubtasksCount} / {syncedTask.subtasks.length} Completed
              </span>
            </div>

            {/* Checklist lists container */}
            <div className="space-y-1.5">
              {syncedTask.subtasks.map((st) => (
                <div
                  key={st.id}
                  onClick={() => handleToggleSubtask(st.id)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {st.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-350 flex-shrink-0" />
                    )}
                    <span className={`text-slate-700 dark:text-slate-300 text-xs font-semibold ${st.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                      {st.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTasks(prev => prev.map(t => t.id === syncedTask.id ? { ...t, subtasks: t.subtasks.filter(sub => sub.id !== st.id) } : t));
                    }}
                    className="p-1.5 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {syncedTask.subtasks.length === 0 && !addingSubtask && (
                <div className="text-center py-6 text-slate-400 text-xs font-medium border border-dashed border-slate-100 dark:border-slate-800/80 rounded-xl">
                  No subtasks added yet. Add one to see checklist progress.
                </div>
              )}

              {/* Toggle to add checklist row input inline */}
              {addingSubtask ? (
                <form onSubmit={handleAddSubtask} className="flex gap-2 p-1.5">
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Briefly state check item title..."
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddingSubtask(false)}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs px-3 rounded-xl hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setAddingSubtask(true)}
                  className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-655 text-blue-600 hover:underline cursor-pointer py-1.5 pl-3"
                >
                  <Plus className="w-4 h-4" /> Add Sub-task
                </button>
              )}
            </div>
          </section>

          {/* Attachments Section widget page */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Paperclip className="w-5 h-5 text-blue-605 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-850 dark:text-slate-100 uppercase tracking-wider">File Attachments</h2>
              </div>
              <button
                onClick={handleSimulateUpload}
                className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-650 dark:text-slate-350 pl-3 pr-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Upload Files
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {syncedTask.attachments.map((attach) => (
                <div
                  key={attach.id}
                  className="border border-slate-200 dark:border-slate-805 rounded-xl bg-slate-50/50 dark:bg-slate-850/60 overflow-hidden relative group font-semibold text-xs flex flex-col justify-between hover:border-slate-350 transition-colors"
                >
                  {attach.type === 'image' ? (
                    <div className="aspect-video w-full relative bg-slate-100">
                      <img src={attach.url} alt="Uploaded diagram screenshot" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold bg-slate-800/85 px-2 py-1 rounded">View screenshot</span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col items-center justify-center py-6 text-slate-400 dark:text-slate-500">
                      <FileText className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-center font-bold text-[11px] text-slate-700 dark:text-slate-300 w-full truncate">{attach.name}</span>
                    </div>
                  )}
                  <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-450">
                    <span className="truncate flex-1 pr-2">{attach.name}</span>
                    <button className="text-blue-650 hover:text-blue-800"><Download className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comment Stream discussion section */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-850 dark:text-slate-100 uppercase tracking-wider">Comments Thread</h2>
            </div>

            <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800/70">
              {syncedTask.comments.map((comm) => (
                <div key={comm.id} className="flex gap-4 pt-4 first:pt-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={comm.user.avatar} alt="Comment author avatar icon image" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="font-bold text-slate-850 dark:text-slate-150">{comm.user.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{comm.timestamp}</span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/10 p-3 rounded-2xl rounded-tl-none text-slate-700 dark:text-slate-300 leading-normal font-medium">
                      {comm.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Custom comment adding form with avatars */}
              <div className="flex gap-4 pt-6">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={currentUser.avatar} alt="User current session face symbol" className="w-full h-full object-cover" />
                </div>
                <form onSubmit={handlePostComment} className="flex-1 relative">
                  <textarea
                    placeholder="Add a comment or design suggestion regarding this flow..."
                    value={commentText}
                    rows={3}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none font-medium pb-12"
                  />
                  <div className="absolute right-3.5 bottom-3 flex items-center gap-1">
                    <button type="button" className="p-1 px-1.5 hover:bg-slate-100 rounded text-slate-400"><Smile className="w-4 h-4" /></button>
                    <button type="button" className="p-1 px-1.5 hover:bg-slate-100 rounded text-slate-400 mr-1"><AtSign className="w-4 h-4" /></button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-xl text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-sm outline-none"
                    >
                      <span>Send</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Status control sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status Select Widget */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest">Task Process Status</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-650 dark:text-slate-350 mb-1.5 select-none">
                  <span>Task checklist progress</span>
                  <span className="text-blue-600 dark:text-blue-400">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-650 bg-blue-600 h-full rounded-full transition-all duration-[800ms] ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Status Dropper option */}
              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-slate-500 block">Status Column</label>
                <button
                  type="button"
                  onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                  className="flex items-center justify-between w-full bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs font-bold transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${statusMap[syncedTask.status].color} animate-pulse`} />
                    <span>{statusMap[syncedTask.status].label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
                </button>

                {/* Dropdown popup panel */}
                {statusDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setStatusDropdownOpen(false)} />
                    <div className="absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-50 dark:divide-slate-850 animate-in fade-in-50">
                      {(Object.keys(statusMap) as TaskStatus[]).map((stKey) => (
                        <button
                          key={stKey}
                          onClick={() => handleChangeStatus(stKey)}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"
                        >
                          <span className={`w-2 h-2 rounded-full ${statusMap[stKey].color}`} />
                          {statusMap[stKey].label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Priority & Tags metadata section card */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            
            {/* Priority Button controllers */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest block">Priority Urgency</label>
              <div className="flex gap-2">
                {(['High', 'Medium', 'Low'] as TaskPriority[]).map((prio) => {
                  const isActive = syncedTask.priority === prio;
                  return (
                    <button
                      key={prio}
                      onClick={() => handleChangePriority(prio)}
                      className={`flex-1 text-center py-2 text-xs font-bold rounded-xl transition-all border outline-none ${
                        isActive
                          ? prio === 'High' ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/20 dark:text-red-400' :
                            prio === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400' :
                            'bg-green-50 text-green-600 border-green-205 border-green-200 dark:bg-green-950/20 dark:text-green-400'
                          : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      {prio}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar Date checkpoint */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest block">Due calendar date</label>
              <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800/80 rounded-xl px-4 py-3 text-xs text-slate-700 dark:text-slate-350">
                <Calendar className="w-4 h-4 text-slate-450" />
                <span className="font-bold">{syncedTask.dueDate}</span>
              </div>
            </div>

            {/* Tags categories section */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest block">Associated Meta Tags</label>
              <div className="flex flex-wrap gap-1.5">
                {syncedTask.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
                <button
                  onClick={() => {
                    const extraTag = prompt('Enter a new meta tag for this task:');
                    if (extraTag && extraTag.trim()) {
                      setTasks(prev => prev.map(t => t.id === syncedTask.id ? { ...t, tags: [...t.tags, extraTag.trim()] } : t));
                    }
                  }}
                  className="p-1 px-1.5 font-bold hover:text-blue-600 dark:text-slate-400 text-slate-450 text-xs flex items-center gap-0.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Tag
                </button>
              </div>
            </div>

          </section>

          {/* Assigned Workspace Team members list */}
          <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest block">Task Assignees</label>
            <div className="space-y-4">
              {syncedTask.assignees.map((as, idx) => (
                <div key={idx} className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-805 bg-slate-100 flex-shrink-0">
                      <img src={as.avatar} alt="Assignee face photo logo representation" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{as.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{as.role || 'Contributor'}</p>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const mate = prompt('Assign team member by email or name:');
                  if (mate && mate.trim()) {
                    const newAssignee = {
                      name: mate.trim(),
                      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDubWLxCvED-5Fa6D2UrpBmTtbxF5qG72LjXPi8Pohghdb8mpTodufKBEw2yi0xnd6oIfvnxOF65Y72LjXPi8Pohghdb8mpTodufKBEw2yi0xnd6oIfvnx'
                    };
                    setTasks(prev => prev.map(t => t.id === syncedTask.id ? { ...t, assignees: [...t.assignees, newAssignee] } : t));
                  }
                }}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 rounded-xl"
              >
                + Assign Collaborators
              </button>
            </div>
          </section>

          {/* Danger zone delete task triggers */}
          <div className="px-1 text-center space-y-4 pt-2">
            <p className="text-[10px] text-slate-400 font-medium">Task created in Website Redesign module • Oct 2026</p>
            <button
              onClick={() => {
                if (confirm('Are you absolutely sure you want to permanently delete this task from the active board datasets?')) {
                  setTasks(prev => prev.filter(t => t.id !== syncedTask.id));
                  setCurrentTab('board');
                }
              }}
              className="text-red-650 hover:text-red-700 dark:text-red-400 text-xs font-bold flex items-center justify-center gap-1.5 w-full hover:bg-red-50 dark:hover:bg-red-950/20 py-2.5 rounded-xl transition-all shadow-sm shadow-red-500/5 cursor-pointer outline-none border border-transparent hover:border-red-100"
            >
              <Trash2 className="w-4 h-4" /> Delete Task permanently
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
