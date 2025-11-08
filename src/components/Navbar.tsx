import { useState } from 'react';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: any) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navbar({ currentPage, setCurrentPage, isLoggedIn, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
              <span className="text-white">❤️</span>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              HealthAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('chat')}
              className={`transition-colors ${
                currentPage === 'chat' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Chat
            </button>
            {isLoggedIn && (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`transition-colors ${
                  currentPage === 'dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Dashboard
              </button>
            )}
          </div>

          {/* Profile / Login */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-blue-100 overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setCurrentPage('profile');
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setCurrentPage('dashboard');
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                      >
                        Dashboard
                      </button>
                      <hr className="border-blue-100" />
                      <button
                        onClick={() => {
                          onLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full hover:shadow-lg transition-all"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-2"
            >
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('chat');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Chat
              </button>
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setCurrentPage('dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('profile');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setCurrentPage('login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
