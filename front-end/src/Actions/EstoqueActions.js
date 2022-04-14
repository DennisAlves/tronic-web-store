import axios from 'axios'
import {push} from "connected-react-router";
import {routes} from "../Router/index";

export const setEstoque = (estoque) =>({
    type: 'ESTOQUE_UPDATE_VALUE',
    payload: {
        estoque
    }
})

export const setProductId = (productId) => ({
    type: 'PRODUCT_ID_UPDATE_VALUE',
    payload: {
        productId
    }
})

export const setSelectedProductIDAndPush = (productID) => async (dispatch) => {
    dispatch(setProductId(productID))
    dispatch(push(routes.ProductPage))
}

export const getEstoque = () => async (dispatch) => {

    try {
        const response = await axios.post(`http://localhost:3001/livro/consultar-livro`)
        console.log(response)
        dispatch(setEstoque(response.data.consulta))
    } catch (error) {
        console.log(error)
        alert('Erro ao tentar adquirir estoque')
    }
}