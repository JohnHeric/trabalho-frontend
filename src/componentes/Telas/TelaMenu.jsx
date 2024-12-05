/*import Pagina from "../layouts/Pagina";

export default function TelaMenu(props){
    return (
        <Pagina />
    );
}*/

import Pagina from "../layouts/Pagina.jsx";
import logo from "../../assets/imagens/x.jpeg";
import { Container } from "react-bootstrap";

export default function TelaMenu(props) {
    return (
        <Pagina>
            <Container className="p-4 mt-3">
                <div className="text-center ">
                    <img className="square bg-primary rounded" alt="erro404" src={logo} width="500" />
                </div>
                <br /><br />
                <h1 className="text-center">ACME</h1>
            </Container>
        </Pagina>
    )
}