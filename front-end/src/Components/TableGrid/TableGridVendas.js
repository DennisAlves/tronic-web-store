import * as React from 'react';
import {connect, useDispatch} from "react-redux";
import {setSelectedVendaIDAndPush} from "../../Actions/VendasActions"
import FadeIn from "react-fade-in";
import * as HPS from "../../Pages/HomePage/HomePageStyles";
import Pagination from "@material-ui/lab/Pagination";
import {useState} from "react";
import PurchaseInfo from "../PruchaseInfo/PurchaseInfo";

export function TableGridVendas(props) {

    const [rows] = useState(props.rows);
    const [page, setPage] = React.useState(1);
    const dispatch = useDispatch();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const itemsPerPage = 14;
    const noOfPages = Math.ceil(rows.length / itemsPerPage);
    const onClickButtomDetails = (id) => {
        dispatch(setSelectedVendaIDAndPush(id))
    }

    return (
        <FadeIn>
            <HPS.Mid>
                <HPS.HomePageProductWrapper>
                    {rows && rows.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((row,index) => {
                        return (
                            <PurchaseInfo
                                key={index}
                                id={row.id}
                                nomeCliente={row.nomeCliente}
                                dtVenda={row.dtVenda}
                                clienteId={row.clienteId}
                                enderecoEntrega={row.enderecoEntrega}
                                itens={row.itens}
                                total={row.total}
                                status={row.status}
                                onClickButtomDetails={() => {onClickButtomDetails(row.id)}}
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


const mapDispatchToProps = {setSelectedVendaIDAndPush}
connect(null, mapDispatchToProps)(TableGridVendas)
