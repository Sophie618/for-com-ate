import React from 'react';
import { X, CheckCircle2, Clock, BrainCircuit, Globe, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  status: 'pending' | 'running' | 'completed';
  duration?: string;
  details?: string;
}

interface ThinkingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  steps: Step[];
}

const ThinkingSidebar: React.FC<ThinkingSidebarProps> = ({ isOpen, onClose, steps }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 md:hidden"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="text-lg font-medium text-gray-900">活动 · 13s</div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-2">
              <div className="text-gray-500 mb-6 font-medium">思考</div>
              
              <div className="relative pl-4 border-l-2 border-gray-100 space-y-8 pb-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Dot Indicator */}
                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 bg-white ${
                      step.status === 'completed' ? 'border-gray-400 bg-gray-400' : 
                      step.status === 'running' ? 'border-black bg-black' : 'border-gray-200'
                    }`} />

                    <div className="flex flex-col gap-1">
                      <div className="flex items-start justify-between">
                        <h4 className="text-gray-900 font-medium leading-tight">
                          {step.title}
                        </h4>
                      </div>
                      
                      {step.details && (
                        <div className="mt-2">
                          {/* Mocking the "Searching..." or "Summarizing..." look with pills */}
                          {step.title.includes("识别") || step.title.includes("分析") ? (
                            <div className="flex flex-wrap gap-2">
                               <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-600">
                                  <Globe size={12} />
                                  <span>arxiv.org</span>
                               </div>
                               <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-600">
                                  <Globe size={12} />
                                  <span>scholar.google.com</span>
                               </div>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 leading-relaxed">
                              {step.details}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-gray-900 font-medium mt-2">
                <CheckCircle2 size={18} className="text-gray-900" />
                <span>已思考 13s 完成</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThinkingSidebar;
