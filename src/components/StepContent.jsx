import React from 'react';

export default function StepContent({
                                      currentStep,
                                      formData,
                                      setFormData,
                                      shouldShowStep,
                                      handleMontoChange
                                    }) {
  return (
    <>
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
    </>
  );
}