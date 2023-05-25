import { useCallback } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";


function NotFound() {

  const store = useStore();

  const select = useSelector(state => ({
    basketAmount: state.basket.amount,
    basketSum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout> 
      <Head title='Страница не найдена' />
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.basketAmount}
        sum={select.basketSum}
      />
    </PageLayout>
  );
}

export default NotFound;
