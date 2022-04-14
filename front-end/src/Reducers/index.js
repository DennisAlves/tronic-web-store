import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import estoque from "./Estoque";
import cliente from "./Cliente";
import vendas from "./Vendas";


export const generateReducers = history =>
    combineReducers({
        router: connectRouter(history),
        estoque, cliente, vendas
        // Outros reducers aqui
    });
