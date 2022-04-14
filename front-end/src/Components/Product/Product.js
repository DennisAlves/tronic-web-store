import React from 'react';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 185,
        margin: 2,
    },

});
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
 * @param props {onClickProduct,alt,image,title,modelText,manufacturer,value,onClickButtom,active}
 * @returns
 * @constructor
 */
export default function Product(props) {
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardActionArea onClick={props.onClickProduct}>
                <CardMedia
                    style={{ objectFit: 'contain' ,marginTop: 10 }}
                    component="img"
                    alt={props.alt}
                    height="240"
                    image={props.image}
                    title={props.title}
                />
                <CardContent style={{height: 125}}>
                    {props.modelText && props.modelText.length > 35 ?
                        <Typography gutterBottom variant="subtitle2" component="p" style={{ height: 35}}>
                            {props.modelText.substring(0,35)}...
                        </Typography>
                        :
                        <Typography gutterBottom variant="subtitle2" component="p" style={{ height: 35}}>
                            {props.modelText}
                        </Typography>
                    }
                    {props.manufacturer && props.manufacturer.length > 20 ?
                        <Typography variant="caption" color="textSecondary" component="p">
                            {props.manufacturer.substring(0,20)}...
                        </Typography>
                        :
                        <Typography variant="caption" color="textSecondary" component="p">
                            {props.manufacturer}
                        </Typography>
                    }


                    {props.active ?
                        <GreenTextTypography> Em Estoque</GreenTextTypography>
                        :
                        <RedTextTypography> Sem Estoque</RedTextTypography>
                    }

                    <Typography variant="caption" color="textPrimary" component="p">
                        R$ {props.value}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{justifyContent: 'center'}}>

                <Button disabled={!props.active} size="small" color="primary" style={{fontSize: 10}} onClick={props.onClickButtom}>
                    Colocar no Carrinho
                </Button>
            </CardActions>
        </Card>
    )
}