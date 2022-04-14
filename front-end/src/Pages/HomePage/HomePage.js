import React, {Component} from "react";
import {connect} from "react-redux";
import {routes} from '../../Router';
import Pagination from '@material-ui/lab/Pagination';
import FadeIn from 'react-fade-in';
import * as HPS from "../HomePage/HomePageStyles";
import Product from "../../Components/Product/Product";
import Paper from '@material-ui/core/Paper';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {push} from "connected-react-router";
import Badge from '@material-ui/core/Badge';
import {getEstoque, setEstoque, setSelectedProductIDAndPush} from "../../Actions/EstoqueActions"
import {consultarCarrinho} from "../../Actions/VendasActions";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            estoqueData: "",
            carrinhoData: "",
            carrinhoQtde: 0,
            noOfPages: 0,
            page: 1,
            itemsPerPage: 10,
        };
    }

    async componentDidMount() {
        await this.props.getEstoque()
        //await this.props.consultarCarrinho("00d6c7e9-515e-4913-8dc7-ffdd26e4446c")
        const {estoque, carrinho} = this.props
        let copyEstoque = estoque
        let qtde = 0
        if (carrinho) {
            carrinho.forEach((item) => {
                qtde = qtde + item.qtde
            })
        }

        this.setState({noOfPages: Math.ceil(1 / this.state.itemsPerPage)})
        this.setState({estoqueData: copyEstoque, carrinhoData: carrinho, carrinhoQtde: qtde})
    }

    validarAtivo = (index) => {
        if (this.props.estoque[index].produto.qtde === 0) {
            return false
        } else {
            return this.props.estoque[index].produto.ativo
        }
    }

    handlePageChange = (event, val) => {
        this.setState({page: val});
    };
    addToCart = async (id) => {
        console.log("id", id)
    }

    render() {
        const {estoqueData, page, itemsPerPage, noOfPages} = this.state
        window.scrollTo(0, 0);
        return (
            <>
                <FadeIn>
                    <HPS.MainDiv>
                        <Paper elevation={3}>
                            <HPS.CustomHeader>
                                <HPS.HomeLogoWraper>
                                    <HPS.HomeLogo onClick={() => this.props.goToHomePage}><h3>aqui vai ficar o
                                        header</h3>
                                    </HPS.HomeLogo>
                                </HPS.HomeLogoWraper>
                                <HPS.HeaderLinks>
                                    <HPS.HeaderLink onClick={this.props.goToLoginPage}> Entrar </HPS.HeaderLink>
                                    <HPS.HeaderLink> Devoluções e Pedidos </HPS.HeaderLink>
                                    <HPS.HeaderLink> <Badge badgeContent={this.state.carrinhoQtde}
                                                            onClick={this.props.goToCartPage} color="secondary">
                                        <ShoppingCartIcon/>
                                    </Badge></HPS.HeaderLink>
                                </HPS.HeaderLinks>
                            </HPS.CustomHeader>
                        </Paper>

                        <HPS.BodyTitle>
                            aqui alguma coisa como titulo
                        </HPS.BodyTitle>
                        <HPS.Mid>

                            <HPS.HomePageProductWrapper>
                                {estoqueData && estoqueData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => {
                                    return (
                                        <Product key={index}
                                                 image={item.produto.transistor.involucroImage}
                                                 title={item.produto.transistor.modelo}
                                                 alt={item.produto.transistor.modelo}
                                                 modelText={item.produto.transistor.modelo}
                                                 manufacturer={item.produto.transistor.fabricante}
                                                 active={this.validarAtivo(index)}
                                                 value={(item.produto.custo + (item.produto.custo * item.produto.precificacao)).toFixed(2)}
                                                 onClickProduct={() => {
                                                     this.props.goToProductPage({productId: item.produto.id})
                                                 }}
                                                 onClickButtom={() => this.addToCart(item.id_product)}
                                        />
                                    )
                                })}
                            </HPS.HomePageProductWrapper>

                            <Pagination
                                shape="rounded"
                                count={noOfPages}
                                page={page}
                                name="page"
                                onChange={this.handlePageChange}
                                defaultPage={1}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                        </HPS.Mid>


                        <Paper elevation={3}>
                            <HPS.Footer>
                                <h3>Para mais informações favor entrar em contato com qualquer uma de nossas redes
                                    sociais:</h3>
                                <HPS.FooterLink href="https://www.facebook.com/" target="_blank"> <HPS.FooterLogo
                                    src="https://i2.wp.com/www.multarte.com.br/wp-content/uploads/2019/03/logo-facebook-png5.png?fit=696%2C624&ssl=1"/></HPS.FooterLink>
                                <HPS.FooterLink href="https://www.twitter.com/" target="_blank"> <HPS.FooterLogo
                                    src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png"/>
                                </HPS.FooterLink>
                                <HPS.FooterLink href="https://www.instagram.com/" target="_blank"> <HPS.FooterLogo
                                    src="https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png"/>
                                </HPS.FooterLink>
                                <HPS.FooterLink href="https://www.discord.com/" target="_blank"> <HPS.FooterLogo
                                    src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-01.png"/>
                                </HPS.FooterLink>
                                <HPS.FooterLink href="https://www.linkedin.com/" target="_blank"> <HPS.FooterLogo
                                    src="https://images.vexels.com/media/users/3/137382/isolated/preview/c59b2807ea44f0d70f41ca73c61d281d-linkedin-icon-logo-by-vexels.png"/>
                                </HPS.FooterLink>
                            </HPS.Footer>
                        </Paper>
                    </HPS.MainDiv>
                </FadeIn>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
    carrinho: state.vendas.carrinho,
    clientes: state.cliente.clientes,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToLoginPage: () => dispatch(push(routes.LoginPage)),
        goToCartPage: () => dispatch(push(routes.CartPage)),
        goToProductPage: (productId) => dispatch(setSelectedProductIDAndPush(productId)),
        //setCarrinho: (carrinho) => dispatch(setCarrinho(carrinho)),
        setEstoque: (estoque) => dispatch(setEstoque(estoque)),
        /*setCliente: () => dispatch(setCliente()),*/
        getEstoque: () => dispatch(getEstoque()),
        consultarCarrinho: (cliente_id) => dispatch(consultarCarrinho(cliente_id)),
         /*saveCarrinho: (item) => dispatch(saveCarrinho(item)),
         updateCarrinho: (item) => dispatch(updateCarrinho(item)),*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)