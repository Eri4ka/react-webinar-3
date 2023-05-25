import {memo, useMemo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import PaginationPage from "./pagination-page";
import { getPagesList } from "../../utils";
import { MAX_LEFT_PAGES_COUNT, DOTS } from '../../constants';
import './style.css';

function Pagination({ itemsTotal, itemsPerPage, currentPage, onSelectPage }){
  const cn = bem('Pagination');

  const pagesCount = itemsTotal ? Math.ceil(itemsTotal / itemsPerPage) : 1;
  const firstPage = 1;
  const lastPage = pagesCount;

  const pagesList = useMemo(() => {
    return getPagesList({ 
      maxLeftPagesCount: MAX_LEFT_PAGES_COUNT,
      dots: DOTS,
      currentPage, 
      firstPage, 
      lastPage, 
      pagesCount 
    })
  }, [MAX_LEFT_PAGES_COUNT, currentPage, firstPage, lastPage, pagesCount])

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {pagesList.map((page, index) => {
          return (
            <PaginationPage 
              key={index} 
              pageContent={page} 
              isActive={currentPage === page}
              isDisabled={page === DOTS}
              onSelectPage={() => onSelectPage(page)}
            />
          )})}
      </ul>
    </div>
  )
}

Pagination.PropTypes={
  itemsTotal: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onSelectPage: PropTypes.func.isRequired
}

export default memo(Pagination);
