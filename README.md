
# IESB - CONTRUÇÃO DE FRONT END 

## GABRIEL GERTRUDES DE OLIVEIRA

## 2024 / 2°Semestre

## Extensões

- Material Icon Theme (Extensão das pastas)
- Live Preview
- VS Code ES7+ React/Redux/React-Native/JS snippets

## Revisão

- HTML
- CSS
- BOOTSTRAP
---

# 1º Bimestre

## **1 - Tecnologias**

## O que é React?

React é uma biblioteca JavaScript usada para construir interfaces de usuário (UI), especialmente para aplicações web de página única (SPAs). Ele permite que você componha UIs complexas a partir de pequenos e isolados blocos de código chamados componentes.

### Principais Características do React

- **Componentes:** Blocos reutilizáveis de UI.
- **JSX:** Uma sintaxe que combina JavaScript com HTML para facilitar a construção de componentes.
- **Virtual DOM:** Melhora a performance ao atualizar apenas as partes necessárias da interface.
- **Hooks (como useState e useEffect):** Permitem o gerenciamento de estado e efeitos colaterais dentro dos componentes.

---

## O que é Next.js?

Next.js é um framework React que facilita a construção de aplicações web modernas. Ele oferece funcionalidades como renderização no servidor (SSR), geração de sites estáticos (SSG), e uma nova abordagem de roteamento chamada **App Router**, o que torna o desenvolvimento mais eficiente e organizado.

### Principais Características do Next.js

- **Renderização no Servidor (SSR):** Melhora o SEO e a performance ao gerar páginas dinamicamente no servidor.
- **App Router (Novo):** A partir da versão 13, o Next.js introduziu um novo sistema de roteamento baseado na pasta `/app`, que oferece mais flexibilidade e recursos avançados como layouts aninhados, carregamento de dados em nível de layout e segmentação de rotas.
- **Layouts Aninhados:** Permite definir layouts específicos para diferentes segmentos da aplicação, tornando a organização de interfaces mais modular.
- **Server e Client Components:** O App Router facilita a separação entre componentes renderizados no servidor e no cliente, otimizando a performance e o tempo de carregamento.
- **Carregamento de Dados Integrado:** Simplifica o carregamento de dados diretamente nos componentes de servidor com funções como `fetch` ou APIs internas do Next.js.
- **Segmentação de Rotas:** As pastas dentro de `/app` podem ser divididas em segmentos para uma organização clara e intuitiva das rotas.
- **API Routes:** Permite criar endpoints de API dentro do projeto.
- **Geração Estática (SSG):** Pré-renderiza páginas no momento da build, otimizando a performance.

---

## O que é React-Bootstrap?

React-Bootstrap é uma biblioteca de componentes React baseada no framework Bootstrap. Ele oferece componentes prontos e estilizados que seguem o padrão visual do Bootstrap, facilitando o desenvolvimento de interfaces modernas e responsivas.

### Principais Características do React-Bootstrap

- **Componentes Pré-estilizados:** Botões, cards, formulários, tabelas e muito mais.
- **Responsividade:** Componentes são totalmente responsivos, facilitando o design mobile-first.
- **Integração Simples:** Fácil de usar junto com o React, substituindo o uso do jQuery que o Bootstrap tradicional usa.

---

## O que é Axios?

Axios é uma biblioteca JavaScript usada para fazer requisições HTTP, como GET, POST, PUT e DELETE, para APIs. Ele é uma alternativa ao `fetch` e é amplamente utilizado em projetos React por sua simplicidade e funcionalidades adicionais, como interceptadores de requisição e resposta.

### Principais Características do Axios

- **Facilidade de uso:** Sintaxe simples para fazer requisições HTTP.
- **Requisições Assíncronas:** Suporte completo para promessas e async/await.
- **Interceptors:** Permite modificar requisições e respostas antes de serem processadas.
- **Suporte para cancelamento de requisições:** Útil para otimizar a performance de apps.

