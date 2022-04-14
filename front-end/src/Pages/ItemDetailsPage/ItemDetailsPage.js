import React, {Component} from "react";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../../Router';
import Typography from "@material-ui/core/Typography";
import {setEstoque} from "../../Actions/EstoqueActions"
import {withStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import {FormHelperText} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import FadeIn from 'react-fade-in';
import * as IDPS from './ItemDetailsPageStyle'

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

class DetalhesVendaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            venda: "",
            endereco: "",
            vendas: "",
            pagamentos: "",
            itensTroca: "",
            valueSelect: "",
            totalVenda: "",
            totalTroca: "",
        };
    }

    async componentDidMount() { this.handleChangeState() }

    handleChangeSelect = (event) => {
        this.setState({valueSelect: event.target.value})
    }


    render() {

        return (
            <FadeIn>
                <IDPS.MainDiv>
                    <Paper elevation={3}>
                        <IDPS.CustomHeader>
                            <IDPS.HomeLogoWraper>
                                <IDPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                                </IDPS.HomeLogo>
                            </IDPS.HomeLogoWraper>
                            <IDPS.HeaderLinks>
                            </IDPS.HeaderLinks>
                        </IDPS.CustomHeader>
                    </Paper>

                </IDPS.MainDiv>
            </FadeIn>
        );
    }
}

const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        setEstoque: (estoque) => dispatch(setEstoque(estoque)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalhesVendaPage)

