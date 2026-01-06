import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './components/navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NumerologyPage from './pages/NumerologyPage';
import AstrologyPage from './pages/AstrologyPage';
import PalmistryPage from './pages/PalmistryPage';
import PhysiognomyPage from './pages/PhysiognomyPage';
import ReportPage from './pages/ReportPage';
import PremiumReportPage from './pages/PremiumReportPage';
import PremiumNumerologyPage from './pages/PremiumNumerologyPage';
import CompatibilityPage from './pages/CompatibilityPage';
import AuspiciousDatePage from './pages/AuspiciousDatePage';
import LunarCalendarPage from './pages/LunarCalendarPage';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    const pages = {
      home: <HomePage onNavigate={setCurrentPage} />,
      numerology: <NumerologyPage />,
      astrology: <AstrologyPage />,
      palmistry: <PalmistryPage />,
      physiognomy: <PhysiognomyPage />,
      report: <ReportPage />,
      premium: <PremiumReportPage />,
      'premium-numerology': <PremiumNumerologyPage />,
      compatibility: <CompatibilityPage />,
      'auspicious-date': <AuspiciousDatePage />,
      'lunar-calendar': <LunarCalendarPage />
    };
    return pages[currentPage] || pages.home;
  };

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)] flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1"
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
