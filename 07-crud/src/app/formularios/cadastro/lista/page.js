'use client'

import Pagina from '@/components/Pagina'
import { Table } from 'react-bootstrap'

export default function page() {

    const alunos = JSON.parse(localStorage.getItem('alunos')) || []

    console.log(alunos)



    return (
        <Pagina titulo={"Lista de Alunos"}>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>

                    {alunos.map(item => (
                        <tr>
                            <td>{item.matricula}</td>
                            <td>{item.nome}</td>
                            <td>
                                <img src={item.foto} width={48} />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>

        </Pagina>
    )
}