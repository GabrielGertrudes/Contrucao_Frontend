import { Row, Col } from "react-bootstrap";
import Pagina from "../components/Pagina";
import Cliente from "./Cliente";

export default function page() {

    const clientes = [
        {
            nome: "Joaquim",
            sobreNome: "Soares",
            idade: 30,
            imagem: 'https://picsum.photos/700?random=1'
        },
        {
            nome: "Jorge",
            sobreNome: "Teixeira",
            idade: 28,
            imagem: 'https://picsum.photos/700?random=2'
        },
        {
            nome: "João",
            sobreNome: "Teixeira",
            idade: 28,
            imagem: 'https://picsum.photos/700?random=3'
        },
        {
            nome: "Maria",
            sobreNome: "Teixeira",
            idade: 28,
            imagem: 'https://picsum.photos/700?random=4'
        },
        {
            nome: "Laerth",
            sobreNome: "Teixeira",
            idade: 28,
            imagem: 'https://picsum.photos/700?random=5'
        },
        {
            nome: "Jão",
            sobreNome: "Gustavo",
            idade: 28,
            imagem: 'https://picsum.photos/700?random=6'
        },
        {
            nome: "Gustavo",
            sobreNome: "Teixeira",
            idade: 28,
            imagem: 'https://picsum.photos/700?random=7'
        },
        {
            nome: "Amanda",
            sobreNome: "Teixeira",
            idade: 28,
            imagem: 'https://picsum.photos/700?random=8'
        }
    ]


    return (
        <Pagina titulo="Objetos">

            <Row xs={1} sm={1} md={2} lg={4} className="mt-2">

                {clientes.map(cliente => {
                    return (
                        <Col className="py-2">
                            <Cliente cliente={cliente} />
                        </Col>
                    )
                })}

            </Row>


        </Pagina>
    )
}