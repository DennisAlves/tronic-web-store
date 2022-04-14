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
        color: "#ff1b1c"
    }
})(Typography);
const GreenTextTypography = withStyles({
    root: {
        color: "#00CC66"
    }
})(Typography);

/**
 *
 * @param props {id,dtCadastro,nome,dtNascimento,genero,email,tipoCliente,ativo,qtdeEnderecos,qtdeTelefone,qtdeCartoes,qtdeDocumentos,onClickButtomEdit,onClickButtomDeactivate}
 * @returns
 * @constructor
 */
export default function ClientInfo(props) {

    return (
        <Card>

            <CardContent>
                <Typography style={{width: 200,marginBottom:20}} align={"left"} component="div">
                    <Tooltip title={props.id}>
                        <Typography gutterBottom variant="caption" component="p">
                            Id: {props.id.substring(0,20)}...
                        </Typography>
                    </Tooltip>

                    <Typography variant="caption" component="p">
                        Nome: {props.nome}
                    </Typography>

                    <Typography variant="caption" component="p">
                        Email: {props.email}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="p">
                        Data de Nascimento: {moment(props.dtNascimento).format("DD/MM/YYYY")}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="p">
                        Genero: {props.genero}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="p">
                        Tipo de Cliente: {props.tipoCliente}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="p">
                        Quantidade de Endereços: {props.qtdeEnderecos}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="p">
                        Quantidade de Telefones: {props.qtdeTelefone}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="p">
                        Quantidade de Cartões: {props.qtdeCartoes}
                    </Typography>

                    <Typography gutterBottom variant="caption" component="p">
                        Quantidade de Documentos: {props.qtdeDocumentos}
                    </Typography>
                </Typography>

                {props.ativo ?
                    <GreenTextTypography> Ativo </GreenTextTypography>
                    :
                    <RedTextTypography> Desativado </RedTextTypography>
                }
            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" color="primary" style={{fontSize: 10}} onClick={props.onClickButtomEdit}>
                    Editar
                </Button>
                <Button size="small" color="primary" style={{fontSize: 10}} onClick={props.onClickButtomDeactivate}>
                    Desativar
                </Button>
            </CardActions>
        </Card>
    )
}