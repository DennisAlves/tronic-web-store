import moment from "moment";
import React from "react";
import Typography from "@material-ui/core/Typography";

export function helperTextNome(nome) {
    const regx = /^([a-zA-Z][\w ]{3,})$/
    if (nome === "") return ""
    else if (!(regx.test(nome))) return "o nome deve ter pelo menos 4 letras.";
}

export function helperTextEmail(email) {
    const validator = require("email-validator");
    if (email === "") return ""
    else if (!(validator.validate(email))) return "Email inválido";
}

export function helperTextDtNasc(dtNasc) {
    if (dtNasc === "") return ""
    else if (!moment().isSameOrAfter(dtNasc)) return "É necessário uma data de nascimento valida.";
}

export function helperTextDoc(codigo, tipoDocumento) {
    const CPF = require('cpf');
    if (codigo === "") return ""
    if ((tipoDocumento === "CNH" || tipoDocumento === "RG") && codigo.replace(/[-_()]/g, "").length < 12) return "Numero inválido."
    if (tipoDocumento === "CPF" && !(CPF.isValid(codigo))) return "CPF inválido"
}

export function helperTextValidadeCnh(validade) {
    if (validade === "") return ""
    else if (!moment().isSameOrBefore(validade)) return "É necessária uma data de validade valida..";
}

export function helperTextValidadeRgAndCpf(validade) {
    if (validade === "") return ""
    else if (moment().isSameOrBefore(validade)) return "É necessária uma data de validade valida..";
}

export function helperTextDescricao(descricao) {
    if (descricao === "") return ""
    else if (descricao.length < 4) return "a descrição deve ter pelo menos 4 letras.";
}

export function helperTextSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
    if (senha === "") return ""
    else if (!(regex.test(senha)))
        return (
            <Typography variant="caption" style={{ wordWrap: "break-word" }}>
                A senha deve ter no minimo 8 caracteres,
                ter letras maiúsculas e minúsculas além de
                conter caracteres especiais
            </Typography>

        )
}

export function helperTextCep(cep) {
    if (cep === "") return ""
    else if (cep.replace(/[-_()]/g, "").length < 8) return "o cep digitado não está correto.";
}

export function helperTextLogradouro(logradouro) {
    const regx = /^([a-zA-Z][\w ]{4,})$/
    if (logradouro === "") return ""
    else if (!(regx.test(logradouro))) return "o logradouro deve ter pelo menos 3 letras.";
}

export function helperTextNumeroEndereco(numero) {
    const regx = /^([a-zA-Z][\w ]{4,})$/
    if (numero === "") return ""
    else if (!(regx.test(numero))) return "digite um numero.";
}

export function helperTextBairro(bairro) {
    const regx = /^([a-zA-Z][\w ]{3,})$/
    if (bairro === "") return ""
    else if (!(regx.test(bairro))) return "o nome do bairro deve ter pelo menos 3 letras.";
}

export function helperTextCidade(cidade) {
    const regx = /^([a-zA-Z][\w ]{3,})$/
    if (cidade === "") return ""
    else if (!(regx.test(cidade))) return "o nome do cidade deve ter pelo menos 3 letras.";
}

export function helperTextCardDate(data) {
    const minMonth = (new Date().getMonth() + 1)
    const minYear = (new Date().getFullYear() - 2000)
    if (data === "") return ""
    if (parseInt(data.slice(0, 2)) > 12) return "Data inválida."
    if (parseInt(data.slice(-2)) === minYear && parseInt(data.slice(0, 2)) <= minMonth) return "Data inválida."
    if ( parseInt(data.slice(-2)) < minYear) return "Data inválida."
}
 export function helperTextCvc(cvc) {
     if (cvc === "") return ""
     if (cvc.replace(/[-_.]/g, "").length < 3) return "cvc inválido"
 }