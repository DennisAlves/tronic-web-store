import React, {Component} from "react";
import * as CCS from "./CreateCupomStyles"
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import {Button} from "@material-ui/core";
import {v4 as uuidv4} from 'uuid';
import {setCupons} from "../../Actions/VendasActions"
import {push} from "connected-react-router";
import {routes} from "../../Router";


class CreateCupom extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            id: "",
            cupom: "",
            valor: "",
            qtde: "",
            validade: "",
        }

    }
     handleFieldChange = event => {
             this.setState({
                 [event.target.name]: event.target.value
             });

     };

    createCupom =()=>{
        let copyList = this.props.cupons;
        copyList.push(
            {
                id: uuidv4(),
                cupom: this.state.cupom,
                valor: this.state.valor,
                qtde: this.state.qtde,
                validade: this.state.validade,
            }
        )
        this.props.setCupons(copyList)
    }
    validateCupomSave =() => {
        if(
            this.state.cupom === "" ||
            this.state.valor === "" ||
             this.state.qtde === "" ||
             this.state.validade === ""
        ){
            return true
        }
        else return false
    }

     render() {
        const {cupom,valor,qtde,validade} = this.state
         return (
             <>
                 <CCS.MainDiv>
                     <CCS.CupomWrapper>
                         <TextField
                             name="cupom"
                             type="text"
                             label="Nome"
                             value={cupom}
                             onChange={this.handleFieldChange}
                         />
                         <TextField
                             name="valor"
                             type="text"
                             label="Valor"
                             required
                             value={valor.replace(/[a-zA-Z-_+!@#$%^&*(),?":{}|<>]/g,"")}
                             onChange={this.handleFieldChange}
                             InputProps={{
                                 inputProps: {
                                     min: 1,
                                 }
                             }}
                         />
                         <TextField
                             name="qtde"
                             type="text"
                             label="Quantidade"
                             value={qtde.replace(/[a-zA-Z-_+!@#$%^&*(),?":{}|<>]/g,"")}
                             onChange={this.handleFieldChange}
                             InputProps={{
                                 inputProps: {
                                     min: 1
                                 }
                             }}
                         />
                         <TextField style={{minWidth: 270}}
                                    onChange={this.handleFieldChange}
                                    name="validade"
                                    type="date"
                                    label="Validade"
                                    value={validade}
                                    required
                                    error={validade !== "" && moment().isSameOrAfter(validade)}
                                    helperText={validade !== "" && moment().isSameOrAfter(validade) ? "É nescessario uma validade valida." : ""}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{inputProps: {min: moment().format('YYYY-MM-DD')}}}
                         />
                         <Button disabled={this.validateCupomSave()} onClick={()=>{this.createCupom()}}>Criar Cupom</Button>
                     </CCS.CupomWrapper>
                     <CCS.CupomWrapper>

                     </CCS.CupomWrapper>
                 </CCS.MainDiv>
             </>
         );
     }
}
const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
    vendas: state.vendas.vendas,
    clientes: state.cliente.clientes,
    cupons: state.vendas.cupons,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        setCupons: (cupom) => dispatch(setCupons(cupom)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCupom)



