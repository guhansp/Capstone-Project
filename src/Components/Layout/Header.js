import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Header = (props) => {
  const cartCtx = useContext(CartContext);
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.Logout());
    cartCtx.reset();
  };
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <button className={classes.btn} onClick={logoutHandler}>
          Logout
        </button>
        <HeaderCartButton onClick={props.onClick}></HeaderCartButton>
      </header>
      {/*prettier-ignore*/}
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Delicious foods on table"/>
      </div>
    </>
  );
};

export default Header;
