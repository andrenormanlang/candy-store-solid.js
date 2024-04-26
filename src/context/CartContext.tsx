import { JSX, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

interface CartProviderProps {
  children: JSX.Element;
}

export const CartContext = createContext();

export function CartProvider(props: CartProviderProps) {
  const [items, setItems] = createStore([]);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {props.children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
