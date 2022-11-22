import styles from "./style.module.scss";
import { useMemo } from "react";
import { FormattedNumber } from "react-intl";
import PrevIcon from "@/shared/assets/icons/navigateBefore.svg";
import NextIcon from "@/shared/assets/icons/navigateNext.svg";

function range(start: number, end: number) {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

const DOTS = "...";

interface usePaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
}

export function usePagination({
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 2,
}: usePaginationProps): (typeof DOTS | number)[] {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    if (totalPageCount <= siblingCount + 5) {
      return range(1, totalPageCount);
    }

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    const startSiblingIndex = Math.max(
      currentPage - siblingCount,
      firstPageIndex
    );
    const endSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);

    let middleRange = range(startSiblingIndex, endSiblingIndex);

    const shouldShowStartDots = startSiblingIndex > 2;
    const shouldShowEndDots = endSiblingIndex < totalPageCount - 2;

    return [
      ...(shouldShowStartDots
        ? [firstPageIndex, DOTS as typeof DOTS]
        : range(firstPageIndex, startSiblingIndex - 1)),
      ...middleRange,
      ...(shouldShowEndDots
        ? [DOTS as typeof DOTS, lastPageIndex]
        : range(endSiblingIndex + 1, lastPageIndex)),
    ];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  siblingCount = 2,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className={styles.Pagination}>
      <button
        className={styles.Item}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <NextIcon />
      </button>
      {paginationRange.map((pageNumber, index) =>
        pageNumber === DOTS ? (
          <span key={index} className={styles.Dots}>
            &#8230;
          </span>
        ) : (
          <button
            key={index}
            className={styles.Item}
            data-selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            <FormattedNumber value={pageNumber} useGrouping={false} />
          </button>
        )
      )}
      <button
        className={styles.Item}
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <PrevIcon />
      </button>
    </div>
  );
}
