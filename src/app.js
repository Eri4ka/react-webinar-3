import React, {useCallback} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/layout/page-layout";
import Basket from "./components/basket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const { basket, list } = store.getState();

  const callbacks = {
    onDeleteItemFromBasket: useCallback((item) => {
      store.deleteItemFromBasket(item);
    }, [store]),

    onAddToBasketItem: useCallback((item) => {
      store.addToBasketItem(item) 
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS'/>
      <Basket basket={basket} onDeleteItem={callbacks.onDeleteItemFromBasket}/>
      <List 
        list={list}
        onItemClick={callbacks.onAddToBasketItem}
        buttonItemTitle='Добавить'
      />
    </PageLayout>
  );
}

export default App;