## **2 - Iniciando um Projeto**

### Criar projeto NEXT (React)

- Instalar create-next-app

```bash
npm install -g create-next-app
```

- Criar projeto

```bash
npx create-next-app nome_projeto
```

- Perguntas

```bash
✔ Would you like to use TypeScript? … xNo / Yes

✔ Would you like to use ESLint? … xNo / Yes

✔ Would you like to use Tailwind CSS? … xNo / Yes

✔ Would you like to use `src/` directory? … No / xYes

✔ Would you like to use App Router? (recommended) … No / xYes

✔ Would you like to customize the default import alias (@/*)? … xNo / Yes
```

- Executar o projeto

```bash
npm run dev
```

- Instalar React Boostrap

```bash
npm install react-bootstrap bootstrap
```
- Fazer o import do CSS do bootstrap no arquivo layout

```bash
// importar CSS do Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
```

- Instalar o Axios

```bash
npm install axios
```

## **3 - Conceitos de Next.js e React**

## Estrutura de um Projeto Next.js

A partir do Next.js 14, a estrutura do projeto foi otimizada com o uso do **App Router** e da pasta `src/app`:

- `/public`: armazena arquivos públicos como imagens e outros ativos estáticos.
- `/src/app`: contém todas as rotas, componentes de layout e arquivos para construir a aplicação.
- `/src/app/layout.js`: layout global que envolve todas as páginas.
- `/src/app/page.js`: define a página inicial da aplicaçãp.
- `/src/app/globals.css`: CSS aplicado globalmente.
- `next.config.js`: arquivo de configuração do Next.js.

## Como Criar uma Página

Para criar uma página no Next.js 14 com o App Router, basta adicionar um arquivo `page.js` dentro de uma pasta em `src/app`. O nome da pasta será a rota da página.

```jsx
// src/app/home/page.js
export default function Home() {
  return <h1>Bem-vindo à Home!</h1>;
}
```

## Como Criar um Componente

Os componentes são funções ou classes que retornam elementos JSX.

```jsx
export default function MeuComponente() {
  return <div>Olá, sou um componente!</div>;
}
```

Componentes são a base do React. Eles podem ser definidos como funções ou classes e retornam JSX.

```jsx
function Botao() {
  return <button>Clique aqui</button>;
}
```

## JSX

JSX (JavaScript XML) é uma sintaxe que permite escrever HTML dentro de JavaScript e usá-lo em React.

```jsx
const elemento = <h1>Olá, mundo!</h1>;
```

## Comentários

No JSX, usamos `{/* Comentário */}` para adicionar comentários.

```jsx
{/* Isso é um comentário */}
```

## Propriedades nos Componentes

Propriedades (props) permitem passar dados para os componentes.

```jsx
function Saudacao(props) {
  return <h1>Olá, {props.nome}!</h1>;
}
```

## Componente Pai e Filho

Componentes pai podem passar dados para componentes filhos através de props.

```jsx
function Pai() {
  return <Filho mensagem="Olá, filho!" />;
}

function Filho(props) {
  return <p>{props.mensagem}</p>;
}
```

```jsx
function Familia(props){
    return (
        <h1>{props.nomeFamilia}</h1>
        <div>{props.children}</div>
    )
}

function Filho(props){
    return (
        <h1>{props.nome}</h1>
    )
}

export default function Page(){
    return(
        <Familia nomeFamilia="Soares">
            <Filho nome="João" />
            <Filho nome="Jorge" />
        </Familia>
    )
}
```



## CSS Modules e Inline

- **CSS Modules**: permite escopar o CSS para um componente específico.

```css
/* styles.module.css */
.titulo {
  color: red;
}
```

```jsx
import styles from './styles.module.css';
function MeuComponente() {
  return <h1 className={styles.titulo}>Título Estilizado</h1>;
}
```

- **Inline**: aplicar estilos diretamente no JSX.

```jsx
function MeuComponente() {
  return <h1 style={{ color: 'blue' }}>Título Azul</h1>;
}
```

