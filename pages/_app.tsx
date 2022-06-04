import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../public/asset/fonts/style.css";
import "../styles/global.scss";
import store from "../store/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
