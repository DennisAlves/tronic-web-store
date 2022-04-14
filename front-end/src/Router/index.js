import React from "react";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignupPage from "../Pages/SignupPage/SignupPage";
import ProductPage from "../Pages/ProdutcPage/ProductPage";
import UserPage from "../Pages/UserPage/UserPage";
import CheckOutPage from "../Pages/CheckOutPage/CheckOutPage"
import CartPage from "../Pages/CartPage/CartPage"
import DashboardPage from "../Pages/DashboardPage/DashboardPage"
import DetalheVendaPage from "../Pages/PurchaseDetailsPage/PurchaseDetails"
import DetalheProdutoPage from "../Pages/ItemDetailsPage/ItemDetailsPage"

export const routes = {

    HomePage: "/",
    LoginPage: "/login",
    SignupPage: "/signup",
    ProductPage:"/product",
    UserPage: "/userPage",
    CheckOutPage:"/checkout",
    CartPage:"/cart",
    DashboardPage: "/dashboard",
    DetalheVendaPage: "/detail-venda",
    DetalheProdutoPage: "/product-details"

};

function Router(props) {
    return (
        <ConnectedRouter history={props.history}>
            <Switch>
                <Route exact path={routes.HomePage} component={HomePage}/>
                <Route exact path={routes.LoginPage} component={LoginPage}/>
                <Route exact path={routes.SignupPage} component={SignupPage}/>
                <Route exact path={routes.ProductPage} component={ProductPage}/>
                <Route exact path={routes.UserPage} component={UserPage}/>
                <Route exact path={routes.CheckOutPage} component={CheckOutPage}/>
                <Route exact path={routes.CartPage} component={CartPage}/>
                <Route exact path={routes.DashboardPage} component={DashboardPage}/>
                <Route exact path={routes.DetalheVendaPage} component={DetalheVendaPage}/>
                <Route exact path={routes.DetalheProdutoPage} component={DetalheProdutoPage}/>
            </Switch>
        </ConnectedRouter>
    );
}

export default Router;