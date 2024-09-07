import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div style={{ textAlign: 'center'}}>
      
      <Image
        src="/mega-sena-logo.png"
        alt="Logo Mega Sena"
        layout="responsive"
        width={200}
        height={400}
        style={{ width: '100%', height: 'auto' }}
      />

      <br></br>
      <br></br>  
      <Link href="/sorteio">
        <button style={{ 
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '50px 60px', 
          fontSize: '40px', 
        }}>
          Clique aqui!
        </button>
      </Link>
    </div>
  );
}
