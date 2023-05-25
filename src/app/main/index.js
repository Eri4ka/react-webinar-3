import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import { ITEMS_PER_PAGE } from '../../constants';
import Loader from '../../components/loader';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    catalogCurrentPage: state.catalog.currentPage,
    catalogListCount: state.catalog.count,
    catalogLoadingStatus: state.catalog.loadingStatus
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.catalogCurrentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Установить текущую страницу каталога
    setCurrentPage: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount}
        sum={select.sum}
      />
      {select.catalogLoadingStatus === 'idle' && (
        <>
          <List list={select.list} renderItem={renders.item}/>
          <Pagination 
            itemsTotal={select.catalogListCount - ITEMS_PER_PAGE} 
            itemsPerPage={ITEMS_PER_PAGE} 
            currentPage={select.catalogCurrentPage} 
            onSelectPage={callbacks.setCurrentPage} 
          />
        </>
      )}
      {select.catalogLoadingStatus === 'loading' && <Loader />}
    </PageLayout>

  );
}

export default memo(Main);
