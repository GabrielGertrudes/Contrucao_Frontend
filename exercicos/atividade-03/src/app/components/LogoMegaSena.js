"use client";

import Image from 'next/image';

export default function MegaSenaLogo() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Image
        src="/mega-sena-logo.png" 
        alt="Logo Mega Sena"
        layout="responsive"
        width={200} 
        height={400} 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
}
