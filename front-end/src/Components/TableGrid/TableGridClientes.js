import * as React from 'react';
import {useState} from "react";
import ClientInfo from "../DataInfo/ClientInfo";
import FadeIn from "react-fade-in";
import * as HPS from "../../Pages/HomePage/HomePageStyles";
import Pagination from "@material-ui/lab/Pagination";

export default function TableGridClientes(props) {


    const [rows] = useState(props.rows);
    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const itemsPerPage = 14;
    const noOfPages = Math.ceil(rows.length / itemsPerPage);
    const onClickButtomEdit = () => {
        console.log("click edit")
    }
    const onClickButtomDeactivate = () => {
        console.log("click deactivate")
    }

    return (
        <FadeIn>
            <HPS.Mid>
                <HPS.HomePageProductWrapper>
                    {rows && rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row) => {
                        return (
                            <ClientInfo
                                id={row.id}
                                dtCadastro={row.dtCadastro}
                                nome={row.nome}
                                dtNascimento={row.dtNascimento}
                                genero={row.genero}
                                email={row.email}
                                tipoCliente={row.tipoCliente}
                                ativo={row.ativo}
                                qtdeEnderecos={row.qtdeEnderecos}
                                qtdeTelefone={row.qtdeTelefone}
                                qtdeCartoes={row.qtdeCartoes}
                                qtdeDocumentos={row.qtdeDocumentos}
                                onClickButtomEdit={onClickButtomEdit}
                                onClickButtomDeactivate={onClickButtomDeactivate}
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
                    style={{margin:5}}
                />
            </HPS.Mid>
        </FadeIn>
    );
}

