export default function NumeroAleatorio() {

  const numeroAleatorio = Math.floor(Math.random() * 1000) + 1


  return (
      <>
          <h2>Número Aleatorio</h2>
          <p>{numeroAleatorio}</p>
      </>
)
}