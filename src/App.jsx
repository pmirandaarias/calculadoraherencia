import React, { useState } from 'react';
import Header from './components/Header';
import ProgressSteps from './components/ProgressSteps';
import StepContent from './components/StepContent';
import ResultDisplay from './components/ResultDisplay';

export default function CalculadoraHerencia() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [formData, setFormData] = useState({
    fallecido: '',
    tipoBien: '',
    montoAvaluo: '',
    numHijos: '',
    hijosFueraMatrimonio: '',
    numHijosFuera: ''
  });
  const [showResult, setShowResult] = useState(false);

  const formatCurrency = (value) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return new Intl.NumberFormat('es-CL').format(number);
  };

  const handleMontoChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData({ ...formData, montoAvaluo: formatted });
  };

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (completedSteps.includes(step - 1) || step === 1) {
      setCurrentStep(step);
    }
  };

  const calculateHerencia = () => {
    const monto = parseInt(formData.montoAvaluo.replace(/\./g, ''));
    const totalHijos = parseInt(formData.numHijos) +
      (formData.hijosFueraMatrimonio === 'si' ? parseInt(formData.numHijosFuera || 0) : 0);

    const montoConyugeSobreviviente = Math.round(monto / 2);
    const montoParaHijos = Math.round(monto / 2);
    const montoPorHijo = Math.round(montoParaHijos / totalHijos);
    const porcentajeConyuge = 50;
    const porcentajePorHijo = (50 / totalHijos);

    return {
      monto,
      totalHijos,
      montoConyugeSobreviviente,
      montoParaHijos,
      montoPorHijo,
      porcentajeConyuge,
      porcentajePorHijo
    };
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  const handleNewCalculation = () => {
    if (window.confirm('Se perderá el cálculo actual, ¿seguro desea iniciar un nuevo cálculo?')) {
      setCurrentStep(1);
      setCompletedSteps([]);
      setFormData({
        fallecido: '',
        tipoBien: '',
        montoAvaluo: '',
        numHijos: '',
        hijosFueraMatrimonio: '',
        numHijosFuera: ''
      });
      setShowResult(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.fallecido !== '';
      case 2: return formData.tipoBien !== '';
      case 3: return formData.montoAvaluo !== '';
      case 4: return formData.numHijos !== '' && parseInt(formData.numHijos) > 0;
      case 5: return formData.hijosFueraMatrimonio !== '';
      case 6: return formData.numHijosFuera !== '' && parseInt(formData.numHijosFuera) > 0;
      default: return false;
    }
  };

  const shouldShowStep = (step) => {
    if (step === 1) return true;
    if (step === 6) return formData.hijosFueraMatrimonio === 'si';
    return completedSteps.includes(step - 1);
  };

  const canCalculate = () => {
    if (formData.hijosFueraMatrimonio === 'si') {
      return completedSteps.includes(6) || (currentStep === 6 && isStepValid());
    }
    return completedSteps.includes(5) || (currentStep === 5 && formData.hijosFueraMatrimonio === 'no');
  };

  const result = showResult ? calculateHerencia() : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />

        <ProgressSteps
          currentStep={currentStep}
          completedSteps={completedSteps}
          goToStep={goToStep}
          showResult={showResult}
        />

        {!showResult ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <StepContent
              currentStep={currentStep}
              formData={formData}
              setFormData={setFormData}
              shouldShowStep={shouldShowStep}
              handleMontoChange={handleMontoChange}
            />

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Atrás
              </button>

              {!canCalculate() && (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    !isStepValid()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Siguiente
                </button>
              )}

              {canCalculate() && (
                <button
                  onClick={handleCalculate}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Calcular
                </button>
              )}
            </div>
          </div>
        ) : (
          <ResultDisplay
            formData={formData}
            result={result}
            handleNewCalculation={handleNewCalculation}
          />
        )}
      </div>
    </div>
  );
}