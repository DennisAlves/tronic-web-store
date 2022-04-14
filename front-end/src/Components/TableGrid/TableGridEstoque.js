import * as React from 'react';
import {connect, useDispatch} from "react-redux";
import {useState} from "react";
import FadeIn from "react-fade-in";
import * as HPS from "../../Pages/HomePage/HomePageStyles";
import Pagination from "@material-ui/lab/Pagination";
import ItemInfo from "../ItemInfo/ItemInfo";

export function TableGridEstoque(props) {

    const [rows] = useState(props.rows);
    const [page, setPage] = React.useState(1);
    //const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const itemsPerPage = 5;
    const noOfPages = Math.ceil(rows.length / itemsPerPage);
    const onClickButtomDetails = () => {
        console.log("click details")
    }

    return (
        <FadeIn>
            <HPS.Mid>
                <HPS.HomePageProductWrapper>
                    {rows && rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row, index) => {
                        return (
                            <ItemInfo
                                key={index}
                                id={row.id}
                                custo={row.custo}
                                qtde={row.qtde}
                                precificacao={row.precificacao}
                                ativo={row.ativo}
                                tipo={row.tipo}
                                modelo={row.modelo}
                                fabricante={row.fabricante}
                                descricao={row.descricao}
                                dataSheet={row.dataSheet}
                                involucro={row.involucro}
                                involucroImage={row.involucroImage}
                                tipoDeTransistor={row.tipoDeTransistor}
                                correnteColetorMax={row.correnteColetorMax}
                                tensaoRupturaColetorEmissorMax={row.tensaoRupturaColetorEmissorMax}
                                saturacaoVceMax={row.saturacaoVceMax}
                                correnteCorteDoColetorMax={row.correnteCorteDoColetorMax}
                                ganhoDeCorrenteCC={row.ganhoDeCorrenteCC}
                                potenciaMax={row.potenciaMax}
                                frequenciaTransicao={row.frequenciaTransicao}
                                temperaturaOperacao={row.temperaturaOperacao}
                                tipoDeMontagem={row.tipoDeMontagem}
                                onClickButtomDetails={onClickButtomDetails}
                            />
                        )
                    })}
                </HPS.HomePageProductWrapper>
                <Pagination
                    shape="rounded"
                    count={noOfPages}
                    page={page}
                    name="page"
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    style={{margin: 5}}
                />
            </HPS.Mid>
        </FadeIn>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        //goToClientePage: (clienteID) => dispatch(setSelectedClienteIDAndPush(clienteID)),
    }
}

//connect(null, mapDispatchToProps)(TableGridEstoque)
