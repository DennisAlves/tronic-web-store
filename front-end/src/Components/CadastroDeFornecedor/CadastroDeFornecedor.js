import React, {Component} from "react";
import * as CFS from "./CadastroDeFornecedorStyles"
import {connect} from "react-redux";
import {Button, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";
import {getTipoLogradouro} from "../../Actions/ClienteActions";
import axios from "axios";

class CadastroDeFornecedor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            tipoTelefone: "",
            telefone: "",
            email: "",
            emailIsOk: false,
            cnpj: "",
            tipoLogradouro: "",
            cep: "",
            logradouro: "",
            complemento: "",
            bairro: "",
            numero: "",
            cidade: "",
            uf: "",
        };

    }

    async componentDidMount() {
        this.props.getTipoLogradouro();
    }

    handleFieldChange = (event) => {
        const {name, value} = event.target;

        this.setState({
                [name]: value,
            }, (() => {
                if (name === "cep") {
                    this.handleCepFillUp(this.state.cep)
                } else if (name === "email") {
                    this.emailIsValid(this.state.email)
                }
            })
        );
        //if (this.clientFieldsValidation()) {
        //    this.setState({clientDateButtonDisable: true})
        //} else {
        //   this.setState({clientDateButtonDisable: false})
        //}
    };

    handleCepFillUp = (cepUnformated) => {
        const cep = cepUnformated.replace(/[-_]/g, "")

        if (cep.length === 8) {
            const request = axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
                headers: {
                    "Content-Type": "application/json",
                }

            })

            request.then((response) => {

                this.setState({
                    tipoLogradouro: response.data.logradouro.substr(0, response.data.logradouro.indexOf(" ")),
                    logradouro: response.data.logradouro.substr(response.data.logradouro.indexOf(" ") + 1),
                    bairro: response.data.bairro,
                    cidade: response.data.localidade,
                    uf: response.data.uf,
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    emailIsValid = () => {
        // eslint-disable-next-line
        const regex = /^([\w-\.])+@([\w-]+\.)+[\w-]{3,4}$/g;
        if (this.state.email !== undefined) {
            if (regex.test(this.state.email)) {
                this.setState({emailIsOk: true})
            } else if (!regex.test(this.state.email)) {

                this.setState({emailIsOk: false})
            }
        }
        return this.state.emailIsOk;
    }


    render() {
        const {
            nome,
            tipoTelefone,
            telefone,
            email,
            emailIsOk,
            cnpj,
            tipoLogradouro,
            cep,
            logradouro,
            complemento,
            bairro,
            numero,
            cidade,
            uf,
        } = this.state

        let typeTel, maskFormat
        if (tipoTelefone === "" || tipoTelefone !== "Celular") {
            typeTel = 10
            maskFormat = "(99)9999-9999"
        } else {
            typeTel = 11
            maskFormat = "(99)99999-9999"
        }
        const tipoDeTelefoneList = ["Residencial", "Celular", "Comercial", "Recado"]
        const logradouroList = this.props.tipoLogradouro;
        const ufList = [
            {uf: "AC", nome: "Acre"},
            {uf: "AL", nome: "Alagoas"},
            {uf: "AP", nome: "Amapá"},
            {uf: "AM", nome: "Amazonas"},
            {uf: "BA", nome: "Bahia"},
            {uf: "CE", nome: "Ceará"},
            {uf: "DF", nome: "Distrito Federal"},
            {uf: "ES", nome: "Espírito Santo"},
            {uf: "GO", nome: "Goiás"},
            {uf: "MA", nome: "Maranhão"},
            {uf: "MT", nome: "Mato Grosso"},
            {uf: "MS", nome: "Mato Grosso do Sul"},
            {uf: "MG", nome: "Minas Gerais"},
            {uf: "PA", nome: "Pará"},
            {uf: "PB", nome: "Paraíba"},
            {uf: "PR", nome: "Paraná"},
            {uf: "PE", nome: "Pernambuco"},
            {uf: "PI", nome: "Piauí"},
            {uf: "RJ", nome: "Rio de Janeiro"},
            {uf: "RN", nome: "Rio Grande do Norte"},
            {uf: "RS", nome: "Rio Grande do Sul"},
            {uf: "RO", nome: "Rondônia"},
            {uf: "RR", nome: "Roraima"},
            {uf: "SC", nome: "Santa Catarina"},
            {uf: "SP", nome: "São Paulo"},
            {uf: "SE", nome: "Sergipe"},
            {uf: "TO", nome: "Tocantins"}
        ];

        return (
            <CFS.MainDiv>
                <CFS.FornecedorWrapper>

                    <CFS.FornecedorFieldsWrapper>

                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="nome"
                                   type="text"
                                   label="Nome"
                                   required
                                   value={nome.replace(/\d+/g, "")}
                                   error={!/^([a-zA-Z][\w ]{3,})$/.test(nome) && nome !== ""}
                                   helperText={!/^([a-zA-Z][\w ]{3,})$/.test() && nome !== "" ? "o nome deve ter pelo menos 4 letras." : ""}
                        />

                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="email"
                                   type="email"
                                   label="E-mail"
                                   required
                                   isemail="true"
                                   value={email}
                                   error={!emailIsOk && email !== ""}
                                   helperText={!emailIsOk && email !== "" ? "email invalido." : ""}
                        />

                        <FormControl style={{minWidth: 270}}>
                            <InputLabel>Tipo de telefone</InputLabel>
                            <Select
                                name="tipoTelefone"
                                value={tipoTelefone}
                                onChange={this.handleFieldChange}
                                required
                                error={!tipoTelefone && tipoTelefone !== ""}
                            >
                                {tipoDeTelefoneList.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            <div key={index}>{item}</div>
                                        </MenuItem>
                                    );
                                })}

                            </Select>
                        </FormControl>
                        <InputMask
                            mask={maskFormat}
                            value={telefone}
                            onChange={this.handleFieldChange}
                        >
                            <TextField
                                style={{minWidth: 270}}
                                name="telefone"
                                label="Telefone"
                                type="tel"
                                required
                                error={telefone.replace(/[-_()]/g, "").length !== typeTel && telefone !== ""}
                                helperText={telefone.replace(/[-_()]/g, "").length !== typeTel && telefone !== "" ? "o numero digitado não está correto" : ""}
                            />
                        </InputMask>
                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="cnpj"
                                   type="text"
                                   label="Cnpj"
                                   required
                                   value={cnpj}
                        />
                        <InputMask
                            mask="99999-999"
                            value={cep}
                            onChange={this.handleFieldChange}
                        >
                            <TextField
                                style={{minWidth: 270}}
                                name="cep"
                                type="text"
                                label="Cep"
                                required
                                error={cep.replace(/[-_()]/g, "").length < 8 && cep !== ""}
                                helperText={cep.replace(/[-_()]/g, "").length < 8 && cep !== "" ? "o numero digitado não está correto" : ""}
                            />
                        </InputMask>
                    </CFS.FornecedorFieldsWrapper>
                    <CFS.FornecedorFieldsWrapper>

                        <FormControl style={{minWidth: 270}} error={!tipoLogradouro && tipoLogradouro !== ""}>
                            <InputLabel>Logradouro</InputLabel>
                            <Select
                                name="tipoLogradouro"
                                value={tipoLogradouro}
                                onChange={this.handleFieldChange}
                                required
                            >
                                {logradouroList.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            <div key={index}>{item}</div>
                                        </MenuItem>
                                    );
                                })}

                            </Select>
                        </FormControl>
                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="logradouro"
                                   type="text"
                                   label="Endereço"
                                   required
                                   value={logradouro.replace(/\d+/g, "")}
                                   error={!/^([a-zA-Z][\w ]{3,})$/.test(logradouro) && logradouro !== ""}
                                   helperText={!/^([a-zA-Z][\w ]{4,})$/.test(logradouro) && logradouro !== "" ? "o logradouro deve ter pelo menos 3 letras." : ""}
                        />

                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="numero"
                                   type="text"
                                   label="Numero"
                                   required
                                   value={numero.replace(/\D/g, "")}
                                   error={!/^([0-9]{1,})$/.test(numero) && numero !== ""}
                                   helperText={!/^([0-9]{1,})$/.test(numero) && numero !== "" ? "digite um numero." : ""}
                        />

                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="complemento"
                                   type="text"
                                   label="Complemento"
                                   value={complemento}
                        />

                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="bairro"
                                   type="text"
                                   label="Bairro"
                                   required
                                   value={bairro.replace(/\d+/g, "")}
                                   error={!/^([a-zA-Z][\w ]{4,})$/.test(bairro) && bairro !== ""}
                                   helperText={!/^([a-zA-Z][\w ]{4,})$/.test(bairro) && bairro !== "" ? "o nome do bairro deve ter pelo menos 3 letras." : ""}

                        />

                        <TextField style={{minWidth: 270}}
                                   onChange={this.handleFieldChange}
                                   name="cidade"
                                   type="text"
                                   label="Cidade"
                                   required
                                   value={cidade.replace(/\d+/g, "")}
                                   error={!/^([a-zA-Z][\w ]{4,})$/.test(cidade) && cidade !== ""}
                                   helperText={!/^([a-zA-Z][\w ]{4,})$/.test(cidade) && cidade !== "" ? "o nome da cidade deve ter pelo menos 3 letras." : ""}

                        />
                        <FormControl style={{minWidth: 270}} error={!uf && uf !== ""}>
                            <InputLabel>Estado *</InputLabel>
                            <Select
                                name="uf"
                                value={uf}
                                onChange={this.handleFieldChange}
                                required
                            >
                                {ufList.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.uf}>
                                            <div key={index}>{item.nome}</div>
                                        </MenuItem>
                                    );
                                })}

                            </Select>
                        </FormControl>
                    </CFS.FornecedorFieldsWrapper>
                </CFS.FornecedorWrapper>
                <Button style={{marginBottom:20, marginTop: 20}} variant="contained" color="primary" component="span" >Salvar</Button>
            </CFS.MainDiv>

        );
    }
}

const mapStateToProps = (state) => ({
    tipoLogradouro: state.cliente.tipoLogradouro,
})

function mapDispatchToProps(dispatch) {
    return {
        getTipoLogradouro: () => dispatch(getTipoLogradouro())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroDeFornecedor)