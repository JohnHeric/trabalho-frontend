import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import { useState} from 'react';
import { incluirCliente, atualizarCliente, buscarClientes } from '../../../redux/clienteReducer';
import toast, {Toaster} from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";

export default function FormCadClientes(props) {
const [cliente, setCliente] = useState(props.clienteSelecionado);
const [formValidado, setFormValidado] = useState(false);

const despachante = useDispatch();

function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {
       if (!props.modoEdicao) {
        despachante(incluirCliente(cliente));
       }
       else {
        despachante(atualizarCliente(cliente));
        props.setModoEdicao(false);
       }

       props.setModoEdicao(false);
                props.setClienteSelecionado({
                codigo: 0,
                nome: "",
                endereco: "",
                cidade: "",
                cep: ""
                });
                props.setExibirTabela(true);
   }
   else {
       setFormValidado(true);
   }
   evento.preventDefault();
   evento.stopPropagation();
   
}

function manipularMudanca(evento) {
   const elemento = evento.target.name;
   const valor = evento.target.value;
   setCliente({ ...cliente, [elemento]: valor });
}

return (
   <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>

       <Row className="mb-4">
           <Form.Group as={Col} md="4">
               <Form.Label>Código</Form.Label>
               <Form.Control
                   disabled
                   required
                   type="text"
                   id="codigo"
                   name="codigo"
                   value={cliente.codigo}
                   //disabled={props.modoEdicao}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
           </Form.Group>
       </Row>

       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Nome</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="nome"
                   name="nome"
                   value={cliente.nome}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
           </Form.Group>
       </Row>

       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Endereco</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="endereco"
                   name="endereco"
                   value={cliente.endereco}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
           </Form.Group>
       </Row>

       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>Cidade</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="cidade"
                   name="cidade"
                   value={cliente.cidade}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
           </Form.Group>
       </Row>

       <Row className="mb-4">
           <Form.Group as={Col} md="12">
               <Form.Label>CEP</Form.Label>
               <Form.Control
                   required
                   type="text"
                   id="cep"
                   name="cep"
                   value={cliente.cep}
                   onChange={manipularMudanca}
               />
               <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
           </Form.Group>
       </Row>

       <Row className='mt-2 mb-2'>
       <    Col md={1}>
                    <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                </Col>
            <Col md={{ offset: 1 }}>
                <Button onClick={() => {
                    props.setExibirTabela(true);
                }}>Voltar</Button>
            </Col>
        </Row>

       <Toaster position="top-right"/>
   </Form>
   
);
}