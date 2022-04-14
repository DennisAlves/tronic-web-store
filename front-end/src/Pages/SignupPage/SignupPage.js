import React, {Component} from "react";
import * as SPS from "./SignupPageStyle";
import {push} from "connected-react-router";
import {routes} from '../../Router';
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import * as HPS from '../HomePage/HomePageStyles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/pt-br";
import Payment from "payment"
import Typography from "@material-ui/core/Typography";
import ClientDataFields from "../../Components/SignupComponents/CadastroCliente/CadastroCliente";
import DocumentoDataFields from "../../Components/SignupComponents/CadastroDocumento/CadastroDocumento";
import AddressDataFields from "../../Components/SignupComponents/CadastroEndereço/CadastroEndereco";
import CrediCardDataFields from "../../Components/SignupComponents/CadastroCartao/CadastroCartao";
import * as Validate from "../../Components/Validations/Validations"

class SignupPage extends Component {

    state = {
        activeStep: 4,
        steps: ['Dados Do Cliente', 'Documento', 'Endereço de Entrega', 'Endereço de Cobrança', 'Cartão De Credito'],
        nome: "",
        email: "",
        senha: "",
        testeSenha: "",
        mostrarSenha: false,
        dtNascimento: "",
        genero: "",
        telefone: "",
        tipoTelefone: "",
        codigo: "",
        tipoDocumento: "",
        validade: "",
        enderecoList: [
            {
                tipoEndereco: "entrega",
                descricaoEndereco: "",
                tipoResidencia: "",
                tipoLogradouro: "",
                cep: "",
                logradouro: "",
                numero: "",
                bairro: "",
                cidade: "",
                complemento: "",
                uf: "",
            },
            {
                tipoEndereco: "cobranca",
                descricaoEndereco: "",
                tipoResidencia: "",
                tipoLogradouro: "",
                cep: "",
                logradouro: "",
                numero: "",
                bairro: "",
                cidade: "",
                complemento: "",
                uf: "",
            }
        ],
        cvc: "",
        expiry: "",
        focused: "",
        name: "",
        number: "",
        stepButton: true,
        nextButtonVisibility: true
    }


    handleFieldChange = event => {
        this.setState({
                [event.target.name]: event.target.value,
            }, (() => {
                this.handleFieldStateCheck(this.state.activeStep)
            })
        );

    };

    handleEnderecoFieldChange = (event) => {
        if (this.state.activeStep === 2) {
            let enderecoCopy = this.state.enderecoList;

            enderecoCopy[0][event.target.name] = event.target.value

            if (event.target.name === "cep") {
                if (event.target.value.replace(/[-_]/g, "").length === 8) {
                    this.handleCepFillUp(event.target.value)
                }
            }

            this.setState({enderecoList: enderecoCopy})
        }
        if (this.state.activeStep === 3) {
            let enderecoCopy = this.state.enderecoList;

            enderecoCopy[1][event.target.name] = event.target.value

            if (event.target.name === "cep") {
                if (event.target.value.replace(/[-_]/g, "").length === 8) {
                    this.handleCepFillUp(event.target.value)
                }
            }

            this.setState({enderecoList: enderecoCopy})
        }
    };

    checkStateClient = () => {
        let typeTel
        if (this.state.tipoTelefone === "" || this.state.tipoTelefone !== "Celular") {
            typeTel = 10
        } else {
            typeTel = 11
        }
        if (
            this.state.nome !== "" &&
            this.state.email !== "" &&
            this.state.senha !== "" &&
            this.state.testeSenha !== "" &&
            this.state.senha !== "" &&
            this.state.testeSenha !== "" &&
            this.state.dtNascimento !== "" &&
            this.state.genero !== "" &&
            this.state.telefone !== ""
        ) {
            this.setState({
                nextButtonVisibility: (Validate.validateNome(this.state.nome) ||
                    Validate.validateEmail(this.state.email) ||
                    Validate.validateSenha(this.state.senha) ||
                    Validate.validateSenha(this.state.testeSenha) ||
                    Validate.validateConfirmSenha(this.state.senha, this.state.testeSenha) ||
                    Validate.validateNasc(this.state.dtNascimento) ||
                    Validate.validateTel(this.state.telefone, typeTel))
            })
        } else this.setState({nextButtonVisibility: true});

    }

    checkStateDocument = () => {
        if (
            this.state.codigo !== "" &&
            this.state.tipoDocumento !== "" &&
            this.state.validade !== ""
        ) {
            if (this.state.tipoDocumento === "CNH") {
                this.setState({
                    nextButtonVisibility:
                        (Validate.validateDoc(this.state.codigo, this.state.tipoDocumento) ||
                            Validate.validateValidadeCnh(this.state.validade)
                        )
                })
            } else if (this.state.tipoDocumento === "RG" || this.state.tipoDocumento === "CPF") {
                this.setState({
                    nextButtonVisibility:
                        (Validate.validateDoc(this.state.codigo, this.state.tipoDocumento) ||
                            Validate.validateValidadeRgAndCpf(this.state.validade)
                        )
                })
            }
        } else this.setState({nextButtonVisibility: true});
    }

