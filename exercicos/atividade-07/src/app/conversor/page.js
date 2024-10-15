"use client";

import Pagina from "@/components/Pagina";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaDollarSign, FaEuroSign, FaBitcoin } from "react-icons/fa";
import { useState, useEffect } from "react";
import * as Yup from "yup"; 

export default function Conversor() {
  const [moeda, setMoeda] = useState("default");
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    setMoeda("default");
  }, []);

  function handleConvertion(values) {
    let valorConvertido = 0;
    const { real, moeda } = values;
    if (moeda === "dolar") {
      valorConvertido = real * 0.2;
    } else if (moeda === "euro") {
      valorConvertido = real * 0.18;
    } else if (moeda === "bitcoin") {
      valorConvertido = real * 0.000003;
    }
    setResultado(valorConvertido);
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

  const validationSchema = Yup.object({
    real: Yup.number()
      .required("O valor em reais é obrigatório")
      .min(0.01, "O valor deve ser maior que zero"),
    moeda: Yup.string()
      .required("Selecione uma moeda")
      .notOneOf(["default"], "Selecione uma moeda válida"),
  });

  return (
    <Pagina titulo="Conversor de Moedas">
      <Formik
        initialValues={{ real: "", moeda: "default" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleConvertion(values);
          setMoeda(values.moeda);
        }}
        onReset={() => {
          setResultado(null);
          setMoeda("default");
        }}
      >
        {({ handleSubmit, handleReset, values, setFieldValue }) => (
          <Form className="p-4 border rounded shadow-sm" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <label htmlFor="real">Digite o valor em Reais (R$):</label>
                <Field
                  name="real"
                  type="number"
                  className="form-control"
                  placeholder="Valor em reais"
                  step={0.01}
                />
                <ErrorMessage name="real" component="div" className="text-danger" />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <label htmlFor="moeda">Escolha a moeda de conversão:</label>
                <div className="d-flex align-items-center">
                  <Field
                    as="select"
                    name="moeda"
                    className="form-control"
                    value={values.moeda}
                    onChange={e => {
                      setFieldValue("moeda", e.target.value);
                      setMoeda(e.target.value);
                      setResultado(null); 
                    }}
                  >
                    <option value="default">Selecione</option>
                    <option value="dolar">Dólar</option>
                    <option value="euro">Euro</option>
                    <option value="bitcoin">Bitcoin</option>
                  </Field>
                  <div className="ms-3">
                    {values.moeda === "dolar" && <FaDollarSign size={24} />}
                    {values.moeda === "euro" && <FaEuroSign size={24} />}
                    {values.moeda === "bitcoin" && <FaBitcoin size={24} />}
                  </div>
                </div>
                <ErrorMessage name="moeda" component="div" className="text-danger" />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Button variant="primary" type="submit" className="me-2">
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
                        {values.real} reais é equivalente a{" "}
                        {resultado.toFixed(moeda === "bitcoin" ? 5 : 2)} {moeda}.
                      </p>
                    </Card.Body>
                  </Card>
                )}
              </Col>
              <Col md={4}>
                <Card.Img variant="top" src={handleImage()} alt={moeda} />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
