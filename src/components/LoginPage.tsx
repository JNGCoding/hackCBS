import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Activity, Heart } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleGoogleLogin = () => {
    onLogin();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Animated Background */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 rounded-full blur-3xl opacity-20"
            />

            {/* Floating Icons */}
            <div className="relative h-[500px] flex items-center justify-center">
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute top-0 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Heart className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
                className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Activity className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 15, 0]
                }}
                transition={{ 
                  duration: 4.5, 
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
                className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center shadow-xl"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </motion.div>

              {/* DNA Helix Animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="w-64 h-64"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.circle
                    cx="30"
                    cy="20"
                    r="4"
                    fill="url(#gradient1)"
                    animate={{ cy: [20, 80, 20] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="70"
                    cy="80"
                    r="4"
                    fill="url(#gradient1)"
                    animate={{ cy: [80, 20, 80] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.circle
                    cx="30"
                    cy="50"
                    r="4"
                    fill="url(#gradient2)"
                    animate={{ cy: [50, 110, 50] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="70"
                    cy="50"
                    r="4"
                    fill="url(#gradient2)"
                    animate={{ cy: [50, -10, 50] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>

            <div className="text-center mt-8">
              <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Welcome to HealthAI
              </h2>
              <p className="text-gray-600">
                Your trusted AI companion for personalized health guidance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-blue-100 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-green-400 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-gray-600">
                {isLogin ? 'Login to continue your health journey' : 'Start your health journey today'}
              </p>
            </div>

            {/* Google Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              className="w-full mb-6 px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-blue-300 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </motion.button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </button>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl text-xs text-gray-600 text-center">
              🔒 Your health data is encrypted and secure. We never share your information.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
