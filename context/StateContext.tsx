import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import toast from 'react-hot-toast';

import { ProductData } from '@/types';

type StateContext = {
  showCart: boolean;
  setShowCart: Dispatch<SetStateAction<boolean>>;
  cartItems: ProductData[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: ProductData, quantity: number) => void;
  toggleCartItemQuantity: (product: ProductData, value: string) => void;
  onRemove: (product: ProductData) => void;
};

const INITIAL_STATE = {
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  incQty: () => {},
  decQty: () => {},
  onAdd: (product: ProductData, quantity: number) => {},
  toggleCartItemQuantity: (product: ProductData, value: string) => {},
  onRemove: (product: ProductData) => {},
};

const Context = createContext<StateContext>(INITIAL_STATE);

type StateContextProps = {
  children: React.ReactNode;
};

export const StateContext = ({ children }: StateContextProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<ProductData[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onRemove = (product: ProductData) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );

    setCartItems(updatedCartItems);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - product.price * product.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - product.quantity
    );
  };

  const onAdd = (product: ProductData, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity
              ? cartProduct.quantity + quantity
              : quantity,
          };
        else {
          return cartProduct;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const toggleCartItemQuantity = (product: ProductData, value: string) => {
    if (value === 'inc') {
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCartItems(updatedCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (product.quantity > 1) {
        const updatedCartItems = cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        setCartItems(updatedCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
