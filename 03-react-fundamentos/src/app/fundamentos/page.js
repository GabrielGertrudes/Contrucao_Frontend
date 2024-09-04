import Pagina from "../components/Pagina";
import Cabecalho from "./Cabecalho";
import Familia from "./Familia";
import Filho from "./Filho";
import ImagemAleatoria from "./ImagemAleatoria";
import MeuComponente from "./MeuComponente";
import NumeroAleatorio from "./NumeroAleatorio";
import NumeroMaior from "./NumeroMaior";


export default function Fundamentos() {

    return (
        <Pagina titulo="Fundamentos">
            {/* Comentários no JSX */}

            <Cabecalho titulo="Fundamentos" descricao="Página de fundamentos de React/Next" />

            <MeuComponente />
            <hr />

            <NumeroMaior numA={2} numB={10} />
            <NumeroMaior numA={100} numB={8} />
            <NumeroMaior numA={20} numB={32} />
            <NumeroMaior numA={2} numB={11} />
            <NumeroMaior numA={1140} numB={10} />
            <NumeroMaior numA={222} numB={666} />

            <hr />

            <NumeroAleatorio />
            <NumeroAleatorio />
            <NumeroAleatorio />
            <NumeroAleatorio />

            <hr />

            <Familia nomeFamilia="Soares">
                <Filho nome="Júlia" sobreNome="Soares" />
                <Filho nome="João" sobreNome="Soares" />
                <Filho nome="Maria" sobreNome="Soares" />
                <Filho nome="Jorge" sobreNome="Soares" />
            </Familia>
            
            <Familia nomeFamilia="Xororô">
                <Filho nome="Sandy" sobreNome="Xororô"></Filho>
                <Filho nome="Junior" sobreNome="Xororô"></Filho>
            </Familia>

            <hr />

            <ImagemAleatoria />
            <ImagemAleatoria />
            <ImagemAleatoria />
            <ImagemAleatoria />
            <ImagemAleatoria />
            <ImagemAleatoria />
            <ImagemAleatoria />

            


        </Pagina>
    )



}