import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Settings, Users, ShieldAlert, Mail, Slack, Key, Smartphone, HelpCircle, Upload, Check, Trash2, Moon, Sun } from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function SettingsComponent({ user, setUser, darkMode, setDarkMode }: SettingsProps) {
  // Input fields local states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passSavedMsg, setPassSavedMsg] = useState(false);

  // Notifications toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [slackNotif, setSlackNotif] = useState(false);

  // Simulated Team list
  const [team, setTeam] = useState([
    { name: 'Marcus Kane', role: 'Lead Designer', type: 'ADMIN', initial: 'MK', bg: 'bg-emerald-500' },
    { name: 'Elena Lopez', role: 'Backend Dev', type: 'MEMBER', initial: 'EL', bg: 'bg-indigo-500' },
    { name: 'James Doe', role: 'Product Manager', type: 'MEMBER', initial: 'JD', bg: 'bg-pink-500' },
  ]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, name: name.trim(), email: email.trim() }));
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    setPassSavedMsg(true);
    setCurrentPassword('');
    setNewPassword('');
    setTimeout(() => setPassSavedMsg(false), 3500);
  };

  const toggleDarkMode = () => {
    const nextVal = !darkMode;
    setDarkMode(nextVal);
    if (nextVal) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleDemoteMember = (mName: string) => {
    setTeam(prev => prev.filter(t => t.name !== mName));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <header className="mb-4">
        <h1 className="text-3xl font-extrabold text-slate-850 dark:text-slate-100 tracking-tight">Account Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Manage your personal profile, notifications, security, and enterprise workspace preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Personal profile and preferences */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Profile Details box panel */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-850 dark:text-slate-150 uppercase tracking-widest">Personal Information</h2>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-slate-100 flex-shrink-0 animate-pulse-once">
                    <img src={user.avatar} alt="User session photo face icon" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="bg-blue-650 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-sm shadow-blue-500/10"
                    >
                      Update Profile
                    </button>
                    {showSavedMsg && (
                      <span className="text-[11px] font-bold text-green-600 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Changes saved successfully!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </section>

          {/* Theme Workspace parameters */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-650 text-blue-650 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-850 dark:text-slate-150 uppercase tracking-widest">Workspace Preferences</h2>
            </div>

            <div className="space-y-4">
              {/* Dynamic Theme Shift toggle widget */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-850/60 border border-slate-200/50 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-200/40 dark:bg-slate-800 rounded-xl">
                    {darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-850 dark:text-slate-100">Toggle Cosmic Dark Theme</h3>
                    <p className="text-[11px] text-slate-400 font-medium">Dynamically transitions stylesheets between light & dark layouts</p>
                  </div>
                </div>

                <button
                  onClick={toggleDarkMode}
                  className={`w-12 h-6 flex items-center rounded-full p-0.5 transition-colors duration-300 outline-none ${
                    darkMode ? 'bg-blue-60ab bg-blue-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                      darkMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Workspace Team list checker */}
              <div className="pt-4 space-y-3">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Team Members ({team.length + 1})</label>
                <div className="space-y-2">
                  
                  {/* Current Active User row */}
                  <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-850/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                        <img src={user.avatar} alt="Current session small layout photo avatar file representation" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-805 dark:text-slate-100">{user.name} (You)</p>
                        <p className="text-[10px] text-slate-400">{user.role}</p>
                      </div>
                    </div>
                    <span className="bg-slate-200 dark:bg-slate-800 text-[9px] font-bold uppercase text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">OWNER</span>
                  </div>

                  {/* Other members list */}
                  {team.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850/20 rounded-xl transition-all group">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${t.bg} flex items-center justify-center text-white text-[10px] font-black`}>
                          {t.initial}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{t.name}</p>
                          <p className="text-[10px] text-slate-450 dark:text-slate-400">{t.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 dark:bg-slate-800 text-[9px] font-bold uppercase text-slate-505 dark:text-slate-450 px-2 py-0.5 rounded">{t.type}</span>
                        <button
                          onClick={() => handleDemoteMember(t.name)}
                          className="p-1 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 rounded transition-all cursor-pointer"
                          title="Remove from project workspace"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Security checkers & notification options */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Notifications box preference list */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-850 dark:text-slate-150 uppercase tracking-widest">Notifications Setup</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-slate-550" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">Email Notifications</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={() => setEmailNotif(!emailNotif)}
                  className="w-4.5 h-4.5 text-blue-600 border-slate-300 dark:border-slate-700 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-slate-400 dark:text-slate-550" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">Push Mobile Alerts</span>
                </div>
                <input
                  type="checkbox"
                  checked={pushNotif}
                  onChange={() => setPushNotif(!pushNotif)}
                  className="w-4.5 h-4.5 text-blue-600 border-slate-300 dark:border-slate-700 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Slack className="w-4 h-4 text-slate-400 dark:text-slate-550" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">Slack Webhook Streams</span>
                </div>
                <input
                  type="checkbox"
                  checked={slackNotif}
                  onChange={() => setSlackNotif(!slackNotif)}
                  className="w-4.5 h-4.5 text-blue-600 border-slate-300 dark:border-slate-700 rounded focus:ring-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </section>

          {/* Security details reset block */}
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Key className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-850 dark:text-slate-150 uppercase tracking-widest">Security Credentials</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min. 12 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800/80 rounded-xl px-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold font-semibold transition-all shadow-sm cursor-pointer outline-none"
              >
                Change Workspace Password
              </button>

              {passSavedMsg && (
                <p className="text-[11px] font-semibold text-green-650 dark:text-green-400 pt-2 text-center select-none flex items-center justify-center gap-1">
                  <Check className="w-4 h-4" /> Password credentials updated!
                </p>
              )}
            </form>
          </section>

          {/* Danger zone panel */}
          <section className="bg-red-50/50 dark:bg-red-950/10 rounded-2xl border border-red-200/55 dark:border-red-900/40 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-650 text-red-650 text-red-650 dark:text-red-400" />
              <h3 className="text-xs font-bold text-red-650 text-red-600 dark:text-red-400 uppercase tracking-widest">Danger Zone Area</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              Permanently delete this workspace registry index, including all collaborative task boards, assignee records, activity logs, and system credentials.
            </p>
            <button
              type="button"
              onClick={() => {
                if (confirm('Terminate workspace registry indices permanently? This is absolutely irreversible.')) {
                  alert('Workspace terminated. Logging out session.');
                  window.location.reload();
                }
              }}
              className="text-xs font-bold text-red-600 hover:underline hover:text-red-700 block cursor-pointer transition-colors"
            >
              Delete account & terminate workspace indexes...
            </button>
          </section>

        </div>

      </div>
    </motion.div>
  );
}
