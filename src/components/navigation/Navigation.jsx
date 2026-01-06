/**
 * Navigation Component
 * Simplified navigation with mega menu dropdowns
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Hand,
  User,
  Hash,
  Sparkles,
  Crown,
  Heart,
  Calendar,
  CalendarDays,
  ChevronDown,
  Menu,
  X,
  Star,
} from 'lucide-react';

// Navigation structure with categories
const NAV_STRUCTURE = {
  home: {
    id: 'home',
    label: 'Trang Chủ',
    icon: Compass,
    type: 'link',
  },
  services: {
    id: 'services',
    label: 'Dịch Vụ',
    icon: Sparkles,
    type: 'dropdown',
    items: [
      { id: 'astrology', label: 'Tử Vi', description: 'Luận giải vận mệnh theo Tử Vi Đẩu Số', icon: Sparkles },
      { id: 'numerology', label: 'Thần Số Học', description: 'Khám phá con số định mệnh', icon: Hash },
      { id: 'palmistry', label: 'Xem Tướng Tay', description: 'Giải mã vận mệnh qua đường chỉ tay', icon: Hand },
      { id: 'physiognomy', label: 'Xem Tướng Mặt', description: 'Nhân tướng học phương Đông', icon: User },
    ],
  },
  tools: {
    id: 'tools',
    label: 'Công Cụ',
    icon: CalendarDays,
    type: 'dropdown',
    items: [
      { id: 'lunar-calendar', label: 'Lịch Vạn Niên', description: 'Âm lịch, Can Chi, Giờ Hoàng Đạo', icon: CalendarDays },
      { id: 'auspicious-date', label: 'Xem Ngày Tốt', description: 'Chọn ngày tốt cho việc đại sự', icon: Calendar },
      { id: 'compatibility', label: 'Xem Hợp Tuổi', description: 'Kiểm tra độ hợp tuổi', icon: Heart },
    ],
  },
  premium: {
    id: 'premium-section',
    label: 'Premium',
    icon: Crown,
    type: 'dropdown',
    premium: true,
    items: [
      { id: 'premium', label: 'Bản Đồ Vận Mệnh', description: 'Phân tích vận mệnh toàn diện', icon: Star, premium: true },
      { id: 'premium-numerology', label: 'Bản Đồ Số Mệnh', description: 'Thần số học chuyên sâu', icon: Hash, premium: true },
      { id: 'report', label: 'Báo Cáo Tổng Hợp', description: 'Báo cáo phân tích chi tiết', icon: Sparkles },
    ],
  },
};

// Desktop dropdown menu
function DropdownMenu({ category, isOpen, onNavigate, onClose, alignRight = false }) {
  const items = category.items || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={`absolute top-full mt-2 min-w-[280px] z-[var(--z-dropdown)] ${alignRight ? 'right-0' : 'left-0'}`}
        >
          <div className="
            bg-[var(--color-lacquer)]
            border border-[rgba(196,163,90,0.3)]
            rounded-[var(--radius-xl)]
            shadow-[var(--shadow-lg)]
            overflow-hidden
            p-2
          ">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="
                    w-full flex items-start gap-3 p-3
                    rounded-[var(--radius-lg)]
                    text-left
                    transition-colors duration-[var(--duration-fast)]
                    hover:bg-[rgba(196,163,90,0.1)]
                    group
                  "
                  whileHover={{ x: 4 }}
                >
                  <span className={`
                    flex-shrink-0 mt-0.5
                    ${item.premium ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'}
                    group-hover:text-[var(--color-gold)]
                    transition-colors
                  `}>
                    <Icon size={20} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className={`
                      block font-medium text-sm
                      ${item.premium ? 'text-[var(--color-gold)]' : 'text-[var(--color-ivory)]'}
                    `}>
                      {item.label}
                      {item.premium && (
                        <Crown size={12} className="inline-block ml-1.5 text-[var(--color-gold)]" />
                      )}
                    </span>
                    <span className="block text-xs text-[var(--color-mist)] mt-0.5 line-clamp-1">
                      {item.description}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Desktop Navigation Item
function NavItem({ category, isActive, currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const Icon = category.icon;
  const isDropdown = category.type === 'dropdown';

  // Check if any child is active
  const hasActiveChild = isDropdown && category.items?.some(item => item.id === currentPage);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isDropdown) {
    return (
      <motion.button
        onClick={() => onNavigate(category.id)}
        className={`
          relative flex items-center gap-2 px-4 py-2
          font-medium text-sm
          rounded-[var(--radius-lg)]
          transition-colors duration-[var(--duration-fast)]
          ${isActive
            ? 'text-[var(--color-gold)]'
            : 'text-[var(--color-ivory)] hover:text-[var(--color-gold-light)]'
          }
        `}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={18} />
        <span>{category.label}</span>
        {isActive && (
          <motion.div
            layoutId="navIndicator"
            className="absolute inset-0 bg-[rgba(196,163,90,0.1)] border border-[rgba(196,163,90,0.3)] rounded-[var(--radius-lg)] -z-10"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
          />
        )}
      </motion.button>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`
          flex items-center gap-2 px-4 py-2
          font-medium text-sm
          rounded-[var(--radius-lg)]
          transition-colors duration-[var(--duration-fast)]
          ${category.premium
            ? 'bg-gradient-to-r from-[rgba(196,163,90,0.15)] to-[rgba(74,107,93,0.15)] border border-[rgba(196,163,90,0.3)]'
            : ''
          }
          ${hasActiveChild || isOpen
            ? 'text-[var(--color-gold)]'
            : category.premium
              ? 'text-[var(--color-gold)]'
              : 'text-[var(--color-ivory)] hover:text-[var(--color-gold-light)]'
          }
        `}
      >
        <Icon size={18} />
        <span>{category.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <DropdownMenu
        category={category}
        isOpen={isOpen}
        onNavigate={onNavigate}
        onClose={() => setIsOpen(false)}
        alignRight={category.premium}
      />
    </div>
  );
}

// Mobile Navigation
function MobileNav({ isOpen, onClose, currentPage, onNavigate }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[var(--z-overlay)]"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="
              fixed top-0 right-0 bottom-0 w-[300px]
              bg-[var(--color-lacquer)]
              border-l border-[rgba(196,163,90,0.2)]
              z-[var(--z-modal)]
              overflow-y-auto
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[rgba(196,163,90,0.2)]">
              <span className="font-display text-lg text-[var(--color-gold)]">Menu</span>
              <button
                onClick={onClose}
                className="p-2 text-[var(--color-mist)] hover:text-[var(--color-gold)] transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Items */}
            <div className="p-4 space-y-2">
              {Object.values(NAV_STRUCTURE).map((category) => {
                const Icon = category.icon;
                const isDropdown = category.type === 'dropdown';
                const isExpanded = expandedCategory === category.id;
                const isActive = currentPage === category.id;

                if (!isDropdown) {
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        onNavigate(category.id);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center gap-3 p-3
                        rounded-[var(--radius-lg)]
                        transition-colors
                        ${isActive
                          ? 'bg-[rgba(196,163,90,0.15)] text-[var(--color-gold)]'
                          : 'text-[var(--color-ivory)] hover:bg-[rgba(196,163,90,0.1)]'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                }

                return (
                  <div key={category.id}>
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className={`
                        w-full flex items-center justify-between p-3
                        rounded-[var(--radius-lg)]
                        transition-colors
                        ${category.premium
                          ? 'bg-gradient-to-r from-[rgba(196,163,90,0.1)] to-[rgba(74,107,93,0.1)] text-[var(--color-gold)]'
                          : 'text-[var(--color-ivory)] hover:bg-[rgba(196,163,90,0.1)]'
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={20} />
                        <span className="font-medium">{category.label}</span>
                      </span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-2 space-y-1">
                            {category.items?.map((item) => {
                              const ItemIcon = item.icon;
                              const isItemActive = currentPage === item.id;

                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    onNavigate(item.id);
                                    onClose();
                                  }}
                                  className={`
                                    w-full flex items-center gap-3 p-2.5
                                    rounded-[var(--radius-md)]
                                    text-sm
                                    transition-colors
                                    ${isItemActive
                                      ? 'bg-[rgba(196,163,90,0.15)] text-[var(--color-gold)]'
                                      : 'text-[var(--color-mist)] hover:text-[var(--color-ivory)] hover:bg-[rgba(196,163,90,0.05)]'
                                    }
                                  `}
                                >
                                  <ItemIcon size={16} />
                                  <span>{item.label}</span>
                                  {item.premium && (
                                    <Crown size={12} className="text-[var(--color-gold)]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Main Navigation Component
export default function Navigation({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[var(--z-sticky)]">
      {/* Glass background */}
      <div className="absolute inset-0 bg-[var(--color-ink)]/90 backdrop-blur-xl border-b border-[rgba(196,163,90,0.1)]" />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[var(--nav-height)]">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Logo Icon */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-muted)] rounded-full opacity-20 animate-pulse-glow" />
              <div className="absolute inset-1 bg-[var(--color-lacquer)] rounded-full flex items-center justify-center">
                <span className="text-[var(--color-gold)] text-lg">✦</span>
              </div>
            </div>

            {/* Logo Text */}
            <div className="hidden sm:block">
              <h1 className="font-display text-lg md:text-xl font-semibold text-gradient-gold tracking-wide">
                Cổ Học Tinh Hoa
              </h1>
              <p className="text-[10px] text-[var(--color-mist)] tracking-[0.2em] uppercase">
                Ancient Wisdom
              </p>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.values(NAV_STRUCTURE).map((category) => (
              <NavItem
                key={category.id}
                category={category}
                isActive={currentPage === category.id}
                currentPage={currentPage}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
    </header>
  );
}
