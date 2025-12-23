import React from 'react';

export default function ResultDisplay({ formData, result, handleNewCalculation }) {
  return (
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
        <p className="text-gray-700">
          <span className="font-semibold">Fallecido:</span> {formData.fallecido === 'padre' ? 'Padre' : 'Madre'}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Tipo de bien:</span> {
          formData.tipoBien === 'automovil' ? 'Automóvil' :
            formData.tipoBien === 'casa' ? 'Casa/Departamento' :
              'Tierras'
        }
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Avalúo comercial:</span> $ {formData.montoAvaluo} CLP
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Total de hijos:</span> {result.totalHijos}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Distribución:</h3>
        <div className="mb-4">
          <p className="font-semibold text-gray-800">
            {formData.fallecido === 'padre' ? 'Madre' : 'Padre'} (cónyuge sobreviviente):
          </p>
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
            {formData.hijosFueraMatrimonio === 'si' &&
              ` + ${formData.numHijosFuera} hijo${parseInt(formData.numHijosFuera) > 1 ? 's' : ''} fuera del matrimonio`
            })
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
  );
}