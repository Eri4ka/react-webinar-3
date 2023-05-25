import {useCallback, useContext, useEffect, useState} from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from './article';
import NotFound from './notfound';
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="articles/:articleId" element={<Article/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
