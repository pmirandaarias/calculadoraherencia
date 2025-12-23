import React, { useState } from 'react';

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
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Calculadora Herencia Chile
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-2">
            Calculadora de Herencias según normativa Chilena. Completa el paso a paso para obtener los montos y porcentajes.
          </p>
          <p className="text-sm text-gray-500">Última actualización: Diciembre 22, 2025. 9:41pm</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-md mb-6 p-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => goToStep(step)}
                disabled={!completedSteps.includes(step - 1) && step !== 1}
                className={`w-10 h-10 rounded-full font-semibold text-sm transition-colors ${
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

        {/* Main Content */}
        {!showResult ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Step 1 */}
            {shouldShowStep(1) && currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Paso 1: ¿Quién falleció?</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="fallecido"
                      checked={formData.fallecido === 'padre'}
                      onChange={() => setFormData({ ...formData, fallecido: 'padre' })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg">Padre</span>
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="fallecido"
                      checked={formData.fallecido === 'madre'}
                      onChange={() => setFormData({ ...formData, fallecido: 'madre' })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg">Madre</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {shouldShowStep(2) && currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Paso 2: Tipo de bien</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="tipoBien"
                      checked={formData.tipoBien === 'automovil'}
                      onChange={() => setFormData({ ...formData, tipoBien: 'automovil' })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg">Automóvil</span>
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="tipoBien"
                      checked={formData.tipoBien === 'casa'}
                      onChange={() => setFormData({ ...formData, tipoBien: 'casa' })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg">Casa/Departamento</span>
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="tipoBien"
                      checked={formData.tipoBien === 'tierras'}
                      onChange={() => setFormData({ ...formData, tipoBien: 'tierras' })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg">Tierras</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {shouldShowStep(3) && currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Paso 3: Monto avalúo comercial</h2>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Ingrese el monto en pesos chilenos
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 50.000.000"
                    value={formData.montoAvaluo}
                    onChange={handleMontoChange}
                    className="w-full p-4 text-lg border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  {formData.montoAvaluo && (
                    <p className="mt-2 text-gray-600">$ {formData.montoAvaluo} CLP</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4 */}
            {shouldShowStep(4) && currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Paso 4: ¿Cuántos hijo(as) tiene el difunto?</h2>
                <input
                  type="number"
                  min="1"
                  max="99"
                  placeholder="Número de hijos"
                  value={formData.numHijos}
                  onChange={(e) => setFormData({ ...formData, numHijos: e.target.value })}
                  className="w-full p-4 text-lg border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            {/* Step 5 */}
            {shouldShowStep(5) && currentStep === 5 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Paso 5: ¿Hay hijos fuera del matrimonio?</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="hijosFuera"
                      checked={formData.hijosFueraMatrimonio === 'si'}
                      onChange={() => setFormData({ ...formData, hijosFueraMatrimonio: 'si', numHijosFuera: '' })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg">Sí</span>
                  </label>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="hijosFuera"
                      checked={formData.hijosFueraMatrimonio === 'no'}
                      onChange={() => setFormData({ ...formData, hijosFueraMatrimonio: 'no', numHijosFuera: '' })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg">No</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 6 */}
            {shouldShowStep(6) && currentStep === 6 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Paso 5.1: ¿Cuántos hijo(as) fuera del matrimonio?</h2>
                <input
                  type="number"
                  min="1"
                  max="99"
                  placeholder="Número de hijos fuera del matrimonio"
                  value={formData.numHijosFuera}
                  onChange={(e) => setFormData({ ...formData, numHijosFuera: e.target.value })}
                  className="w-full p-4 text-lg border-2 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            {/* Navigation Buttons */}
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Resultado del Cálculo</h2>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="font-semibold text-gray-800 mb-2">Fórmula empleada:</p>
              <p className="text-gray-700 text-sm">
                Monto total / 2 = Monto para cónyuge sobreviviente<br />
                Monto total / 2 / Total de hijos = Monto por hijo
              </p>
            </div>

            <div className="mb-6 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Detalle:</h3>
              <p className="text-gray-700"><span className="font-semibold">Fallecido:</span> {formData.fallecido === 'padre' ? 'Padre' : 'Madre'}</p>
              <p className="text-gray-700"><span className="font-semibold">Tipo de bien:</span> {formData.tipoBien === 'automovil' ? 'Automóvil' : formData.tipoBien === 'casa' ? 'Casa/Departamento' : 'Tierras'}</p>
              <p className="text-gray-700"><span className="font-semibold">Avalúo comercial:</span> $ {formData.montoAvaluo} CLP</p>
              <p className="text-gray-700"><span className="font-semibold">Total de hijos:</span> {result.totalHijos}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Distribución:</h3>
              <div className="mb-4">
                <p className="font-semibold text-gray-800">{formData.fallecido === 'padre' ? 'Madre' : 'Padre'} (cónyuge sobreviviente):</p>
                <p className="text-lg text-gray-700">
                  {result.porcentajeConyuge}% = $ {new Intl.NumberFormat('es-CL').format(result.montoConyugeSobreviviente)} CLP
                </p>
              </div>
              <hr className="my-4" />
              <div>
                <p className="font-semibold text-gray-800">Cada hijo:</p>
                <p className="text-lg text-gray-700 mb-2">
                  {result.porcentajePorHijo.toFixed(2)}% = $ {new Intl.NumberFormat('es-CL').format(result.montoPorHijo)} CLP
                </p>
                <p className="text-sm text-gray-600">
                  ({formData.numHijos} hijo{parseInt(formData.numHijos) > 1 ? 's' : ''} del matrimonio
                  {formData.hijosFueraMatrimonio === 'si' && ` + ${formData.numHijosFuera} hijo${parseInt(formData.numHijosFuera) > 1 ? 's' : ''} fuera del matrimonio`})
                </p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleNewCalculation}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Comenzar nuevo cálculo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}