import React, {Component} from "react";
import * as PPS from "./ProdutPageStyle";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../../Router';
import Paper from '@material-ui/core/Paper';
import * as PD from "../../Components/ProductDetails/ProductDetailsStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import {setEstoque} from "../../Actions/EstoqueActions";
import {setCarrinho} from "../../Actions/VendasActions";
import {withStyles} from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import * as HPS from "../HomePage/HomePageStyles";
import FadeIn from "react-fade-in";

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

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            qtdeCarrinho: "",
            qtde: "",
            frete: 21.00,
            carrinho: this.props.carrinho,
            qtdeCarrinhoTotal: 0,
        };
    }

    async componentDidMount() {
        let itemData = ""
        let qtdeCarrinho = 0
        if (!this.props.product.productId) {
            this.props.goToHomePage()
        }

        this.props.estoque.forEach(item => {
            if (item.produto.id === this.props.product.productId) {
                itemData = item
            }
        })

        this.state.carrinho.forEach(item => {
            this.state.qtdeCarrinhoTotal += item.qtde
            if (item.id === this.props.product.productId) {
                qtdeCarrinho = item.qtde
            }
        })
        await this.setState({item: itemData, qtdeCarrinho: qtdeCarrinho})
    }

    menuItem = () => {
        let arr = [];

        for (let i = 1; i <= this.state.item.produto.qtde; i++) {
            arr.push(<MenuItem style={{justifyContent: "Center"}} key={i} value={i}> {i} </MenuItem>)
        }

        return arr;
    };
    handleSelectChange = event => {
        let qtdeItems = event.target.value
        this.setState({qtde: qtdeItems})


    };

    handleAddItem = async () => {
        let copyEstoque = this.props.estoque
        let carrinho = this.props.carrinho;
        let qtde = this.state.qtde
        let itemExist = false

        carrinho.forEach(item => {
            if (item.id === this.props.product.productId) {
                itemExist = true
            }
        })
        if (itemExist) {
            carrinho.forEach(item => {
                if (item.id === this.props.product.productId) {
                    item.qtde += qtde
                    copyEstoque.forEach(elemento => {
                        if (elemento.produto.id === this.props.product.productId) {
                            elemento.produto.qtde -= qtde
                        }
                    })

                }
            })
        } else {
            carrinho.push({id: this.props.product.productId, qtde: qtde})
            copyEstoque.forEach(item => {
                if (item.produto.id === this.props.product.productId) {
                    item.produto.qtde -= qtde
                }
            })
        }
        /*for (let i = 0; i < this.props.estoque.length; i++) {
            if (copyEstoque[i].produto.id === this.props.produto.productId) {
                let newItem = {
                    cliente_id: "00d6c7e9-515e-4913-8dc7-ffdd26e4446c",
                    id: copyEstoque[i].produto.id,
                    modelo: copyEstoque[i].produto.transistor.modelo,
                    qtde: qtde,
                    preco: copyEstoque[i].produto.custo + (copyEstoque[i].produto.custo * copyEstoque[i].produto.precificacao),
                    ativo: copyEstoque[i].produto.ativo
                }
                await this.props.updateCarrinho(newItem)
            }
        }*/
        console.log("entrou")
        this.props.setEstoque(copyEstoque)
        this.props.setCarrinho(carrinho)
        this.props.goToHomePage()
    }
    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    validarAtivo = () => {
        if (this.state.item.produto.qtde === 0) {
            return false
        } else {
            return this.state.item.produto.ativo
        }
    }

    render() {
        const {qtde, item, frete} = this.state

        return (
            <>
                {item ?
                    <FadeIn>
                        <PPS.MainDiv>
                            <Paper elevation={3}>
                                <PPS.CustomHeader>
                                    <PPS.HomeLogoWraper>
                                        <PPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o
                                            header</h3>
                                        </PPS.HomeLogo>
                                    </PPS.HomeLogoWraper>
                                    <PPS.HeaderLinks>
                                        <PPS.HeaderLink onClick={this.props.goToLoginPage}> Entrar </PPS.HeaderLink>
                                        <PPS.HeaderLink> Devoluções e Pedidos </PPS.HeaderLink>
                                        <PPS.HeaderLink> <Badge badgeContent={this.state.qtdeCarrinhoTotal}
                                                                onClick={this.props.goToCartPage} color="secondary">
                                            <ShoppingCartIcon/>
                                        </Badge></PPS.HeaderLink>
                                    </PPS.HeaderLinks>
                                </PPS.CustomHeader>
                            </Paper>
                            <PPS.ProductPageWrapper>
                                <PD.ProductDetailsMainDiv>
                                    <PD.ProductDetailsImageDiv src={item.produto.transistor.involucroImage}/>
                                    <PD.ProductDetails>
                                        <PD.ProductDetailsContentDiv>
                                            <Typography variant="h3" color="textPrimary" gutterBottom>
                                                {item.produto.transistor.modelo}
                                            </Typography>
                                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                                Fabricante: {item.produto.transistor.fabricante}
                                            </Typography>

                                            <Typography variant="subtitle1" color="textPrimary"
                                                        style={{marginTop: 15}}
                                                        align="left"
                                                        gutterBottom>
                                                Descrição: {item.produto.transistor.descricao}
                                            </Typography>
                                        </PD.ProductDetailsContentDiv>

                                        <PD.ProductDetailsInfoDiv>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Tipo de Transistor: {item.produto.transistor.tipoDeTransistor}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Corrente Maxima do
                                                Coletor: {item.produto.transistor.correnteColetorMax}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Tensao de Ruptura do Coletor
                                                Emissor: {item.produto.transistor.tensaoRupturaColetorEmissorMax}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                saturacao Vce (Máx): {item.produto.transistor.saturacaoVceMax}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Corrente de Corte do coletor
                                                (Máx): {item.produto.transistor.correnteCorteDoColetorMax}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Ganho de corrente CC (hFE) (mín.) para Ic,
                                                Vce: {item.produto.transistor.ganhoDeCorrenteCC}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Potência (Máx): {item.produto.transistor.potenciaMax}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Frequência de
                                                Transição: {item.produto.transistor.frequenciaTransicao}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Temperatura de
                                                Operação: {item.produto.transistor.temperaturaOperacao}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Tipo de montagem: {item.produto.transistor.tipoDeMontagem}
                                            </Typography>
                                            <Typography variant="subtitle1" color="textPrimary" align="left"
                                                        gutterBottom>
                                                Fichas técnicas: {item.produto.transistor.dataSheet}
                                            </Typography>
                                        </PD.ProductDetailsInfoDiv>
                                    </PD.ProductDetails>
                                    <PD.ProductDetailsCardDiv>
                                        <Card>
                                            <CardContent style={{width: 250}}>
                                                <Typography color="textSecondary" gutterBottom>
                                                    Valor unitario:
                                                    R${(item.produto.custo + (item.produto.custo * item.produto.precificacao)).toFixed(2)}
                                                </Typography>
                                                <Typography variant="h5" component="h2">
                                                </Typography>

                                                {this.validarAtivo() ?
                                                    <GreenTextTypography>
                                                        Em Estoque
                                                    </GreenTextTypography>
                                                    :
                                                    <RedTextTypography>
                                                        Sem Estoque
                                                    </RedTextTypography>

                                                }

                                                <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                                                    Frete: R${frete}
                                                </Typography>

                                                {qtde > 0 ?
                                                    <Typography color="textSecondary" gutterBottom>
                                                        Total:
                                                        R${(((item.produto.custo + (item.produto.custo * item.produto.precificacao)) * qtde) + frete).toFixed(2)}
                                                    </Typography>
                                                    :
                                                    ""
                                                }
                                                <FormControl variant="outlined" style={{minWidth: 140}}>
                                                    <InputLabel>Quantidade</InputLabel>
                                                    <Select
                                                        disabled={!this.validarAtivo()}
                                                        value={qtde}
                                                        onChange={this.handleSelectChange}
                                                        label="quantidade"
                                                    >
                                                        {this.menuItem()}

                                                    </Select>
                                                </FormControl>

                                            </CardContent>
                                            <CardActions align="center" style={{justifyContent: "Center"}}>
                                                {qtde ?
                                                    <Button color="primary" onClick={this.handleAddItem}
                                                            disabled={!this.validarAtivo()} size="small">Adicionar
                                                        ao Carrinho</Button>
                                                    :
                                                    <Button disabled color="primary" onClick={this.handleAddItem}
                                                            size="small">Adicionar
                                                        ao Carrinho</Button>
                                                }
                                            </CardActions>
                                        </Card>
                                    </PD.ProductDetailsCardDiv>
                                </PD.ProductDetailsMainDiv>
                            </PPS.ProductPageWrapper>

                            <Paper elevation={3}>
                                <PPS.Footer>
                                    <h3>Para mais informações favor entrar em contato com qualquer uma de nossas
                                        redes
                                        sociais:</h3>
                                    <HPS.FooterLink href="https://www.facebook.com/" target="_blank">
                                        <HPS.FooterLogo
                                            src="https://i2.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/logo-facebook-png5.png?fit=696%2C624&ssl=1"/></HPS.FooterLink>
                                    <HPS.FooterLink href="https://www.twitter.com/" target="_blank"> <HPS.FooterLogo
                                        src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png"/>
                                    </HPS.FooterLink>
                                    <HPS.FooterLink href="https://www.instagram.com/" target="_blank">
                                        <HPS.FooterLogo
                                            src="https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png"/>
                                    </HPS.FooterLink>
                                    <HPS.FooterLink href="https://www.discord.com/" target="_blank"> <HPS.FooterLogo
                                        src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-01.png"/>
                                    </HPS.FooterLink>
                                    <HPS.FooterLink href="https://www.linkedin.com/" target="_blank">
                                        <HPS.FooterLogo
                                            src="https://images.vexels.com/media/users/3/137382/isolated/preview/c59b2807ea44f0d70f41ca73c61d281d-linkedin-icon-logo-by-vexels.png"/>
                                    </HPS.FooterLink>
                                </PPS.Footer>
                            </Paper>
                        </PPS.MainDiv>
                    </FadeIn>
                    :
                    <></>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
    product: state.estoque.productId,
    carrinho: state.vendas.carrinho,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        setCarrinho: (carrinho) => dispatch(setCarrinho(carrinho)),
        setEstoque: (estoque) => dispatch(setEstoque(estoque)),
        /*goToCartPage: () => dispatch(push(routes.CartPage)),
        goToLoginPage: () => dispatch(push(routes.LoginPage)),*/
        //updateCarrinho: (item) => dispatch(updateCarrinho(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)

