import moment from "moment";

export function validateNome(nome) {
    const regex = /^([a-zA-Z][\w ]{3,})$/
    if (nome === "") return false
    else return !(regex.test(nome));
}

export function validateEmail(email) {
    const validator = require("email-validator");
    if (email === "") return false
    else return !(validator.validate(email));
}

export function validateSenha(senha) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
    if (senha === "") return false
    else return !(regex.test(senha));
}

export function validateConfirmSenha(senha, testeSenha) {
    if (senha === "") return false
    else return (senha !== testeSenha)
}

export function validateNasc(dtNasc) {
    if (dtNasc === "") return false
    else return !(moment().isSameOrAfter(dtNasc));
}

export function validateTel(telefone, typeTel) {
    if (telefone === "") return false
    else return (telefone.replace(/[-_()]/g, "").length !== typeTel)
}

export function validateDoc(codigo, tipoDocumento) {
    const CPF = require('cpf');
    if (codigo === "") return false
    if (tipoDocumento === "CNH" || tipoDocumento === "RG") return (codigo.replace(/[-_()]/g, "").length < 12)
    if (tipoDocumento === "CPF") return !(CPF.isValid(codigo))
}

export function validateValidadeCnh(validade) {
    if (validade === "") return false
    else return !(moment().isSameOrBefore(validade));
}

export function validateValidadeRgAndCpf(validade) {
    if (validade === "") return false
    else return (moment().isSameOrBefore(validade));
}

export function validateDescricao(descricao) {
    if (descricao === "") return false
    else return (descricao.length < 4);
}

export function validateCep(cep) {
    if (cep === "") return false
    else return (cep.replace(/[-_()]/g, "").length < 8);
}

export function validateLogradouro(logradouro) {
    const regex = /^([a-zA-Z][\w ]{3,})$/;
    if (logradouro === "") return false
    else return !(regex.test(logradouro));
}

export function validateNumeroEndereco(numero) {
    const regex = /^(\d+)$/;
    if (numero === "") return false
    else return !(regex.test(numero));
}

export function validateBairro(bairro) {
    const regex = /^([a-zA-Z][\w ]{3,})$/;
    if (bairro === "") return false
    else return !(regex.test(bairro));
}

export function validateCidade(cidade) {
    const regex = /^([a-zA-Z][\w ]{3,})$/;
    if (cidade === "") return false
    else return !(regex.test(cidade));
}

export function validateCardDate(data) {
    const minMonth = (new Date().getMonth() + 1)
    const minYear = (new Date().getFullYear() - 2000)
    if (data === "") return false
    if (parseInt(data.slice(0, 2)) > 12) return true
    if (parseInt(data.slice(-2)) === minYear && parseInt(data.slice(0, 2)) <= minMonth) return true
    else return (parseInt(data.slice(-2)) < minYear)
}

export function validateCvc (cvc) {
    if (cvc === "") return false
    else return (cvc.replace(/[-_.]/g, "").length < 3)
}

export function AdressValidation(endereco) {

    return !!(endereco.descricaoEndereco &&
        endereco.tipoDeResidencia &&
        endereco.cep &&
        endereco.tipoLogradouro &&
        endereco.logradouro &&
        endereco.numero &&
        endereco.bairro &&
        endereco.cidade &&
        endereco.uf);
}

export function CardValidation( name, number, expiry, cvc ) {

    return !!(
        name &&
        number &&
        expiry &&
        cvc
    );
}





