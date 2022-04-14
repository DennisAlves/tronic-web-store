import React from 'react';
import * as CCS from "./CadastroCartaoStyles";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";
import FadeIn from "react-fade-in";
import moment from "moment";
import Payment from "payment"
import * as Validate from"../../Validations/Validations"
import * as HelperText from "../../HelperText/HelperText";

moment.locale('pt-br');

export default function CrediCardDataFields(props) {

    return (
        <FadeIn>
            <CCS.CreditCardWrapper>
                <Cards
                    locale={{valid: "Valido até"}}
                    placeholders={{name: "Nome"}}
                    cvc={props.cvc}
                    expiry={props.expiry}
                    focused={props.focused}
                    name={props.name}
                    number={props.number.replace(/[-_.]/g, "")}
                />
                <CCS.CreditCardFieldsWrapper>
                    <CCS.CreditCardLineWrapper>
                        <InputMask
                            mask={"9999.9999.9999.9999"}
                            value={props.number}
                            onChange={props.handleInputChange}
                            onKeyUp={props.handleInputChange}
                            onFocus={props.handleInputFocus}
                        >
                            <TextField
                                type="tel"
                                name="number"
                                placeholder="Numero do Cartão *"
                                required
                                error={!Payment.fns.validateCardNumber(props.number.replace(/[-_.]/g, "")) &&
                                props.number !== ""}
                                helperText={!Payment.fns.validateCardNumber(props.number.replace(/[-_.]/g, "")) &&
                                props.number !== "" ? "o numero digitado é invalido" : ""}
                            />
                        </InputMask>
                    </CCS.CreditCardLineWrapper>
                    <CCS.CreditCardLineWrapper>
                        <TextField
                            type="text"
                            name="name"
                            placeholder="Nome *"
                            value={props.name.replace(/\d+/g, "")}
                            onKeyUp={props.handleInputChange}
                            onFocus={props.handleInputFocus}
                            onChange={props.handleInputChange}
                            required
                            error={props.name.length < 5 && props.name !== ""}
                            helperText={props.name.length < 5 && props.name !== "" ? "o nome digitado é invalido" : ""}
                        />
                    </CCS.CreditCardLineWrapper>
                    <CCS.CreditCardLineWrapper>
                        <CCS.CreditCardLineWrapper>
                            <InputMask
                                mask={"99/99"}
                                value={props.expiry}
                                onKeyUp={props.handleInputChange}
                                onFocus={props.handleInputFocus}
                                onChange={props.handleInputChange}
                            >
                                <TextField
                                    type="text"
                                    name="expiry"
                                    placeholder="Validade *"
                                    error={Validate.validateCardDate(props.expiry)}
                                    helperText={HelperText.helperTextCardDate(props.expiry)}
                                    required
                                />
                            </InputMask>
                        </CCS.CreditCardLineWrapper>
                    </CCS.CreditCardLineWrapper>
                    <CCS.CreditCardLineWrapper>
                        <InputMask
                            mask={"999"}
                            value={props.cvc.replace(/[-_.]/g, "")}
                            onChange={props.handleInputChange}
                            onKeyUp={props.handleInputChange}
                            onFocus={props.handleInputFocus}
                        >
                            <TextField
                                type="tel"
                                name="cvc"
                                placeholder="CVC *"
                                required
                                error={Validate.validateCvc(props.cvc)}
                                helperText={HelperText.helperTextCvc(props.cvc)}
                            />
                        </InputMask>
                    </CCS.CreditCardLineWrapper>
                </CCS.CreditCardFieldsWrapper>
            </CCS.CreditCardWrapper>

        </FadeIn>

    )
}