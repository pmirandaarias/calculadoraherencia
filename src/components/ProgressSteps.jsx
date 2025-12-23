import React from 'react';

export default function ProgressSteps({ currentStep, completedSteps, goToStep, showResult }) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6 p-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <button
            key={step}
            onClick={() => goToStep(step)}
            disabled={!completedSteps.includes(step - 1) && step !== 1}
            className={`w-8 h-8 rounded-full font-semibold text-xs transition-colors ${
              currentStep === step
                ? 'bg-blue-600 text-white'
                : completedSteps.includes(step)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-500'
            } ${
              (completedSteps.includes(step - 1) || step === 1) && !showResult
                ? 'cursor-pointer hover:opacity-80'
                : 'cursor-not-allowed opacity-60'
            }`}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
}