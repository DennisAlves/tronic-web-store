import axios from 'axios'
import {push} from "connected-react-router";
import {routes} from "../Router/index";

export const setCarrinho = (carrinho) =>({
    type: 'CARRINHO_UPDATE_VALUE',
    payload: {
        carrinho
    }
})
export const setCarrinhoVenda = (carrinhoVenda) =>({
    type: 'CARRINHO_VENDA_UPDATE_VALUE',
    payload: {
        carrinhoVenda
    }
})
export const setProductId = (productId) => ({
    type: 'PRODUCT_ID_UPDATE_VALUE',
    payload: {
        productId
    }
})
export const setVendaId = (vendaId) => ({
    type: 'VENDA_ID_UPDATE_VALUE',
    payload: {
        vendaId
    }
})
export const setVendas = (vendas) => ({
    type: 'VENDAS_UPDATE_VALUE',
    payload: {
        vendas
    }
})
export const setPedidosDeTroca = (pedidosDeTroca) => ({
    type: 'PEDIDOS_DE_TROCA_UPDATE_VALUE',
    payload: {
        pedidosDeTroca
    }
})
export const setCupons = (cupons) => ({
    type: 'CUPONS_UPDATE_VALUE',
    payload: {
        cupons
    }
})
export const setSelectedVendaIDAndPush = (vendaId) => async (dispatch) => {
    dispatch(setVendaId(vendaId))
    dispatch(push(routes.DetalheVendaPage))
}
export const saveCarrinho = (item) => async () => {
    try {
        await axios.post(`http://localhost:3001/carrinho/add-carrinho`, item)
    } catch (error) {

        alert('Erro ao tentar cria carrinho')
    }
}

export const updateCarrinho = (item) => async () => {
    try {
        await axios.post(`http://localhost:3001/carrinho/update-carrinho`, item)

    } catch (error) {
        console.log(error)
        alert('Erro ao tentar atualizar carrinho')
    }
}

export const salvarVenda = (venda) => async () => {
    try {
        await axios.post(`http://localhost:3001/venda/add-venda`, venda)

    } catch (error) {
        console.log(error)
        alert('Erro ao tentar criar venda')
    }
}

export const consultarCarrinho = (cliente_id) => async (dispatch) => {
    try {
        const response = await axios.post(`http://localhost:3001/carrinho/consultar-carrinho`, cliente_id)

        let formatedData = []

        response.data.consulta.forEach(item => {
            let product = {
                id_item: item.id_item,
                data_criacao: item.data_criacao,
                id_livro: item.id_livro,
                titulo: item.titulo,
                qtde: item.qtde,
                preco: item.preco,
                ativo: item.data_criacao
            }
            formatedData.push(product)
        })
        dispatch(setCarrinho(formatedData))
    } catch (error) {
        console.log(error)
        alert('Erro ao tentar consultar carrinho')
    }

}

export const consultarCupons = () =>async (dispatch) => {
    const response = await axios.get(`http://localhost:3001/cupom/consultar-cupom`)

    let formatedData = []
    response.data.consulta.forEach(item => {
        let cupom ={
            id_cupom: item.id_cupom,
            data_criacao: item.data_criacao,
            nome: item.nome,
            valor: item.valor,
            qtde: item.qtde,
            validade: item.validade,
            tipo: item.tipo

        }
        formatedData.push(cupom)
    })

    dispatch(setCupons(formatedData))

}