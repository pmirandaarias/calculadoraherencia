import React from 'react';

export default function Header() {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6 p-6 text-center">
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-3">
        Calculadora Herencia Chile
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-2">
        Completa el paso a paso para obtener los montos y porcentajes.
      </p>
    </div>
  );
}