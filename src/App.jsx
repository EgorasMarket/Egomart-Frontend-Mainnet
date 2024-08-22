import "./App.css";
import Exchange from "./Exchange/Exchange";
import Web3ModalProvider from "./constants/Web3ModalProvider";

function App() {
  return (
    <Web3ModalProvider>
      <div className="App">
        <Exchange />
      </div>
    </Web3ModalProvider>
  );
}

export default App;
