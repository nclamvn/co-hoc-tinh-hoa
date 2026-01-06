/**
 * Modal Component
 * Dialog overlay with customizable content
 */

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  description,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
}) {
  // Handle ESC key
  const handleKeyDown = useCallback((e) => {
    if (closeOnEsc && e.key === 'Escape') {
      onClose();
    }
  }, [closeOnEsc, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className={`
              relative
              w-full ${sizes[size] || sizes.md}
              my-8 mx-4
              bg-[var(--color-lacquer)]
              border border-[rgba(196,163,90,0.3)]
              rounded-[var(--radius-2xl)]
              shadow-[var(--shadow-modal)]
              ${className}
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  {title && (
                    <h2 className="font-display text-xl font-semibold text-[var(--color-gold)]">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-[var(--color-mist)]">
                      {description}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="
                      p-2 -mr-2 -mt-2
                      rounded-[var(--radius-lg)]
                      text-[var(--color-mist)]
                      hover:text-[var(--color-gold)]
                      hover:bg-[rgba(196,163,90,0.1)]
                      transition-colors duration-[var(--duration-fast)]
                    "
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={`${title ? 'px-6 pb-6' : 'p-6'}`}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Modal Footer helper component
export const ModalFooter = ({ children, className = '' }) => (
  <div
    className={`
      flex items-center justify-end gap-3
      pt-4 mt-4
      border-t border-[rgba(196,163,90,0.2)]
      ${className}
    `}
  >
    {children}
  </div>
);
