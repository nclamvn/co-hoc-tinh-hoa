/**
 * Tabs Component
 * Tabbed interface with animated indicator
 */

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  className = '',
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variants = {
    default: {
      list: 'bg-[rgba(10,10,10,0.5)] rounded-[var(--radius-lg)] p-1',
      tab: 'px-4 py-2 rounded-[var(--radius-md)]',
      activeTab: 'bg-[var(--color-lacquer)] text-[var(--color-gold)]',
      inactiveTab: 'text-[var(--color-mist)] hover:text-[var(--color-ivory)]',
    },
    underline: {
      list: 'border-b border-[rgba(196,163,90,0.2)]',
      tab: 'px-4 py-3 -mb-px',
      activeTab: 'text-[var(--color-gold)] border-b-2 border-[var(--color-gold)]',
      inactiveTab: 'text-[var(--color-mist)] hover:text-[var(--color-ivory)] border-b-2 border-transparent',
    },
    pills: {
      list: 'gap-2',
      tab: 'px-4 py-2 rounded-full border',
      activeTab: 'bg-[rgba(196,163,90,0.2)] text-[var(--color-gold)] border-[var(--color-gold)]',
      inactiveTab: 'text-[var(--color-mist)] border-transparent hover:border-[var(--color-gold-muted)] hover:text-[var(--color-ivory)]',
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div className={className}>
      {/* Tab List */}
      <div className={`flex ${currentVariant.list}`} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`
              relative
              flex items-center gap-2
              font-medium text-sm
              transition-all duration-[var(--duration-fast)]
              ${currentVariant.tab}
              ${activeTab === tab.id ? currentVariant.activeTab : currentVariant.inactiveTab}
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
            {tab.badge && (
              <span className="px-1.5 py-0.5 text-[10px] bg-[var(--color-vermillion)] text-white rounded-full">
                {tab.badge}
              </span>
            )}

            {/* Animated indicator for default variant */}
            {variant === 'default' && activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-[var(--color-lacquer)] rounded-[var(--radius-md)] -z-10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            hidden={activeTab !== tab.id}
            className={activeTab === tab.id ? 'animate-fade-in' : ''}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple TabList for custom implementations
export function TabList({ children, className = '' }) {
  return (
    <div
      className={`flex bg-[rgba(10,10,10,0.5)] rounded-[var(--radius-lg)] p-1 ${className}`}
      role="tablist"
    >
      {children}
    </div>
  );
}

export function Tab({ children, active, onClick, className = '' }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-[var(--radius-md)]
        font-medium text-sm
        transition-all duration-[var(--duration-fast)]
        ${active
          ? 'bg-[var(--color-lacquer)] text-[var(--color-gold)]'
          : 'text-[var(--color-mist)] hover:text-[var(--color-ivory)]'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export function TabPanel({ children, active, className = '' }) {
  if (!active) return null;
  return (
    <div role="tabpanel" className={`animate-fade-in ${className}`}>
      {children}
    </div>
  );
}