## React-Bootstrap

Para instalar o React-Bootstrap, execute:

```bash
npm install react-bootstrap bootstrap
```

E importe o CSS no projeto:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

## Usar Componentes do React-Bootstrap

React-Bootstrap oferece componentes pré-estilizados.

```jsx
import { Button } from 'react-bootstrap';
function App() {
  return <Button variant="primary">Clique aqui</Button>;
}
```

```jsx
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
export default function Cliente({ nome, sobrenome, idade, imagem }) {
  return (
    <Card>
      <Card.Img variant="top" src={imagem}/>
      <ListGroup className="list-group-flush">
        <ListGroup.Item><strong>{nome} {sobrenome}</strong></ListGroup.Item>
        <ListGroup.Item>{idade} anos</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}
```

```jsx
import { Carousel, Col, Container, Row, Table } from "react-bootstrap";
export default function page() {
  const carros = ["HB20", "Palio", "Civic", "Onix"]

  return (
    <Container>

      <Row>
        <Col>
          {carros.map(carro => {
            return <p>{carro}</p>
          })}
        </Col>
        <Col>
          <ul>
            {carros.map(carro => {
              return <li>{carro}</li>
            })}
          </ul>
        </Col>
      </Row>

      <Row>
        <Table striped bordered hover>
          <thead className="table-primary">
            <tr>
              <th>Carro</th>
            </tr>
          </thead>
          <tbody>
            {carros.map(carro => {
              return <tr>
                <td>{carro}</td>
              </tr>
            })}
          </tbody>
        </Table>
      </Row>

    </Container>
  )
}
```

## Server Components e Client Components

- **Server Components**: são renderizados no servidor e não têm estado ou efeitos. Por padrão, todo componente criado no projeto é Server Component.
- **Client Components**: renderizados no cliente, podem usar estado, hooks e efeitos.
- Para transformar o componente em Client Component deve utilizar a anotação 'use client' no component.

```jsx
'use client'

import { Button } from 'react-bootstrap';

function App() {
  return <Button variant="primary">Clique aqui</Button>;
}
```

## Arrays

Arrays são listas de elementos e podem ser iterados para renderizar conteúdo.

```jsx
const frutas = ['Maçã', 'Banana', 'Laranja'];
return (
  <ul>
    {frutas.map((fruta) => (
      <li key={fruta}>{fruta}</li>
    ))}
  </ul>
);
```

## Objetos / Array de Objetos

Objetos são estruturas de dados com pares de chave/valor. Arrays de objetos são comuns em dados de API.

```jsx
const usuario = { nome: 'João', idade: 25 };
const usuarios = [{ nome: 'Ana' }, { nome: 'Carlos' }];
```

## Instalar Axios

Para instalar o Axios, execute:

```bash
npm install axios
```

## Consumo de API com Axios

Axios é usado para fazer requisições HTTP.

```jsx
import axios from 'axios';
axios.get('https://api.exemplo.com/dados')
  .then(resposta => console.log(resposta.data));
```

## Criar Instância do Axios com URL Base e Token de Autenticação

```jsx
const api = axios.create({
  baseURL: 'https://api.exemplo.com',
  headers: { Authorization: 'Bearer meu-token' }
});
```

## Controle de Estados (useState)

O hook `useState` permite controlar o estado de um componente.

```jsx
const [contador, setContador] = useState(0);

function incrementar() {
    if (contador < 100) {
        setContador(contador + 1)
    }
}
function decrementar() {
    if(contador > 0){
        setContador(contador - 1)
    }
}
```

## useState e useEffect

- **useState**: controla o estado dentro de um componente.
- **useEffect**: executa efeitos colaterais, como requisições de API.

```jsx
const [dados, setDados] = useState([]);

// É executado toda vez que o componente é iniciado
useEffect(() => {
  axios.get('/api')
    .then(res => setDados(res.data));
}, []);
```

