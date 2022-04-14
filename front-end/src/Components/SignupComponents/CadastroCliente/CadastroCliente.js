import React from "react";
import * as CCS from "../CadastroCliente/CadastroClienteStyles";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputMask from "react-input-mask";
import moment from 'moment'
import FadeIn from "react-fade-in";
import * as Validate from"../../Validations/Validations"
import * as HelperText from "../../HelperText/HelperText";

export default function ClientDataFields(props) {

    moment.locale('pt-br');

    let typeTel, maskFormat
    if (props.tipoTelefone === "" || props.tipoTelefone !== "Celular") {
        typeTel = 10
        maskFormat = "(99)9999-9999"
    } else {
        typeTel = 11
        maskFormat = "(99)99999-9999"
    }
    //const CPF = require('cpf');
    const tipoDeTelefoneList = ["Residencial", "Celular", "Comercial", "Recado"]
    const tipoGeneroList = ["Masculino", "Feminino", "Não declarado"]


    return (
        <FadeIn>
            <CCS.ClientWrapper>
                <CCS.ClientFieldsWrapper>

                    <TextField style={{minWidth: 270}}
                               onChange={props.handleFieldChange}
                               name="nome"
                               type="text"
                               label="Nome"
                               required
                               value={props.nome.replace(/\d+/g, "")}
                               error={Validate.validateNome(props.nome)}
                               helperText={HelperText.helperTextNome(props.nome)}
                    />

                    <TextField style={{minWidth: 270}}
                               onChange={props.handleFieldChange}
                               name="email"
                               type="email"
                               label="E-mail"
                               required
                               isemail="true"
                               value={props.email}
                               error={Validate.validateEmail(props.email) }
                               helperText={HelperText.helperTextEmail(props.email)}
                    />

                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onMouseDown={props.handleMouseDownPassword}
                                        onMouseUp={props.handleMouseDownPassword}
                                    >
                                        {props.mostrarSenha ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        style={{minWidth: 270, maxWidth: 270}}
                        id="senha"
                        name="senha"
                        label="Senha"
                        required
                        value={props.senha}
                        type={props.mostrarSenha ? "text" : "password"}
                        onChange={props.handleFieldChange}
                        error={Validate.validateSenha(props.senha)}
                        helperText={HelperText.helperTextSenha(props.senha)}
                    />

                    <TextField
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onMouseDown={props.handleMouseDownPassword}
                                        onMouseUp={props.handleMouseDownPassword}
                                    >
                                        {props.mostrarSenha ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        style={{minWidth: 270}}
                        onChange={props.handleFieldChange}
                        name="testeSenha"
                        type={props.mostrarSenha ? "text" : "password"}
                        label="Digite novamente a senha"
                        required
                        value={props.testeSenha}
                        error={Validate.validateConfirmSenha(props.senha, props.testeSenha)}
                        helperText={props.senha === props.testeSenha ? "" : "senhas divergentes"}

                    />

                    <TextField style={{minWidth: 270}}
                               onChange={props.handleFieldChange}
                               name="dtNascimento"
                               type="date"
                               label="Data de Nascimento"
                               value={props.dtNascimento}
                               required
                               error={Validate.validateNasc(props.dtNascimento)}
                               helperText={HelperText.helperTextDtNasc(props.dtNascimento)}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                               InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
                    />

                    <FormControl style={{minWidth: 270}}>
                        <InputLabel>Genero</InputLabel>
                        <Select
                            name="genero"
                            label="Genero"
                            value={props.genero}
                            onChange={props.handleFieldChange}
                            error={!props.genero && props.genero !== ""}
                        >
                            {tipoGeneroList.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>
                                        <div key={index}>{item}</div>
                                    </MenuItem>
                                );
                            })}

                        </Select>

                    </FormControl>

                    <FormControl style={{minWidth: 270}}>
                        <InputLabel>Tipo de telefone</InputLabel>
                        <Select
                            name="tipoTelefone"
                            value={props.tipoTelefone}
                            onChange={props.handleFieldChange}
                            required
                            error={!props.tipoTelefone && props.tipoTelefone !== ""}
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
                        value={props.telefone}
                        onChange={props.handleFieldChange}
                    >
                        <TextField
                            style={{minWidth: 270}}
                            name="telefone"
                            label="Telefone"
                            type="tel"
                            required
                            error={Validate.validateTel(props.telefone, typeTel)}
                            helperText={props.telefone.replace(/[-_()]/g, "").length !== typeTel && props.telefone !== "" ? "o numero digitado não está correto" : ""}
                        />
                    </InputMask>
                </CCS.ClientFieldsWrapper>
            </CCS.ClientWrapper>
        </FadeIn>
    )

}
/*
<InputMask
                    mask="999.999.999-99"
                    value={props.cpf}
                    onChange={props.handleFieldChange}
                >
                    <TextField style={{minWidth: 270}}
                               name="cpf"
                               type="text"
                               label="CPF"
                               error={!CPF.isValid(props.cpf) && props.cpf !== "___.___.___-__" && props.cpf !== ""}
                               helperText={!CPF.isValid(props.cpf) && props.cpf !== "___.___.___-__" && props.cpf !== "" ? "CPF invalido" : ""}

                    />

                </InputMask>
*/