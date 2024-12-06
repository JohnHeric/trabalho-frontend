import { Button, Spinner, Col, Form, InputGroup, Row} from 'react-bootstrap';
import { useState} from 'react';
import { gravarCliente} from '../../../servicos/servicoCliente';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadClientes(props) {
const [cliente, setCliente] = useState(props.clienteSelecionado);
const [formValidado, setFormValidado] = useState(false);

function manipularSubmissao(evento) {
   const form = evento.currentTarget;
   if (form.checkValidity()) {

       if (!props.modoEdicao) {
           gravarCliente(cliente)
           .then((resultado)=>{
               if (resultado.status){
                   props.setExibirTabela(true);
               }
               else{
                   toast.error(resultado.mensagem);
               }
           });
       }
       else {
           props.setListaDeClientes(props.listaDeClientes.map((item) => {
               if (item.codigo !== cliente.codigo)
                   return item
               else
                   return cliente
           }));

           props.setModoEdicao(false);
           props.setClienteSelecionado({
               codigo: 0,
               nome: "",
               endereco: "",
               cidade: "",
               cep: "",
           });
           props.setExibirTabela(true);
       }

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
                   //disabled
                   required
                   type="text"
                   id="codigo"
                   name="codigo"
                   value={cliente.codigo}
                   disabled={props.modoEdicao}
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