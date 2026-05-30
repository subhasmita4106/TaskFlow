import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, User } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup input states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API delay for ultimate premium high-fidelity feeling
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 850);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden transition-colors duration-200">
      
      {/* Background radial gradient dots matching image mockup design system */}
      <div className="absolute inset-0 bg-[radial-gradient(#dbe1ff_0.7px,transparent_0.7px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-60 dark:opacity-40" />

      <main className="w-full max-w-[440px] relative z-10 space-y-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center select-none text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20 mb-3 animate-pulse-once">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5 font-sans">
            TaskFlow
          </span>
          <p className="text-xs text-slate-400 font-medium mt-1">Enterprise Agile Workspace Suite</p>
        </div>

        {/* Auth form box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none">
          
          {/* Header Message */}
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold dark:text-slate-100 text-slate-800">
              {activeTab === 'login' ? 'Welcome back to TaskFlow' : 'Create guest account'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {activeTab === 'login' 
                ? 'Streamline your productivity with the enterprise task engine.'
                : 'Join the team workspace and align projects milestones.'
              }
            </p>
          </div>

          {/* Nav switcher tab */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-850 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-white dark:bg-slate-700 text-blue-650 text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'signup'
                  ? 'bg-white dark:bg-slate-700 text-blue-650 text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-705 text-slate-500 hover:text-slate-750'
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <div className="relative flex items-center bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5">
                    <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-none outline-none text-slate-800 dark:text-slate-250 text-xs w-full font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Password</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Please sign up a new account or sign in as a guest user.'); }} className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Forgot Password?</a>
                  </div>
                  <div className="relative flex items-center bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5">
                    <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-transparent border-none outline-none text-slate-800 dark:text-slate-250 text-xs w-full font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-750 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 active:scale-[0.98] outline-none cursor-pointer"
                >
                  <span>{loading ? 'Authenticating session...' : 'Sign In'}</span>
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@workspace.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Create Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Min. 8 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-650 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer outline-none"
                >
                  <span>{loading ? 'Registering workspace...' : 'Create Account'}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="relative my-6 select-none">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 select-none">Or continue with</span>
            </div>
          </div>

          {/* Social login grid widgets */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onLogin}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors active:scale-[0.98] cursor-pointer"
            >
              <img alt="Google" className="w-4.5 h-4.5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWRh09ENePDAvtR94tiE4qAthRTVJ6FeZnT5XqcopLygghxtF-ct6cDOV90oTm0jThdvMSouWrPV81oYugvOrtBAIXp3D8HfOapSc2Sji-eaefCbyFW2WYNmkP8dTCLSDZKTAyAvMnA0gQFzReO7f_66bnj2rgwc1QgmtxrxI_D1TiWVnoL0yPRb90p-UPurHCjaC8HOPOEMGgYoEXpeA6mbXSpwsh2CQxxRKV2ORIFUnD5FbrX3H6XiN1SSplm2S0KpfG6McAxYM" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-350">Google</span>
            </button>
            <button
              onClick={onLogin}
              className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.412-4.041-1.412-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-350">GitHub</span>
            </button>
          </div>

          <p className="mt-6 text-center text-[10px] text-slate-400 font-semibold leading-relaxed">
            By continuing, you agree to TaskFlow's <a className="text-blue-600 hover:underline" href="#">Terms of Service</a> and <a className="text-blue-600 hover:underline" href="#">Privacy Policy</a>.
          </p>
        </div>

        {/* Footer links */}
        <div className="flex justify-center gap-6 text-[11px] font-bold text-slate-405 dark:text-slate-500">
          <a className="hover:text-blue-600 cursor-pointer" href="#" onClick={(e) => e.preventDefault()}>Help Center</a>
          <a className="hover:text-blue-600 cursor-pointer" href="#" onClick={(e) => e.preventDefault()}>Security</a>
          <a className="hover:text-blue-600 cursor-pointer" href="#" onClick={(e) => e.preventDefault()}>Contact Sales</a>
        </div>
      </main>
    </div>
  );
}
