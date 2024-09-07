"use client"; 

import LogoMegaSena from '../components/LogoMegaSena'; 
import NumeroAleatorio from '../components/NumeroAleatorio';
export default function Sorteio() {
  return (
    <div style={{ textAlign: 'center' }}>
      <LogoMegaSena />
      <h1>Sorteio da Mega Sena</h1>
      <br></br>
      <NumeroAleatorio/>
    </div>
  );
}
