import React, {Component} from "react";
import * as ABS from "./AddBookPageStyle";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../../Router';
import AddBookFields from "../CadastroDeLivros/CadastroDeLivros"
import UploadButton from "../UploadButtom/UploadButton";
import noImage from "../../Images/unnamed.png"


class AddBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: noImage,
            titulo: "",
            autor: "",
            sinopse: "",
            editora: "",
            lancamento: "",
            edicao: "",
            idioma: "",
            tipoCapa: "",
            numeroPaginas: "",
            isbn10: "",
            isbn13: "",
            largura: "",
            altura: "",
            profundidade: "",
            peso: "",
            valor: "",
            qtde: "",
        };
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    async componentDidMount() {

    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleImageChange(event) {
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        })
    }


    render() {
        const {
            image,
            titulo,
            autor,
            sinopse,
            editora,
            lancamento,
            edicao,
            idioma,
            tipoCapa,
            numeroPaginas,
            isbn10,
            isbn13,
            largura,
            altura,
            profundidade,
            peso,
            valor,
            qtde,
        } = this.state

        return (
            <>
                <ABS.MainDiv>
                    <ABS.AddBookWrapper>
                        <ABS.AddBookPageWrapper>
                            <ABS.AddBookImageUploadWrapper>
                                <ABS.AddBookImageWrapper src={image}/>
                                <UploadButton onChange={this.handleImageChange}/>
                            </ABS.AddBookImageUploadWrapper>

                            <AddBookFields
                                handleFieldChange={this.handleFieldChange}
                                titulo={titulo}
                                autor={autor}
                                sinopse={sinopse}
                                editora={editora}
                                lancamento={lancamento}
                                edicao={edicao}
                                idioma={idioma}
                                tipoCapa={tipoCapa}
                                numeroPaginas={numeroPaginas}
                                isbn10={isbn10}
                                isbn13={isbn13}
                                largura={largura}
                                altura={altura}
                                profundidade={profundidade}
                                peso={peso}
                                valor={valor}
                                qtde={qtde}
                            />
                        </ABS.AddBookPageWrapper>
                    </ABS.AddBookWrapper>
                </ABS.MainDiv>
            </>
        );
    }
}

const mapStateToProps = (state) => ({})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage)

