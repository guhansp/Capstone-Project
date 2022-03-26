import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import CartContextProvider from "./store/CartContextProvider";
import Login from "./Components/Form/Login";
import { useSelector } from "react-redux";

function App() {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const [CartIsShown, setCartIsShown] = useState(false);

  const ShowCartModal = () => {
    setCartIsShown(true);
  };

  const HideCartModal = () => {
    setCartIsShown(false);
  };

  return (
    <CartContextProvider>
      {isLoggedin && (
        <div>
          {CartIsShown && <Cart onClick={HideCartModal} />}
          <Header onClick={ShowCartModal}></Header>
          <Meals></Meals>
        </div>
      )}
      {!isLoggedin && <Login />}
    </CartContextProvider>
  );
}

export default App;
