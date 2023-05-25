import {memo, useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Loader from '../../components/loader';
import ArticleInfo from '../../components/article-info';

function Article() {
  const { articleId } = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    article: state.article.info,
    articleLoadingStatus: state.article.loadingStatus,
    basketAmount: state.basket.amount,
    basketSum: state.basket.sum,
  }));
  
  useEffect(() => {
    store.actions.article.loadArticle(articleId);
  }, [articleId]);


  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout> 
      {select.articleLoadingStatus === 'idle' && (
        <>
          <Head title={select.article?.title} />
          <BasketTool 
            onOpen={callbacks.openModalBasket} 
            amount={select.basketAmount}
            sum={select.basketSum}
          />
          <ArticleInfo article={select.article} onAdd={callbacks.addToBasket} />
        </>
      )}
      {select.articleLoadingStatus === 'loading' && <Loader />}
    </PageLayout>
  );
}

export default memo(Article);
