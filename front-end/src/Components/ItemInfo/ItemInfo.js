import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as IIS from './ItemInfoStyles'
import CardMedia from "@material-ui/core/CardMedia";

const RedTextTypography = withStyles({
    root: {
        color: "#ac1111",
    }
})(Typography);
const GreenTextTypography = withStyles({
    root: {
        color: "#018c45",
    }
})(Typography);


/**
 *
 * @param props {
 * id,
 * custo,
 * qtde,
 * precificacao,
 * ativo,
 * tipo,
 * modelo,
 * fabricante,
 * descricao,
 * dataSheet,
 * involucro,
 * involucroImage,
 * tipoDeTransistor,
 * correnteColetorMax,
 * tensaoRupturaColetorEmissorMax,
 * saturacaoVceMax,
 * correnteCorteDoColetorMax,
 * ganhoDeCorrenteCC,
 * potenciaMax,
 * frequenciaTransicao,
 * temperaturaOperacao,
 * tipoDeMontagem
 * }
 * @returns
 * @constructor
 */
export default function ItemInfo(props) {

    return (
        <Card>
            <IIS.MainInfos>
                <IIS.MainImageInfos>
                    <CardMedia
                        style={{objectFit: 'contain', marginTop: 10}}
                        component="img"
                        alt={props.modelo}
                        height="80"
                        image={props.involucroImage}
                        title={props.modelo}
                    />
                </IIS.MainImageInfos>
                <IIS.MainTextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Id: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.id}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Modelo: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.modelo}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Fabricante: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.fabricante}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p" >
                            <strong>Classificação: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.tipo}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Descricao: </strong>
                        </Typography>
                        <Typography variant="caption" component="p">
                            {props.descricao}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Custo: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.custo}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Margem de Lucro: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.precificacao}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Quantidade: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.qtde}
                        </Typography>
                    </IIS.TextInfos>
                    <IIS.TextInfos>
                        <Typography variant="caption" component="p">
                            <strong>Invólucro: </strong>
                        </Typography>
                        <Typography variant="caption" component="p" style={{marginLeft:3}}>
                            {props.involucro}
                        </Typography>
                    </IIS.TextInfos>
                </IIS.MainTextInfos>
                <IIS.StatusInfo>
                    <IIS.StatusTexInfo>
                        {props.ativo ?
                            <div>
                                <Typography variant="subtitle1" color="textPrimary">
                                    status
                                </Typography>
                                <GreenTextTypography variant="subtitle1">Ativo</GreenTextTypography>
                            </div>
                            :
                            <div>
                                <Typography variant="subtitle1" color="textPrimary">
                                    status
                                </Typography>
                                <RedTextTypography variant="subtitle1">Desativado</RedTextTypography>
                            </div>
                        }
                    </IIS.StatusTexInfo>
                    <CardActions style={{justifyContent: 'center'}}>
                        <Button size="small" color="primary" style={{fontSize: 10}} onClick={props.onClickButtomDetails}>
                            Ver Detalhes
                        </Button>
                    </CardActions>
                </IIS.StatusInfo>
            </IIS.MainInfos>
        </Card>
    )
}