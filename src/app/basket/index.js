import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    translation: state.localization.translations
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} path={`articles/${item._id}`} onRemove={callbacks.removeFromBasket} translations={select.translation} />
    }, [callbacks.removeFromBasket]),
  };
  
  return (
    <ModalLayout title={select.translation['ModalBucket.title']} onClose={callbacks.closeModal} translations={select.translation} >
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} translations={select.translation} />
    </ModalLayout>
  );
}

export default memo(Basket);
