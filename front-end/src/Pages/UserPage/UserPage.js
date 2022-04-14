import React, {Component} from "react";
import * as UPS from "./UserPageStyle";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../../Router';
import Paper from '@material-ui/core/Paper';
import AbasDados from "../../Components/AbasDados/AbasDados";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clienteData: "",
            vendasData:"",
            genero: "",
            abasDados: false,

        };
    }

    async componentDidMount() {
        let clienteData = ""
        let vendasData = []
        this.props.cliente.forEach(cliente => {
            if(cliente.id === "00d6c7e9-515e-4913-8dc7-ffdd26e4446c"){
                clienteData = cliente
            }
        })

        this.props.vendas.forEach(venda => {
            if(venda.cliente === this.props.clienteId){
                vendasData.push(venda)
            }
        })
        console.log(vendasData)

        this.setState({clienteData: clienteData})
        this.setState({vendasData: vendasData})
        this.setState({genero: clienteData.genero})


    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };



    render() {

        return (
            <>
                <UPS.MainDiv>
                    <Paper elevation={3}>
                        <UPS.CustomHeader>
                            <UPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </UPS.HomeLogo>
                        </UPS.CustomHeader>
                    </Paper>
                    <UPS.UserPageWrapper>
                        <AbasDados
                            data={this.state.clienteData}
                            clienteId={this.props.clienteId}
                            clienteDataEndereco={this.state.clienteData.enderecos}
                            clienteDataTelefone={this.state.clienteData.telefones}
                            clienteDataDocumento={this.state.clienteData.documentos}
                            clienteDataCartao={this.state.clienteData.cartoes}
                            clienteDataCompras={this.state.vendasData}
                            tipoLogradouroList={this.props.logradouroList}
                        />

                    </UPS.UserPageWrapper>
                </UPS.MainDiv>
                <Paper elevation={3}>
                    <UPS.Footer>
                        <h3>aqui vai ficar o footer</h3>
                    </UPS.Footer>
                </Paper>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    cliente: state.cliente.clientes,
    logradouroList: state.cliente.tipoLogradouro,
    clienteId: state.cliente.clienteId,
    vendas: state.vendas.vendas,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)

