import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip"

const RedTextTypography = withStyles({
    root: {
        color: "#ac1111",
        marginLeft: 5,
    }
})(Typography);
const GreenTextTypography = withStyles({
    root: {
        color: "#018c45",
        marginLeft: 5,
    }
})(Typography);
const YellowTextTypography = withStyles({
    root: {
        color: "#beb527",
        marginLeft: 5,
    }
})(Typography);


/**
 *
 * @param props {id,dtVenda,nomeCliente,clienteId,enderecoEntrega,itens,pagamento,total,status}
 * @returns
 * @constructor
 */
export default function PurchaseInfo(props) {

    return (
        <Card>

            <CardContent>
                <Typography style={{width: 220,marginBottom:20}} align={"left"} component="div">
                    <Tooltip title={props.id}>
                        <Typography gutterBottom variant="caption" component="p">
                            Id: {props.id.substring(0,20)}...
                        </Typography>
                    </Tooltip>

                    <Typography variant="caption" component="p">
                        Data de Venda: {moment(props.dtVenda).format("DD/MM/YYYY")}
                    </Typography>

                    <Tooltip title={props.clienteId}>
                        <Typography gutterBottom variant="caption" component="p">
                            Id do Cliente: {props.clienteId.substring(0,10)}...
                        </Typography>
                    </Tooltip>

                    <Tooltip title={props.nomeCliente}>
                        {props.nomeCliente.length > 15 ?
                            <Typography gutterBottom variant="caption" component="p">
                                Nome do Cliente: {props.nomeCliente.substring(0,15)}...
                            </Typography>
                            :
                            <Typography gutterBottom variant="caption" component="p">
                                Nome do Cliente: {props.nomeCliente}
                            </Typography>
                        }

                    </Tooltip>

                    <Typography gutterBottom variant="caption" component="p">
                        Total: {props.total}
                    </Typography>

                </Typography>

                {
                    props.status === "APROVADA" || props.status === "TROCADO" || props.status === "ENTREGUE" ?
                        <div>
                            <Typography variant="subtitle1" color="textPrimary" align="center" gutterBottom>
                                status
                            </Typography>
                            <GreenTextTypography variant="subtitle1"> {props.status}</GreenTextTypography>
                        </div>
                        :
                        <></>
                }
                {
                    props.status === "REPROVADA" ?
                        <div>
                            <Typography variant="subtitle1" color="textPrimary" align="center" gutterBottom>
                                status
                            </Typography>
                            <RedTextTypography variant="subtitle1"> {props.status}</RedTextTypography>
                        </div>
                        :
                        <></>
                }
                {
                    props.status === "EM TRANSPORTE" || props.status === "EM TROCA" ?
                        <div>
                            <Typography variant="subtitle1" color="textPrimary" align="center" gutterBottom>
                                status
                            </Typography>
                            <YellowTextTypography variant="subtitle1"> {props.status}</YellowTextTypography>
                        </div>
                        :
                        <></>
                }
            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" color="primary" style={{fontSize: 10}} onClick={props.onClickButtomDetails}>
                    Ver Detalhes
                </Button>
            </CardActions>
        </Card>
    )
}