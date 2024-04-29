/*!

=========================================================
* BLK Design System React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";
import "react-toastify/dist/ReactToastify.css";

import { MetaMaskContextProvider } from "./contexts/web3/MetaMaskContextProvider.js";
import { GlobalContextProvider } from "./contexts/GlobalContextProvider.js";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
// import RegisterPage from "views/examples/RegisterPage.js";
import MetamaskRegisterPage from "views/examples/MetamaskRegisterPage.js";
import LocalWalletRegisterPage from "views/examples/LocalWalletRegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RewardsPage from "views/examples/RewardsPage.js";
import LoginPage from "views/examples/LoginPage.js";
import ValidationPage from "views/examples/ValidationPage.js";
import UserRewardsPage from "views/examples/UserRewardsPage.js";
import LocalWalletImportPage from "views/examples/LocalWalletImportPage.js";
import LocalWalletDetailsPage from "views/examples/LocalWalletDetailsPage.js";

// BLOCKCHAIN - START
// import { Web3ReactProvider } from "@web3-react/core";
// import { Web3Provider } from "@ethersproject/providers";
// import { InjectedConnector } from "@web3-react/injected-connector";

// const Injected = new InjectedConnector({
//   supportedChainIds: [20231, 1, 3, 4, 5, 42],

// function getLibrary(provider) {
//   console.log(provider);
//   return new Web3Provider(provider);
// }
// });

// BLOCKCHAIN - END

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <MetaMaskContextProvider>
      <GlobalContextProvider>
        <BrowserRouter>
          <Switch>
            <Route
              path="/components"
              render={(props) => <Index {...props} />}
            />
            <Route
              path="/landing-page"
              render={(props) => <LandingPage {...props} />}
            />
            <Route
              path="/metamask-register-page"
              render={(props) => <MetamaskRegisterPage {...props} />}
              // render={(props) => <RegisterPage {...props} />}
            />
            <Route
              path="/localWallet-register-page"
              render={(props) => <LocalWalletRegisterPage {...props} />}
              // render={(props) => <RegisterPage {...props} />}
            />
            <Route
              path="/localWallet-import-page"
              render={(props) => <LocalWalletImportPage {...props} />}
            />
            <Route
              path="/localWallet-details-page"
              render={(props) => <LocalWalletDetailsPage {...props} />}
            />
            <Route
              path="/login-page"
              render={(props) => <LoginPage {...props} />}
            />
            <Route
              path="/profile-page"
              render={(props) => <ProfilePage {...props} />}
            />
            <Route
              path="/rewards-page"
              render={(props) => <RewardsPage {...props} />}
            />
            <Route
              path="/validation-page"
              render={(props) => <ValidationPage {...props} />}
            />
            <Route
              path="/user-rewards-page"
              render={(props) => <UserRewardsPage {...props} />}
            />
            <Redirect from="/" to="/rewards-page" />
          </Switch>
        </BrowserRouter>
      </GlobalContextProvider>
    </MetaMaskContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// For React v18+
/*
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MetaMaskContextProvider>
    <GlobalContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/components" render={(props) => <Index {...props} />} />
          <Route
            path="/landing-page"
            render={(props) => <LandingPage {...props} />}
          />
          <Route
            path="/register-page"
            render={(props) => <RegisterPage {...props} />}
          />
          <Route
            path="/login-page"
            render={(props) => <LoginPage {...props} />}
          />
          <Route
            path="/profile-page"
            render={(props) => <ProfilePage {...props} />}
          />
          <Route
            path="/rewards-page"
            render={(props) => <RewardsPage {...props} />}
          />
          <Redirect from="/" to="/rewards-page" />
        </Switch>
      </BrowserRouter>
    </GlobalContextProvider>
  </MetaMaskContextProvider>
);
*/
