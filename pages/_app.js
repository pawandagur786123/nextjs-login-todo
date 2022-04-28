import App from "next/app";
import React from "react";
import withReduxStore from "../lib/with-redux-store";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import "../styles/globals.css"
class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore, persistor } = this.props;
    return (
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
