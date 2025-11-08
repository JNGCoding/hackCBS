import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ChatbotPage } from './components/ChatbotPage';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { ProfilePage } from './components/ProfilePage';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'chat' | 'login' | 'dashboard' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
          {currentPage === 'chat' && <ChatbotPage />}
          {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
          {currentPage === 'dashboard' && <DashboardPage setCurrentPage={setCurrentPage} />}
          {currentPage === 'profile' && <ProfilePage />}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
