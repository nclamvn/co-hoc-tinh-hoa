import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, User, Calendar, MapPin, FileCheck } from 'lucide-react';
import StepPersonalInfo from './StepPersonalInfo';
import StepBirthDateTime from './StepBirthDateTime';
import StepBirthPlace from './StepBirthPlace';
import StepConfirmation from './StepConfirmation';

const STEPS = [
  { id: 1, title: 'Thông Tin Cá Nhân', icon: User },
  { id: 2, title: 'Ngày Giờ Sinh', icon: Calendar },
  { id: 3, title: 'Nơi Sinh', icon: MapPin },
  { id: 4, title: 'Xác Nhận', icon: FileCheck }
];

export default function WizardContainer({ onComplete, initialData = {} }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    nickname: '',
    gender: '',
    // Step 2: Birth Date & Time
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    birthTimeType: 'exact', // 'exact', 'period', 'unknown'
    birthHour: '',
    birthMinute: '',
    birthPeriod: '',
    // Step 3: Birth Place
    birthPlaceType: 'vietnam', // 'vietnam', 'foreign', 'skip'
    birthProvince: '',
    birthCountry: '',
    birthCity: '',
    // Step 4: Analysis Options
    includeAstrology: true,
    includeNumerology: true,
    includePalmistry: false,
    includePhysiognomy: false,
    ...initialData
  });

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepPersonalInfo data={formData} updateData={updateFormData} />;
      case 2:
        return <StepBirthDateTime data={formData} updateData={updateFormData} />;
      case 3:
        return <StepBirthPlace data={formData} updateData={updateFormData} />;
      case 4:
        return <StepConfirmation data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName.trim() !== '' && formData.gender !== '';
      case 2:
        return formData.birthDay && formData.birthMonth && formData.birthYear;
      case 3:
        return true; // Optional step
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-[var(--color-smoke)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-jade)]"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Step Indicators */}
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-[var(--color-jade)] border-[var(--color-jade)]'
                      : isActive
                      ? 'bg-[var(--color-gold)]/20 border-[var(--color-gold)]'
                      : 'bg-[var(--color-charcoal)] border-[var(--color-smoke)]'
                  }`}
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <Check size={18} className="text-white" />
                  ) : (
                    <Icon size={18} className={isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'} />
                  )}
                </motion.div>
                <span className={`mt-2 text-xs hidden md:block ${
                  isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-mist)]'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="card-mystical rounded-2xl p-6 md:p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${
            currentStep === 1
              ? 'opacity-50 cursor-not-allowed border-[var(--color-smoke)] text-[var(--color-mist)]'
              : 'border-[var(--color-gold)]/30 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10'
          }`}
          whileHover={currentStep !== 1 ? { scale: 1.02 } : {}}
          whileTap={currentStep !== 1 ? { scale: 0.98 } : {}}
        >
          <ArrowLeft size={18} />
          Quay lại
        </motion.button>

        <span className="text-[var(--color-mist)] text-sm">
          Bước {currentStep}/4
        </span>

        {currentStep < 4 ? (
          <motion.button
            onClick={nextStep}
            disabled={!isStepValid()}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              isStepValid()
                ? 'btn-mystical'
                : 'bg-[var(--color-smoke)] text-[var(--color-mist)] cursor-not-allowed'
            }`}
            whileHover={isStepValid() ? { scale: 1.02 } : {}}
            whileTap={isStepValid() ? { scale: 0.98 } : {}}
          >
            Tiếp tục
            <ArrowRight size={18} />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleComplete}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-jade)] text-[var(--color-obsidian)] font-display font-semibold"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(201, 162, 39, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={18} />
            Khám Phá Vận Mệnh
          </motion.button>
        )}
      </div>
    </div>
  );
}
