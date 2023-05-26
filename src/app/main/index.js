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
import SubHeadLayout from '../../components/subhead-layout';
import Navbar from '../../components/navbar';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    catalogCurrentPage: state.catalog.currentPage,
    catalogListCount: state.catalog.count,
    catalogLoadingStatus: state.catalog.loadingStatus,
    translation: state.localization.translations,
    currentLang: state.localization.currentLang,
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
    setCurrentPage: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store]),
    // Установить язык интерфейса
    setLanguage: useCallback((lang) => store.actions.localization.setLanguage(lang), [store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} path={`articles/${item._id}`} onAdd={callbacks.addToBasket} translations={select.translation} />
    }, [callbacks.addToBasket, select.translation]),
  };

  const navList = [
    {
      title: select.translation['NavbarMain.title'],
      path: '/'
    }
  ]

  return (
    <PageLayout>
      <Head 
        title={select.translation['MainHead.title']} 
        onChangeLanguage={callbacks.setLanguage}
        currentLang={select.currentLang}
        translations={select.translation}
      />
      <SubHeadLayout>
        <Navbar list={navList} />
        <BasketTool 
          onOpen={callbacks.openModalBasket} 
          amount={select.amount}
          sum={select.sum}
          translations={select.translation}
        />
      </SubHeadLayout>
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
