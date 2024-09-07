"use client";

import { useState } from 'react';

export default function NumeroAleatorio() {
  const [numeros, setNumeros] = useState([]);

  const gerarNumeros = () => {
    const novosNumeros = [];
    while (novosNumeros.length < 6) {
      const numeroAleatorio = Math.floor(Math.random() * 61);
      if (!novosNumeros.includes(numeroAleatorio)) {
        novosNumeros.push(numeroAleatorio);
      }
    }
    setNumeros(novosNumeros.sort((a, b) => a - b));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button 
        onClick={gerarNumeros} 
        style={{ 
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '10px 20px', 
          fontSize: '20px'
        }}
      >
        Sortear Números
      </button>
      <div style={{ marginTop: '20px' }}>
        {numeros.length > 0 && (
          <>
            <h2>Números Sorteados:</h2>
            <h1>{numeros.join(', ')}</h1>
          </>
        )}
      </div>
    </div>
  );
}