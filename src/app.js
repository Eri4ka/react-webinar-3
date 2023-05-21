import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/layout/page-layout";
import Basket from "./components/basket";
import BasketModal from './components/basket-modal';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const { basket, basketSum, basketCount, list } = store.getState();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const callbacks = {
    onDeleteItemFromBasket: useCallback((item) => {
      store.deleteItemFromBasket(item);
    }, [store]),

    onAddToBasketItem: useCallback((item) => {
      store.addToBasketItem(item) 
    }, [store]),

    onToggleModal: () => {
      setIsModalOpen((current) => !current);
    }
  }

  return (
    <>
      <PageLayout>
        <Head title='Приложение на чистом JS'/>
        <Basket 
          count={basketCount} 
          sum={basketSum} 
          onToggleModal={callbacks.onToggleModal} 
        />
        <List 
          list={list}
          onItemClick={callbacks.onAddToBasketItem}
          buttonItemTitle='Добавить'
          ItemComponent={Item}
        />
      </PageLayout>
      {isModalOpen && (
        <BasketModal 
          basket={basket} 
          sum={basketSum} 
          onClose={callbacks.onToggleModal} 
          onDelete={callbacks.onDeleteItemFromBasket}
        />
      )}
    </>
  );
}

export default App;