    checkStateCard = () => {
        if (
            this.state.cvc !== "" &&
            this.state.expiry !== "" &&
            this.state.name !== "" &&
            this.state.number !== ""
        ) {
            this.setState({
                nextButtonVisibility:
                    (!Payment.fns.validateCardNumber(this.state.number.replace(/[_.]/g, "")) ||
                        this.state.name.length < 5 ||
                        !moment().isSameOrAfter(moment(this.state.expiry).format("MM/YY")) ||
                        this.state.cvc.replace(/[_.]/g, "").length < 3
                    )
            })
        } else this.setState({nextButtonVisibility: true});
    }

    handleFieldStateCheck = (activeStep) => {

        if (activeStep === 0) {
            this.checkStateClient()
        }

        if (activeStep === 1) {
            this.checkStateDocument()
        }

        if (activeStep === 4) {
            this.checkStateCard()
        }
    }

    handleInputFocus = (event) => {
        const target = event.target;
        this.setState({focused: target.name,});
    };

    handleExpireDate = (date) => {
        this.setState({
            expiry: date
        });
    };

    handleMouseDownPassword = () => {
        if (!this.state.mostrarSenha) {
            this.setState({mostrarSenha: true});
        } else {
            this.setState({mostrarSenha: false});
        }
    };

    handleCepFillUp = (cep) => {


        const request = axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
            headers: {
                "Content-Type": "application/json",
            }

        })

        request.then((response) => {
            if (response.data.erro) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cep invalido!',
                })
                if (this.state.activeStep === 2) {
                    let enderecoCopy = this.state.enderecoList;

                    enderecoCopy[0].tipoLogradouro = "";
                    enderecoCopy[0].logradouro = "";
                    enderecoCopy[0].bairro = "";
                    enderecoCopy[0].cidade = "";
                    enderecoCopy[0].uf = "";

                    this.setState({enderecoList: enderecoCopy})
                }
                if (this.state.activeStep === 3) {
                    let enderecoCopy = this.state.enderecoList;

                    enderecoCopy[1].tipoLogradouro = "";
                    enderecoCopy[1].logradouro = "";
                    enderecoCopy[1].bairro = "";
                    enderecoCopy[1].cidade = "";
                    enderecoCopy[1].uf = "";

                    this.setState({enderecoList: enderecoCopy})
                }

            } else {
                if (this.state.activeStep === 2) {
                    let enderecoCopy = this.state.enderecoList;

                    enderecoCopy[0].tipoLogradouro = response.data.logradouro.substr(0, response.data.logradouro.indexOf(" "));
                    enderecoCopy[0].logradouro = response.data.logradouro.substr(response.data.logradouro.indexOf(" ") + 1);
                    enderecoCopy[0].bairro = response.data.bairro;
                    enderecoCopy[0].cidade = response.data.localidade;
                    enderecoCopy[0].uf = response.data.uf;

                    this.setState({enderecoList: enderecoCopy})
                }
                if (this.state.activeStep === 3) {
                    let enderecoCopy = this.state.enderecoList;

                    enderecoCopy[1].tipoLogradouro = response.data.logradouro.substr(0, response.data.logradouro.indexOf(" "));
                    enderecoCopy[1].logradouro = response.data.logradouro.substr(response.data.logradouro.indexOf(" ") + 1);
                    enderecoCopy[1].bairro = response.data.bairro;
                    enderecoCopy[1].cidade = response.data.localidade;
                    enderecoCopy[1].uf = response.data.uf;

                    this.setState({enderecoList: enderecoCopy})
                }
            }
        }).catch((err) => {
            console.log(err)
        })

    }


    handleNext = () => {
        this.setState({activeStep: this.state.activeStep + 1})
    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep - 1})
    };

    handleReset = () => {
        this.setState({activeStep: 0})
    };

    getStepContent(activeStep) {

        const tipoDocumentoList = ["RG", "CNH", "CPF"]

        const {
            nome,
            email,
            senha,
            testeSenha,
            mostrarSenha,
            dtNascimento,
            genero,
            telefone,
            tipoTelefone,
            codigo,
            tipoDocumento,
            validade,
            enderecoList,
            cvc,
            focused,
            name,
            number,
            expiry
        } = this.state

        switch (activeStep) {
            case 0:
                return (
                    <ClientDataFields
                        handleFieldChange={this.handleFieldChange}
                        handleMouseDownPassword={this.handleMouseDownPassword}
                        nome={nome}
                        email={email}
                        dtNascimento={dtNascimento}
                        senha={senha}
                        testeSenha={testeSenha}
                        mostrarSenha={mostrarSenha}
                        telefone={telefone}
                        tipoTelefone={tipoTelefone}
                        genero={genero}
                    />
                )

            case 1:
                return (
                    <DocumentoDataFields
                        handleFieldChange={this.handleFieldChange}
                        tipoDocumentoList={tipoDocumentoList}
                        tipoDocumento={tipoDocumento}
                        codigo={codigo}
                        validade={validade}
                    />
                )

            case 2:
                return (
                    <AddressDataFields
                        handleFieldChange={this.handleEnderecoFieldChange}
                        descricaoEndereco={enderecoList[0].descricaoEndereco}
                        tipoLogradouro={enderecoList[0].tipoLogradouro}
                        tipoDeResidencia={enderecoList[0].tipoResidencia}
                        cep={enderecoList[0].cep}
                        logradouro={enderecoList[0].logradouro}
                        complemento={enderecoList[0].complemento}
                        bairro={enderecoList[0].bairro}
                        numero={enderecoList[0].numero}
                        cidade={enderecoList[0].cidade}
                        uf={enderecoList[0].uf}
                    />
                )

            case 3:
                return (
                    <AddressDataFields
                        handleFieldChange={this.handleEnderecoFieldChange}
                        descricaoEndereco={enderecoList[1].descricaoEndereco}
                        tipoLogradouro={enderecoList[1].tipoLogradouro}
                        tipoDeResidencia={enderecoList[1].tipoResidencia}
                        cep={enderecoList[1].cep}
                        logradouro={enderecoList[1].logradouro}
                        complemento={enderecoList[1].complemento}
                        bairro={enderecoList[1].bairro}
                        numero={enderecoList[1].numero}
                        cidade={enderecoList[1].cidade}
                        uf={enderecoList[1].uf}
                    />
                )

            case 4:

                return (
                    <CrediCardDataFields
                        handleInputChange={this.handleFieldChange}
                        handleInputFocus={this.handleInputFocus}
                        name={name}
                        number={number}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                    />
                )

            default:
                return 'Unknown stepIndex';
        }
    }

    render() {

        const {
            activeStep,
            steps,
            stepButton,
            nextButtonVisibility
        } = this.state
        window.scrollTo({
                top: 0,
                behavior: "smooth"
            }
        );
        return (
            <>
                <SPS.MainDiv>
                    <Paper elevation={3}>
                        <SPS.CustomHeader>
                            <SPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </SPS.HomeLogo>
                        </SPS.CustomHeader>
                    </Paper>

                    <SPS.SignupWrapper>
                        <h4>Dados para cadastro</h4>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <div>
                            {activeStep === steps.length ? (
                                <div>
                                    <Typography component={'span'}>All steps completed</Typography>
                                    <Button onClick={this.handleReset}>Reset</Button>
                                </div>
                            ) : (

                                <div>

                                    <Typography component={'span'}>{this.getStepContent(activeStep)}</Typography>

                                    <div style={{display: (stepButton ? 'block' : 'none'), marginTop: 15}}>
                                        {activeStep === 0 ?
                                            <></>
                                            :
                                            <Button
                                                onClick={this.handleBack}
                                            >
                                                Voltar
                                            </Button>
                                        }

                                        <Button variant="contained" color="primary"
                                                onClick={this.handleNext}
                                                disabled={nextButtonVisibility}
                                                style={{display: (activeStep !== 4 ? 'inline' : 'none')}}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finalizar' : 'Proximo'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                    </SPS.SignupWrapper>

                </SPS.MainDiv>
                <Paper elevation={3}>
                    <SPS.Footer>
                        <h3>Para mais informações favor entrar em contato com qualquer uma de nossas redes
                            sociais:</h3>
                        <HPS.FooterLink href="https://www.facebook.com/" target="_blank"> <HPS.FooterLogo
                            src="https://i2.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/logo-facebook-png5.png?fit=696%2C624&ssl=1"/></HPS.FooterLink>
                        <HPS.FooterLink href="https://www.twitter.com/" target="_blank"> <HPS.FooterLogo
                            src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png"/>
                        </HPS.FooterLink>
                        <HPS.FooterLink href="https://www.instagram.com/" target="_blank"> <HPS.FooterLogo
                            src="https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png"/>
                        </HPS.FooterLink>
                        <HPS.FooterLink href="https://www.discord.com/" target="_blank"> <HPS.FooterLogo
                            src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-01.png"/>
                        </HPS.FooterLink>
                        <HPS.FooterLink href="https://www.linkedin.com/" target="_blank"> <HPS.FooterLogo
                            src="https://images.vexels.com/media/users/3/137382/isolated/preview/c59b2807ea44f0d70f41ca73c61d281d-linkedin-icon-logo-by-vexels.png"/>
                        </HPS.FooterLink>
                    </SPS.Footer>
                </Paper>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    clientes: state.cliente.clientes,
    tipoDocumento: state.cliente.tipoDocumento,
    tipoLogradouro: state.cliente.tipoLogradouro,
})

function mapDispatchToProps(dispatch) {

    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToSignupPage: () => dispatch(push(routes.SignupPage)),
        goToLoginPage: () => dispatch(push(routes.LoginPage)),
        /*getCliente: () => dispatch(getCliente()),
        getTipoDocumento: () => dispatch(getTipoDocumento()),
        getTipoLogradouro: () => dispatch(getTipoLogradouro()),
        createCliente: (clienteData) => dispatch(createCliente(clienteData)),*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)