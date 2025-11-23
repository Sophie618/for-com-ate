import React, { useState, useEffect } from 'react';
import { X, HelpCircle } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (profile: any) => void;
  initialData?: any;
  mode?: 'wizard' | 'modal';
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSubmit, initialData, mode = 'wizard' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    competencyLevel: '中等',
    learningGoal: '',
    preferredStyle: '讲解+计划'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // --- Modal Mode (Popup) ---
  if (mode === 'modal') {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">定制你的学习助手</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                当前掌握水平
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['初学', '中等', '精通'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, competencyLevel: level })}
                    className={`py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${
                      formData.competencyLevel === level
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                近期学习目标
              </label>
              <input
                type="text"
                required
                placeholder="例如：巩固一次函数与应用题"
                value={formData.learningGoal}
                onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                偏好学习方式
              </label>
              <select
                value={formData.preferredStyle}
                onChange={(e) => setFormData({ ...formData, preferredStyle: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none bg-white"
              >
                <option value="讲解+计划">讲解 + 复盘计划</option>
                <option value="练习为主">大量练习题</option>
                <option value="概念解析">深度概念解析</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              保存设置
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Wizard Mode (Full Screen) ---
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">你的近期学习目标是什么？</h2>
              <p className="text-gray-500">告诉我们你想重点突破的领域，我们将为你定制计划</p>
            </div>
            
            <div className="w-full max-w-md">
              <input
                type="text"
                autoFocus
                placeholder="例如：巩固一次函数与应用题"
                value={formData.learningGoal}
                onChange={(e) => setFormData({ ...formData, learningGoal: e.target.value })}
                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-black focus:ring-0 outline-none transition-all shadow-sm placeholder:text-gray-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formData.learningGoal) {
                    handleNext();
                  }
                }}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">你当前的掌握水平如何？</h2>
              <p className="text-gray-500">这将帮助我们调整讲解的深度和难度</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
              {['初学', '中等', '精通'].map((level) => {
                const descriptions: Record<string, string> = {
                  '初学': '仅了解或听说过一些基础概念，或第一次接触该领域',
                  '中等': '掌握和了解基本概念，能解决简单问题，但复杂应用尚需练习',
                  '精通': '深刻理解底层逻辑，能灵活运用并解决复杂问题'
                };
                
                return (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, competencyLevel: level })}
                    className={`relative w-full p-6 rounded-2xl border-2 text-lg font-medium transition-all flex flex-col items-center justify-center gap-2 group hover:z-50 ${
                      formData.competencyLevel === level
                        ? 'border-black bg-black text-white shadow-lg scale-[1.02] z-10'
                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {formData.competencyLevel === level && <div className="w-2 h-2 bg-green-400 rounded-full" />}
                      <span>{level}</span>
                      <div className="group/tooltip relative">
                        <div className={`rounded-full border p-0.5 ${
                          formData.competencyLevel === level ? 'border-white/30 text-white/70' : 'border-gray-300 text-gray-400'
                        }`}>
                          <HelpCircle size={12} />
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-600/70 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none">
                          {descriptions[level]}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-600/70"></div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">你偏好的学习方式是？</h2>
              <p className="text-gray-500">选择最适合你的互动模式</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
              {[
                { value: '讲解+计划', label: '讲解 + 复盘计划', desc: '平衡理论与实践' },
                { value: '练习为主', label: '大量练习题', desc: '通过实战巩固知识' },
                { value: '概念解析', label: '深度概念解析', desc: '注重底层逻辑理解' }
              ].map((style) => (
                <button
                  key={style.value}
                  onClick={() => setFormData({ ...formData, preferredStyle: style.value })}
                  className={`p-6 rounded-2xl border-2 text-left transition-all h-full flex flex-col justify-between ${
                    formData.preferredStyle === style.value
                      ? 'border-black bg-black text-white shadow-lg scale-[1.02]'
                      : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-bold text-lg mb-2">{style.label}</div>
                    <div className={`text-sm ${formData.preferredStyle === style.value ? 'text-gray-400' : 'text-gray-500'}`}>
                      {style.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      {/* Header / Progress */}
      <div className="w-full max-w-3xl mx-auto pt-12 px-6 mb-12">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">AI</span>
              <span>Powered by SophieSync</span>
           </div>
           <div className="text-sm font-medium text-gray-500">
             {step} of {totalSteps}
           </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
        {renderStepContent()}
      </div>

      {/* Footer Navigation */}
      <div className="w-full max-w-3xl mx-auto px-6 pb-12 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`text-base font-medium underline-offset-4 hover:underline transition-colors ${
            step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900'
          }`}
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={step === 1 && !formData.learningGoal}
          className={`px-8 py-3 rounded-full font-semibold text-white transition-all transform active:scale-95 ${
            step === 1 && !formData.learningGoal
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-gray-900 hover:bg-black shadow-lg hover:shadow-xl'
          }`}
        >
          {step === totalSteps ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;