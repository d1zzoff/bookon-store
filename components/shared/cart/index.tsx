import { getCart } from "@/lib/actions/cart";
import { CartButton } from "./cart-button";

export const Cart = async () => {
  const data = await getCart();

  const totalPrice = data?.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return <CartButton data={data} totalPrice={totalPrice} />;
};
