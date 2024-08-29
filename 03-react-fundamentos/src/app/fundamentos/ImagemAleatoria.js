export default function ImagemAleatoria() {

    const numeroAleatorio = Math.round(Math.random() * 200) + 1

    const urlImagem = `https://picsum.photos/200?random=${numeroAleatorio}`

    console.log(urlImagem)

    return (
        <>
            <h3>Imagem Aleatória</h3>
            <img src={urlImagem} />
        </>
    )
}