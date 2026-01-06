import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Hand,
  User,
  Hash,
  ScrollText,
  Menu,
  X,
  Sparkles,
  Crown,
  Heart,
  Calendar,
  CalendarDays
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Trang Chủ', icon: Compass },
  { id: 'astrology', label: 'Tử Vi', icon: Sparkles },
  { id: 'numerology', label: 'Thần Số Học', icon: Hash },
  { id: 'palmistry', label: 'Tướng Tay', icon: Hand },
  { id: 'physiognomy', label: 'Tướng Mặt', icon: User },
  { id: 'report', label: 'Báo Cáo', icon: ScrollText },
  { id: 'lunar-calendar', label: 'Lịch Vạn Niên', icon: CalendarDays, premium: true },
  { id: 'compatibility', label: 'Xem Hợp Tuổi', icon: Heart, premium: true },
  { id: 'auspicious-date', label: 'Xem Ngày Tốt', icon: Calendar, premium: true },
  { id: 'premium-numerology', label: 'Bản Đồ Số Mệnh', icon: Hash, premium: true },
  { id: 'premium', label: 'Bản Đồ Vận Mệnh', icon: Crown, premium: true },
];

export default function Header({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[var(--color-obsidian)]/80 backdrop-blur-lg border-b border-[var(--color-gold)]/10" />
      
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Mystical Logo Icon */}
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dim)] rounded-full opacity-20 animate-pulse-glow" />
              <div className="absolute inset-1 bg-[var(--color-charcoal)] rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-[var(--color-gold)]" fill="currentColor">
                  <path d="M12 2L13.09 8.26L19 7L14.74 11.09L21 12L14.74 12.91L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.91L3 12L9.26 11.09L5 7L10.91 8.26L12 2Z" />
                </svg>
              </div>
            </div>
            
            <div className="hidden sm:block">
              <h1 className="font-display text-xl md:text-2xl font-semibold text-gradient-gold tracking-wide">
                Cổ Học Tinh Hoa
              </h1>
              <p className="text-[10px] md:text-xs text-[var(--color-mist)] tracking-widest uppercase">
                Ancient Wisdom
              </p>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isPremium = item.premium;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    relative px-4 py-2 rounded-lg font-body text-sm tracking-wide
                    transition-colors duration-300
                    ${isPremium
                      ? 'bg-gradient-to-r from-[var(--color-gold)]/20 to-[var(--color-jade)]/20 border border-[var(--color-gold)]/30'
                      : ''
                    }
                    ${isActive
                      ? 'text-[var(--color-gold)]'
                      : isPremium
                      ? 'text-[var(--color-gold)] hover:text-[var(--color-gold-light)]'
                      : 'text-[var(--color-pearl)] hover:text-[var(--color-gold-light)]'
                    }
                  `}
                  whileHover={{ y: -2, scale: isPremium ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && !isPremium && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <Icon size={16} />
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-[var(--color-pearl)] hover:text-[var(--color-gold)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden relative bg-[var(--color-charcoal)]/95 backdrop-blur-lg border-b border-[var(--color-gold)]/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                const isPremium = item.premium;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors duration-300
                      ${isPremium
                        ? 'bg-gradient-to-r from-[var(--color-gold)]/20 to-[var(--color-jade)]/20 border border-[var(--color-gold)]/30 text-[var(--color-gold)]'
                        : isActive
                        ? 'bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/30'
                        : 'text-[var(--color-pearl)] hover:bg-[var(--color-smoke)]'
                      }
                    `}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon size={20} />
                    <span className="font-body">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
