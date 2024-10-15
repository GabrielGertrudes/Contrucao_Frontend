"use client";

import Pagina from "@/components/Pagina";
import { useState, useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";

export default function Conversor() {
  const [moeda, setMoeda] = useState("");
  const [real, setReal] = useState("");
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    setMoeda("default");
  }, []);

  function handleConvertion() {
    let valorConvertido = 0;
    if (moeda === "dolar") {
      valorConvertido = real * 0.2;
    } else if (moeda === "euro") {
      valorConvertido = real * 0.18;
    } else if (moeda === "bitcoin") {
      valorConvertido = real * 0.000003;
    }
    setResultado(valorConvertido);
  }

  function handleReset() {
    setMoeda("default");
    setResultado(null);
  }

  function handleImage() {
    if (moeda === "dolar") {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScWlgKV654S9kcIyj3pBzfzYRdYzL7XO3Ozg&s";
    } else if (moeda === "euro") {
      return "https://t3.ftcdn.net/jpg/01/68/40/12/360_F_168401282_YFqDXHPwjUetzodT7qy7RfJQz6jFsqPG.jpg";
    } else if (moeda === "bitcoin") {
      return "https://blocktrends.com.br/wp-content/uploads/2023/11/Imagem-Padrao-BT-16.jpg";
    }

    return "https://static.vecteezy.com/ti/vetor-gratis/p1/47510666-conjunto-do-bitcoin-dolar-e-euro-moedas-dentro-isometria-vetor.jpg";
  }

  return (
    <Pagina titulo="Conversor de Moedas">
      <Form className="p-4 border rounded shadow-sm">
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formReal">
              <Form.Label>Digite o valor em Reais (R$):</Form.Label>
              <Form.Control
                type="number"
                value={real}
                onChange={(e) => setReal(e.target.value)}
                placeholder="Valor em reais"
                step={0.01}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formMoeda">
              <Form.Label>Escolha a moeda de conversão:</Form.Label>
              <Form.Select
                value={moeda}
                onChange={(e) => setMoeda(e.target.value)}
              >
                <option value="default">Selecione</option>
                <option value="dolar">Dólar</option>
                <option value="euro">Euro</option>
                <option value="bitcoin">Bitcoin</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Button variant="primary" onClick={handleConvertion} className="me-2">
              Converter
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Limpar
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={8}>
            {resultado !== null && (
              <Card>
                <Card.Body>
                  <h5>Resultado:</h5>
                  <p>
                    {real} reais é equivalente a {resultado.toFixed(4)} {moeda}.
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={4}>
            <Card.Img
              variant="top"
              src={handleImage()}
              alt={moeda}
            />
          </Col>
        </Row>
      </Form>
    </Pagina>
  );
}
