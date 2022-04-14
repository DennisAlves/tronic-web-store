import React from "react";
import * as CDS from "../CadastroDeLivros/cadastroDeLivrosStyles";
import {FormControl, TextField} from "@material-ui/core";
import moment from 'moment'
import 'moment/locale/fr';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function AddBookFields(props) {
    const classes = useStyles();
    moment.locale('pt-br');


    const [fornecedor, setFornecedor] = React.useState("");
    const [precificacao, setPrecificacao] = React.useState("");
    const [categoria, setCategoria] = React.useState("");
    const [editora, setEditora] = React.useState("");
    const [categoriaAddList, setCategoriaAddList] = React.useState([]);
    const handleChangeFornecedor = (event) => {
        setFornecedor(event.target.value);
    };
    const handleChangePrecificacao = (event) => {
        setPrecificacao(event.target.value);
    };
    const handleChangeEditora = (event) => {
        setEditora(event.target.value);
    };
    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const handleOnCLickCategoriaAddList = () => {
        setCategoriaAddList([...categoriaAddList, categoria]);
        setCategoria("")
    }
    const fornecedorList = ["teste1", "teste2", "teste3", "teste4", "teste5", "teste6"]
    const precificacaoList = ["10%", "15%", "20%", "25%", "30%", "35%", "40%"]
    const categoriaList = ["Biografias",
        "Coleções",
        "Comportamento",
        "Contos",
        "Crítica Literária",
        "Ficção",
        "Científica",
        "Folclore",
        "Genealogia",
        "Humor",
        "Infanto juvenis",
        "Jogos",
        "Jornais",
        "Literatura Brasileira",
        "Literatura Estrangeira",
        "Livros Raros",
        "Manuscritos",
        "Poesia",
        "Outros Assuntos",].filter(
        function (e) {
            return this.indexOf(e) < 0;
        },
        categoriaAddList
    )
    const editoraList = ["Companhia das Letras",
        "Editora Rocco",
        "Editora Arqueiro",
        "Editora Intrínseca",
        "Editora Sextante",
        "Ediouro",
        "Panda Books",
        "FTD",
        "Ubu",
        "Alta Books",
        "Aleph",
        "Chiado Grupo Editorial",
        "Edições Loyola",
        "Editora Record",
        "Draco",
        "Gente",
        "Martin Claret",
        "Escala",
        "Moderna",
        "Melhoramentos",
        "Grupo Pensamento",
    ]

    const menuItem = (arrayList) => {
        let arr = [];
        for (let i = 1; i < arrayList.length; i++) {
            arr.push(<MenuItem style={{fontSize: 15}} key={i} value={arrayList[i]}> {arrayList[i]} </MenuItem>)
        }
        return arr;
    }
    const tooltipCategoria = (arrayList) =>{
        const list = []
            for (let i = 7; i < arrayList.length;i++) {
                list.push(<Typography key={Math.random() * (i + 100)}>{arrayList[i]}.</Typography>)
            }
            return list
    }
    return (
        <CDS.AddBookWrapper>
            <CDS.AddBookFieldsWrapper>

                <FormControl>
                    <InputLabel>Fornecedor</InputLabel>
                    <Select
                        value={fornecedor}
                        onChange={handleChangeFornecedor}
                        autoWidth
                    >
                        {menuItem(fornecedorList)}
                    </Select>
                </FormControl>

                <TextField
                    onChange={props.handleFieldChange}
                    name="titulo"
                    type="text"
                    label="Titulo"
                    required
                    value={props.titulo.replace(/\d+/g, "")}
                    error={!/^([a-zA-Z][\W ]{3,})$/.test(props.titulo) && props.titulo !== ""}
                    helperText={!/^([a-zA-Z][\W ]{3,})$/.test(props.titulo) && props.titulo !== "" ? "o titulo deve ter pelo menos 4 letras." : ""}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="autor"
                    type="text"
                    label="Autor"
                    required
                    value={props.autor}
                    error={!/^([a-zA-Z][/\W+/g]{3,})$/.test(props.autor) && props.autor !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.autor) && props.autor !== "" ? "o autor deve ter pelo menos 4 letras." : ""}
                />

                <TextField style={{minWidth: 270}}
                           onChange={props.handleFieldChange}
                           name="lancamento"
                           type="date"
                           label="Data de lançamento"
                           value={props.lancamento}
                           required
                           error={props.lancamento !== "" && !moment().isSameOrAfter(props.lancamento)}
                           helperText={props.lancamento !== "" && !moment().isSameOrAfter(props.lancamento) ? "É nescessario uma data de lançamento valida." : ""}
                           InputLabelProps={{
                               shrink: true,
                           }}
                           InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
                />
                <FormControl>
                    <InputLabel>Editora</InputLabel>
                    <Select
                        value={editora}
                        onChange={handleChangeEditora}
                        autoWidth
                    >
                        {menuItem(editoraList)}
                    </Select>
                </FormControl>
                <TextField
                    onChange={props.handleFieldChange}
                    name="edicao"
                    type="number"
                    label="Edição"
                    required
                    value={props.edicao}
                    error={props.edicao <= 0 && props.edicao !== ""}
                    helperText={props.edicao <= 0 && props.edicao !== "" ? "a edição deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="idioma"
                    type="text"
                    label="Idioma"
                    required
                    value={props.idioma}
                    error={!/^([a-zA-Z][\w ]{3,})$/.test(props.idioma) && props.idioma !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.idioma) && props.idioma !== "" ? "o idioma deve ter pelo menos 4 letras." : ""}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="tipoCapa"
                    type="text"
                    label="Tipo de Capa"
                    required
                    value={props.tipoCapa}
                    error={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== "" ? "o tipo de capa deve ter pelo menos 4 letras." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="numeroPaginas"
                    type="number"
                    label="Numero de Paginas"
                    required
                    value={props.numeroPaginas}
                    error={props.numeroPaginas <= 0 && props.numeroPaginas !== ""}
                    helperText={props.numeroPaginas <= 0 && props.numeroPaginas !== "" ? "o numero de paginas deve ser maior que zero." : ""}
                />
            </CDS.AddBookFieldsWrapper>
            <CDS.AddBookFieldsWrapper>
                <TextField
                    onChange={props.handleFieldChange}
                    name="isbn10"
                    type="text"
                    label="ISBN10"
                    required
                    value={props.isbn10}
                    //error={!/^([a-zA-Z][\w ]{3,})$/.test(props.isbn10) && props.isbn10 !== ""}
                    //helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.isbn10) && props.isbn10 !== "" ? "o isbn10 de capa deve ter pelo menos 4 letras." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="isbn13"
                    type="text"
                    label="ISBN13"
                    required
                    value={props.isbn13}
                    //error={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== ""}
                    //helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== "" ? "o tipo de capa deve ter pelo menos 4 letras." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="largura"
                    type="number"
                    label="Largura"
                    required
                    value={props.largura}
                    error={props.largura <= 0 && props.largura !== ""}
                    helperText={props.largura <= 0 && props.largura !== "" ? "a lagura deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="altura"
                    type="number"
                    label="Altura"
                    required
                    value={props.altura}
                    error={props.altura <= 0 && props.altura !== ""}
                    helperText={props.altura <= 0 && props.altura !== "" ? "a altura deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="profundidade"
                    type="number"
                    label="Profundidade"
                    required
                    value={props.profundidade}
                    error={props.profundidade <= 0 && props.profundidade !== ""}
                    helperText={props.profundidade <= 0 && props.profundidade !== "" ? "a profundidade deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="peso"
                    type="number"
                    label="Peso"
                    required
                    value={props.peso}
                    error={props.peso <= 0 && props.peso !== ""}
                    helperText={props.peso <= 0 && props.peso !== "" ? "a profundidade deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="valor"
                    type="number"
                    label="Valor"
                    required
                    value={props.valor}
                    error={props.valor <= 0 && props.valor !== ""}
                    helperText={props.valor <= 0 && props.valor !== "" ? "o valor deve ser maior que zero." : ""}
                />
                <FormControl>
                    <InputLabel>Percificação</InputLabel>
                    <Select
                        value={precificacao}
                        onChange={handleChangePrecificacao}
                        autoWidth
                    >
                        {menuItem(precificacaoList)}
                    </Select>
                </FormControl>
                <TextField
                    onChange={props.handleFieldChange}
                    name="qtde"
                    type="number"
                    label="Quantidade"
                    required
                    value={props.qtde}
                    error={props.qtde <= 0 && props.qtde !== ""}
                    helperText={props.qtde <= 0 && props.qtde !== "" ? "o valor deve ser maior que zero." : ""}
                />
            </CDS.AddBookFieldsWrapper>
            <CDS.AddBookFieldsWrapper>
                <TextField
                    style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="sinopse"
                    type="text"
                    label="Sinopse"
                    multiline
                    rowsMax={6}
                    required
                    value={props.sinopse}
                    error={!/^([a-zA-Z][\w ]{3,})$/.test(props.sinopse) && props.sinopse !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.sinopse) && props.sinopse !== "" ? "a sinopse deve ter pelo menos 4 letras." : ""}
                />

                <CDS.AddBookButtonWrapper className={classes.root}>
                    <CDS.CategoriaWrapper>
                        {categoriaAddList && categoriaAddList.map((item, index) => {
                            if (index < 7) {
                                return (
                                    <Typography key={index} align="left">{item}.</Typography>
                                )
                            } else if (index === 7) {

                                return (
                                    <Tooltip key={Math.random() * (index + 100)} title={tooltipCategoria(categoriaAddList)} arrow>
                                        <Typography color="textSecondary" align="left" key={Math.random() * (index + 100)}>Mais ...</Typography>
                                    </Tooltip>
                                )

                            }
                            else{
                                return ""
                            }
                        })}
                    </CDS.CategoriaWrapper>

                    <FormControl>
                        <InputLabel>Categorias</InputLabel>
                        <Select
                            value={categoria}
                            onChange={handleChangeCategoria}
                            autoWidth
                        >
                            {menuItem(categoriaList)}
                        </Select>
                        <Button disabled={!categoria} onClick={handleOnCLickCategoriaAddList}>Add</Button>
                    </FormControl>
                    <Button variant="contained" color="primary" component="span" onClick={props.salvar}>Salvar</Button>
                </CDS.AddBookButtonWrapper>

            </CDS.AddBookFieldsWrapper>
        </CDS.AddBookWrapper>
    )

}
