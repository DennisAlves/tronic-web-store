import React, {Component} from "react";
import * as DBS from "./DashboardPageStyles";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../../Router';
import Paper from '@material-ui/core/Paper';
import DashboardTabPanel from "../../Components/DashboardData/AbasDados"
import {getCliente, getTipoLogradouro} from "../../Actions/ClienteActions";
import {getEstoque, setEstoque} from "../../Actions/EstoqueActions"
import to243aa from "../../Images/TO-243AA.png";

class DashboardPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMock: {
                labels: ['01/02', '02/02', '03/02', '04/02', '05/02', '06/02', '07/02'],
                datasets: [
                    {
                        label: 'Vendas',
                        backgroundColor: 'rgb(134,236,110)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgb(103,183,84)',
                        hoverBorderColor: 'rgb(255,56,56)',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    }
                ]
            },
            vendasGrid: [],
            estoqueGrid: [],
            clienteGrid: [],
        }
    }

    async componentDidMount() {
        let vendasGrid = []
        let estoqueGrid = []
        let clienteGrid = []

        this.props.getTipoLogradouro()
        this.props.vendas.forEach(item => {
            let operacao = {
                id: "",
                dtVenda: "",
                clienteId: "",
                nomeCliente: "",
                enderecoEntrega: "",
                itens: [],
                pagamento: [],
                total: "",
                status: "",
            }
            operacao.id = item.id
            operacao.dtVenda = item.data
            operacao.clienteId = item.cliente
            this.props.clientes.forEach(item => {
                if (item.id === operacao.clienteId) {
                    operacao.nomeCliente = item.nome
                }
            })
            operacao.enderecoEntrega = "" + item.enderecoDeEntrega.tipoLogradouro.nomeTipo + " " + item.enderecoDeEntrega.endereco +
                ", " + item.enderecoDeEntrega.numero + ", " + item.enderecoDeEntrega.bairro + ", " + item.enderecoDeEntrega.cidade.nome +
                ", " + item.enderecoDeEntrega.cidade.estado.uf + ", cep:" + item.enderecoDeEntrega.cep + " " +
                " ." + item.enderecoDeEntrega.complemento + ""
            let itensString = ""
            item.itens.forEach(item => {
                itensString +=
                    "(Titulo: " + item.titulo + ", quantidade:" + item.qtde + ", preço: " +
                    (new Intl.NumberFormat(
                        "pt-BR", {
                            style: 'currency', currency: 'BRL'
                        }).format(item.preco)) + ")\n"

            })
            let pagamentoString = ""
            item.pagamento.forEach(item => {
                pagamentoString +=
                    "(Numero: " + item.numero + ", Valor: " +
                    (new Intl.NumberFormat(
                        "pt-BR", {
                            style: 'currency', currency: 'BRL'
                        }).format(item.valor)) + ")\n"

            })

            operacao.itens = itensString
            operacao.pagamento = pagamentoString
            operacao.total = new Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL'}).format(item.total)
            operacao.status = item.status
            vendasGrid.push(operacao)
        })
        this.props.estoque.forEach((item) => {
            let produto = {
                id: "",
                custo: "",
                qtde: "",
                precificacao: "",
                ativo: "",
                tipo: "",
                modelo: "",
                fabricante: "",
                descricao: "",
                dataSheet: "",
                involucro: "",
                involucroImage: "",
                tipoDeTransistor: "",
                correnteColetorMax: "",
                tensaoRupturaColetorEmissorMax: "",
                saturacaoVceMax: "",
                correnteCorteDoColetorMax: "",
                ganhoDeCorrenteCC: "",
                potenciaMax: "",
                frequenciaTransicao: "",
                temperaturaOperacao: "",
                tipoDeMontagem: "",
            }

            produto.id = item.produto.id
            produto.custo = new Intl.NumberFormat("pt-BR", {
                style: 'currency',
                currency: 'BRL'
            }).format(item.produto.custo);
            produto.qtde = item.produto.qtde
            produto.precificacao = (item.produto.precificacao * 100) + "%";
            produto.ativo = item.produto.ativo
            produto.tipo = item.produto.tipo
            produto.modelo = item.produto.transistor.modelo
            produto.fabricante = item.produto.transistor.fabricante
            produto.descricao = item.produto.transistor.descricao
            produto.dataSheet = item.produto.transistor.dataSheet
            produto.involucro = item.produto.transistor.involucro
            produto.involucroImage = item.produto.transistor.involucroImage
            produto.tipoDeTransistor = item.produto.transistor.tipoDeTransistor
            produto.correnteColetorMax = item.produto.transistor.correnteColetorMax
            produto.tensaoRupturaColetorEmissorMax = item.produto.transistor.tensaoRupturaColetorEmissorMax
            produto.saturacaoVceMax = item.produto.transistor.saturacaoVceMax
            produto.correnteCorteDoColetorMax = item.produto.transistor.correnteCorteDoColetorMax
            produto.ganhoDeCorrenteCC = item.produto.transistor.ganhoDeCorrenteCC
            produto.potenciaMax = item.produto.transistor.potenciaMax
            produto.frequenciaTransicao = item.produto.transistor.frequenciaTransicao
            produto.temperaturaOperacao = item.produto.transistor.temperaturaOperacao
            produto.tipoDeMontagem = item.produto.transistor.tipoDeMontagem

            estoqueGrid.push(produto)
        })
        this.props.clientes.forEach(data => {
            const cliente = {
                id: data.id,
                dtCadastro: data.dtCadastro,
                nome: data.nome,
                dtNascimento: data.dtNascimento,
                genero: data.genero.name,
                email: data.email,
                senha: data.senha,
                tipoCliente: data.tipoCliente,
                ativo: data.ativo,
                qtdeEnderecos: data.enderecos.length,
                qtdeTelefone: data.telefones.length,
                qtdeCartoes: data.cartoes.length,
                qtdeDocumentos: data.documentos.length,
            }
            if (cliente.ativo === 1) {
                cliente.ativo = "Sim"
            } else {
                cliente.ativo = "Não"
            }
            clienteGrid.push(cliente)
        })

        this.setState({vendasGrid: vendasGrid, estoqueGrid: estoqueGrid, clienteGrid: clienteGrid})

    }

    handleChangeTrocasEfetuadas = (vendas) => {
        let count = 0
        console.log(vendas)
        vendas.forEach(item => {
            if (item.status === "TROCADO") {
                item.itensTroca.forEach(trocas => {
                    for (let i = 0; i < trocas.qtde; i++) {
                        count++
                    }
                })

            }
        })
        return count
    }
    handleChangeTrocasEmAndamento = (vendas) => {
        let count = 0
        vendas.forEach(item => {
            if (item.status === "EM TROCA") {
                item.itensTroca.forEach(trocas => {
                    for (let i = 0; i < trocas.qtde; i++) {
                        count++
                    }
                })

            }
        })
        return count
    }
    handleChangeVendasEfetuadas = (vendas) => {
        let total = 0
        vendas.forEach(item => {
            if (item.status !== "REPROVADA") {
                total += item.total
            }
        })
        return new Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL'}).format(total)
    }
    handleChangeLucro = () => {
        let copyVendas = []
        let copyEstoque = []
        let total = 0

        this.props.vendas.forEach(item => {
            let venda = {
                id: "",
                qtde: ""
            }
            if (item.status !== "REPROVADA") {
                item.itens.forEach(item => {
                    venda.id = item.id
                    venda.qtde = item.qtde
                    copyVendas.push(venda)
                })
            }

        })
        this.props.estoque.forEach(item => {
            let livro = {
                id: "",
                custo: "",
                precificacao: ""
            }
            livro.id = item.id
            livro.custo = item.custo
            livro.precificacao = item.precificacao
            copyEstoque.push(livro)
        })
        copyEstoque.forEach(livro => {
            copyVendas.forEach(venda => {
                if (livro.id === venda.id) {
                    total += (livro.custo * livro.precificacao) * venda.qtde
                }
            })
        })
        return new Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL'}).format(total)
    }
    handleChangeLivrosVendidos = () => {
        let copyVendas = []
        let total = 0

        this.props.vendas.forEach(item => {
            let venda = {
                id: "",
                qtde: ""
            }
            if (item.status !== "REPROVADA") {
                item.itens.forEach(item => {
                    venda.id = item.id
                    venda.qtde = item.qtde
                    copyVendas.push(venda)
                })
            }
        })
        copyVendas.forEach(venda => {
            total += venda.qtde
        })

        return total
    }
    handleLivroMaisvendido = () => {
        let copyVendas = []
        let maisVendido = ""

        this.props.vendas.forEach(item => {
            let venda = {
                id: "",
                titulo: "",
                qtde: "",
            }
            if (item.status !== "REPROVADA") {
                item.itens.forEach(item => {
                    venda.id = item.id
                    venda.titulo = item.titulo
                    venda.qtde = item.qtde
                    copyVendas.push(venda)
                })
            }

        })

        let formatedVendas = []

        this.props.estoque.forEach(item => {
            let livro = {
                id: "",
                titulo: "",
                custo: "",
                precificacao: "",
                qtde: 0,
                lucro: "",
            }
            livro.id = item.id
            livro.titulo = item.titulo
            livro.custo = item.custo
            livro.precificacao = item.precificacao

            copyVendas.forEach(venda => {
                if (item.id === venda.id) {
                    livro.qtde += venda.qtde
                }
            })
            livro.lucro = new Intl.NumberFormat(
                "pt-BR",
                {style: 'currency', currency: 'BRL'})
                .format((livro.custo * livro.precificacao) * livro.qtde)
            formatedVendas.push(livro)
        })

        maisVendido = formatedVendas.reduce(function (prev, current) {
            return (prev.qtde > current.qtde) ? prev : current
        })

        return maisVendido
    }
    handleChangeVendasEmTransito = (vendas) => {
        let count = 0
        vendas.forEach(item => {
            if (item.status === "EM TRANSPORTE") {
                count++
            }
        })
        return count
    }
    handleChangeReprovadas = (vendas) => {
        let count = 0
        vendas.forEach(item => {
            if (item.status === "REPROVADA") {
                count++
            }
        })
        return count
    }
    handleChangeValorEmEstoque = () => {
        let copyEstoque = []
        let total = 0

        this.props.estoque.forEach(item => {
            let livro = {
                custo: "",
                qtde: ""
            }
            livro.custo = item.custo
            livro.qtde = item.qtde
            copyEstoque.push(livro)
        })

        copyEstoque.forEach(livro => {
            total += livro.custo * livro.qtde
        })

        return new Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL'}).format(total)
    }
    handleChangeLucroEstoque = () => {
        let copyEstoque = []
        let total = 0

        this.props.estoque.forEach(item => {
            let livro = {
                custo: "",
                precificacao: "",
                qtde: "",
            }
            livro.custo = item.custo
            livro.precificacao = item.precificacao
            livro.qtde = item.qtde
            copyEstoque.push(livro)
        })

        copyEstoque.forEach(livro => {
            total += (livro.custo * livro.precificacao) * livro.qtde
        })

        return new Intl.NumberFormat("pt-BR", {style: 'currency', currency: 'BRL'}).format(total)
    }
    handleChangeQtdeLivrosEmEstoque = () => {
        let copyEstoque = []
        let total = 0

        this.props.estoque.forEach(item => {
            let livro = {
                qtde: ""
            }
            livro.qtde = item.qtde
            copyEstoque.push(livro)
        })
        copyEstoque.forEach(livro => {
            total += livro.qtde
        })

        return total
    }
    handleCardUpdate = () => {
        class Info {
            constructor(topText, midText, bottomText, color,) {
                this.topText = topText;
                this.midText = midText;
                this.bottomText = bottomText;
                this.color = color;
            }
        }

        let cardList = []

        const lucro = new Info(
            "Lucro Atual",
            this.handleChangeLucro(),
            "considerando todas as vendas efetuadas",
            "green")
        cardList.push(lucro)

        const vendasEfetuadas = new Info(
            "Valor em vendas",
            this.handleChangeVendasEfetuadas(this.props.vendas),
            "Considerando Todas vendas efetuadas",
            "green")
        cardList.push(vendasEfetuadas)

        const livrosVendidos = new Info(
            "Livros Vendidos",
            this.handleChangeLivrosVendidos(),
            "Unidades",
            "green")
        cardList.push(livrosVendidos)

        const lucroEstimado = new Info(
            "Lucro Estimado",
            this.handleChangeLucroEstoque(),
            "considerando todo o estoque",
            "green")
        cardList.push(lucroEstimado)

        let livroMaisVendido = this.handleLivroMaisvendido()

        const maisVendido = new Info(
            "Livro Mais Vendido",
            livroMaisVendido.lucro,
            livroMaisVendido.titulo + " " + livroMaisVendido.qtde + " Unidades",
            "green")
        cardList.push(maisVendido)

        const vendasEmTrasito = new Info(
            "Vendas em transito",
            this.handleChangeVendasEmTransito(this.props.vendas),
            "",
            "yellow")
        cardList.push(vendasEmTrasito)

        const trocasEmAndamento = new Info(
            "Trocas Em Andamento",
            this.handleChangeTrocasEmAndamento(this.props.vendas),
            "Livros",
            "yellow")
        cardList.push(trocasEmAndamento)

        const trocasEfetuadas = new Info(
            "Trocas Efetuadas",
            this.handleChangeTrocasEfetuadas(this.props.vendas),
            "Livros",
            "red")
        cardList.push(trocasEfetuadas)

        const vendasReprovadas = new Info(
            "Vendas Reprovadas",
            this.handleChangeReprovadas(this.props.vendas),
            "",
            "red")
        cardList.push(vendasReprovadas)

        const valorEmEstoque = new Info(
            "Valor Total do Estoque",
            this.handleChangeValorEmEstoque(),
            this.handleChangeQtdeLivrosEmEstoque() + " Livros",
            "orange")
        cardList.push(valorEmEstoque)

        return cardList
    }

    render() {

        return (
            <>
                <DBS.MainDiv>
                    <Paper elevation={3}>
                        <DBS.CustomHeader>
                            <DBS.HomeLogoWraper>
                                <DBS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                                </DBS.HomeLogo>
                            </DBS.HomeLogoWraper>
                            <DBS.HeaderLinks>
                            </DBS.HeaderLinks>
                        </DBS.CustomHeader>
                    </Paper>
                    <DBS.Mid>
                        <DashboardTabPanel
                            cardList={this.handleCardUpdate()}
                            dataVendas={this.state.dataMock}
                            columnNames={this.state.columnNames}
                            rowsDataVendas={this.state.vendasGrid}
                            rowsDataEstoque={this.state.estoqueGrid}
                            rowsCliente={this.state.clienteGrid}
                            rowsCupom={this.props.cupons}
                        />
                    </DBS.Mid>
                    <Paper elevation={3}>
                        <DBS.Footer>
                            <h3>aqui vai ficar o footer</h3>
                        </DBS.Footer>
                    </Paper>
                </DBS.MainDiv>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    estoque: state.estoque.estoque,
    vendas: state.vendas.vendas,
    clientes: state.cliente.clientes,
    cupons: state.vendas.cupons,
})

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        getClientes: () => dispatch(getCliente()),
        getTipoLogradouro: () => dispatch(getTipoLogradouro()),
        setEstoque: (estoque) => dispatch(setEstoque(estoque)),
        getEstoque: () => dispatch(getEstoque())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)