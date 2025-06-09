
import { useAddOrderMutation } from "../../api/api";
import { selectCartPizza } from "../../redux/cart/cartSelectors";
import { useAppSelector } from "../../redux/store";
import { OrderForm } from "./OrderForm/OrderForm";




export const Order = () => {
    const cartPizzas = useAppSelector(selectCartPizza);
    const [createOrder, { data }] = useAddOrderMutation();



    return (
        <div>
            <h3>Placing an order</h3>
            <OrderForm />
        </div>
    )
};