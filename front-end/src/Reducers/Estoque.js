import to243aa from "../Images/TO-243AA.png"


const initialState = {
    estoque:[
        {
            produto:{
                id: 1,
                custo: 10.00,
                qtde: 7,
                precificacao: 0.15,
                ativo:true,
                tipo:"BJT",
                transistor:{
                    modelo:"2SD1626-TD-E",
                    fabricante:"onsemi",
                    descricao:"Transístor bipolar (BJT) NPN 50 V 1.5 A 120MHz 500 mW Montagem em superfície PCP",
                    dataSheet: "https://rocelec.widen.net/view/pdf/cemkmxalc5/ONSMS37267-1.pdf?t.download=true&u=5oefqw",
                    involucro:"TO-243AA",
                    involucroImage:to243aa,
                    tipoDeTransistor:"NPN",
                    correnteColetorMax:1.5,
                    tensaoRupturaColetorEmissorMax:50,
                    saturacaoVceMax:"1,5V a 500µA, 500mA",
                    correnteCorteDoColetorMax:"100nA (ICBO)",
                    ganhoDeCorrenteCC:"4000 a 500mA, 2V",
                    potenciaMax:"500 mW",
                    frequenciaTransicao:"120MHz",
                    temperaturaOperacao:"150°C (TJ)",
                    tipoDeMontagem:"Montagem em superfície",
                }
            }
        }
    ],
    productId:"",
}
const estoque = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case 'ESTOQUE_UPDATE_VALUE':
            return {
                ...state,
                estoque: action.payload.estoque
            }
        case 'PRODUCT_ID_UPDATE_VALUE':
            return {
                ...state,
                productId: action.payload.productId
            }
        default:
            return state;
    }
}

export default estoque;