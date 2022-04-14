import React from "react";
import * as CDS from "../CadastroDocumento/CadastroDocumentoStyle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";
import moment from "moment";
import FadeIn from "react-fade-in";
import * as Validate from"../../Validations/Validations"
import * as HelperText from "../../HelperText/HelperText";

export default function DocumentoDataFields(props) {

    const tipoDocumentoList = props.tipoDocumentoList

    return (
        <FadeIn>
            <CDS.DocumentoWrapper>
                <CDS.DocumentoFieldsWrapper>
                    <h5>Documento</h5>

                    <FormControl style={{minWidth: 270}}>
                        <InputLabel>Documento</InputLabel>
                        <Select
                            name="tipoDocumento"
                            value={props.tipoDocumento}
                            onChange={props.handleFieldChange}
                            error={!props.tipoDocumento && props.tipoDocumento !== ""}
                        >
                            {tipoDocumentoList && tipoDocumentoList.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item}>
                                        <div key={index}>{item}</div>
                                    </MenuItem>
                                );
                            })}

                        </Select>
                    </FormControl>
                    {props.tipoDocumento === "CNH" ?
                        <div>
                            <TextField style={{minWidth: 270}}
                                       onChange={props.handleFieldChange}
                                       name="codigo"
                                       type="text"
                                       label="Código"
                                       required
                                       value={props.codigo}
                                       error={Validate.validateDoc(props.codigo, props.tipoDocumento)}
                                       helperText={HelperText.helperTextDoc(props.codigo, props.tipoDocumento)}
                            />
                            <TextField style={{minWidth: 270}}
                                       onChange={props.handleFieldChange}
                                       name="validade"
                                       type="date"
                                       label="validade"
                                       value={props.validade}
                                       required
                                       error={Validate.validateValidadeCnh(props.validade)}
                                       helperText={HelperText.helperTextValidadeCnh(props.validade)}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                                       InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
                            />
                        </div>
                        :
                        <div>
                            {props.tipoDocumento === "" ?
                                <></>
                                :
                                <div>
                                    <TextField style={{minWidth: 270}}
                                               onChange={props.handleFieldChange}
                                               name="codigo"
                                               type="text"
                                               label="Código"
                                               required
                                               value={props.codigo}
                                               error={Validate.validateDoc(props.codigo, props.tipoDocumento)}
                                               helperText={HelperText.helperTextDoc(props.codigo, props.tipoDocumento)}
                                    />
                                    <TextField style={{minWidth: 270}}
                                               onChange={props.handleFieldChange}
                                               name="validade"
                                               type="date"
                                               label="Data de Emissão"
                                               value={props.validade}
                                               required
                                               error={Validate.validateValidadeRgAndCpf(props.validade)}
                                               helperText={HelperText.helperTextValidadeRgAndCpf(props.validade)}
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}
                                               InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
                                    />
                                </div>
                            }
                        </div>
                    }
                </CDS.DocumentoFieldsWrapper>
            </CDS.DocumentoWrapper>
        </FadeIn>
    )

}