## Rotas e Rotas Aninhadas

O Next.js cria rotas automaticamente com base nos arquivos dentro da pasta `pages`. Rotas aninhadas podem ser criadas com subpastas.

```jsx
// pages/usuarios/index.js
export default function ListaUsuarios() {
  return <h1>Lista de Usuários</h1>;
}

// pages/usuarios/[id].js
export default function DetalheUsuario() {
  return <h1>Detalhes do Usuário</h1>;
}
```

## Rotas Dinâmicas

No novo sistema de rotas, você pode criar pastas e arquivos com colchetes para rotas dinâmicas e criar rotas aninhadas de maneira simples.

```jsx
// src/app/users/[id]/page.js
export default function UserPage({ params }) {
  return <h1>Usuário ID: {params.id}</h1>;
}
```

Aqui, [id] indica que a rota é dinâmica e o params.id pode ser usado para acessar o valor da rota.

## Usando Variáveis de Ambiente no Next.js 14

No Next.js 14, o uso de variáveis de ambiente é importante para proteger informações sensíveis, como chaves de API, URLs de banco de dados e tokens de autenticação. As variáveis de ambiente são armazenadas em arquivos `.env` e acessadas dentro do projeto por meio de `process.env`.

### 1. Criando o Arquivo `.env.local`

As variáveis de ambiente são definidas em arquivos `.env`. O mais comum é o `.env.local`, que contém variáveis específicas do ambiente de desenvolvimento e não deve ser versionado.

Crie um arquivo chamado `.env.local` na raiz do seu projeto Next.js:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_API_KEY=abcd1234
```
- Variáveis que começam com NEXT_PUBLIC_ podem ser acessadas tanto no cliente quanto no servidor.
- Variáveis sem o prefixo NEXT_PUBLIC_ são acessíveis apenas no servidor, garantindo a segurança de informações sensíveis.

### 2. Acessando Variáveis de Ambiente

#### No Cliente

Para acessar variáveis de ambiente no cliente (browser), as variáveis precisam ser prefixadas com NEXT_PUBLIC_:

```jsx
// src/app/page.js
export default function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return <div>API URL: {apiUrl}</div>;
}
```

### 3. Boas Práticas

- Não versione arquivos .env.local: Use o .gitignore para garantir que essas informações sensíveis não sejam enviadas para o Git.
- Use o prefixo NEXT_PUBLIC_: Somente quando a variável de ambiente for necessária no lado do cliente.
- Mantenha as variáveis seguras: Evite expor informações confidenciais, como chaves de API e senhas, no cliente.

## **4 - API's The MovieDB**

## Api

- Documentação: https://developer.themoviedb.org/reference/intro/getting-started
- URL Base: https://api.themoviedb.org/3 

## Endpoints

### Imagens

- https://image.tmdb.org/t/p/w500/ + path

### Filmes

Filmes Populares

- /movie/popular?language=pt-BR

Filmes Melhores Avaliados

- /movie/top_rated?language=pt-BR

Filmes em Cartaz

- /movie/now_playing?language=pt-BR

Filmes Lançamento

- /movie/upcoming?language=pt-BR

Detalhes do Filme

- /movie/id?language=pt-BR

Elenco do Filme

- /movie/id/credits?language=pt-BR

### Séries

Séries Populares

- /tv/popular?language=pt-BR

Séries Melhores Avaliados

- /tv/top_rated?language=pt-BR

Séries na TV

- /tv/airing_today?language=pt-BR

Séries exibidas hoje

- /tv/on_the_air?language=pt-BR

Detalhes da Série

- /tv/id?language=pt-BR

### Atores

Lista de Atores

- /person/popular?language=pt-BR

Detalhes do Ator

- /person/id?language=pt-BR

Filmes do Ator

- /person/id/movie_credits?language=pt-BR

Séries do Ator

- /person/id/tv_credits?language=pt-BR

Imagens do Ator

- /person/id/images?language=pt-BR
