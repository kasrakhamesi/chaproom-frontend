import styles from "./style.module.scss";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import {
  useFloating,
  offset,
  flip,
  useListNavigation,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  FloatingFocusManager,
  autoUpdate,
  size,
} from "@floating-ui/react-dom-interactions";
import axios from "axios";
import { PostCategory } from "@/shared/types";
import { request } from "@/admin/api";
import ExpandMoreIcon from "@/shared/assets/icons/expandMore.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import SmallLoader from "@/shared/components/SmallLoader";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import Button from "@/shared/components/Button";
import CheckBox from "@/shared/components/CheckBox";

type PostCategoryMultiSelectProps = {
  placeholder?: string;
  value: PostCategory[];
  onSelectCategory: (category: PostCategory) => void;
  onUnSelectCategory: (category: PostCategory) => void;
  readOnly?: boolean;
};

export default function PostCategoryMultiSelect({
  placeholder = "دسته بندی را نتخاب کنید ...",
  onSelectCategory,
  onUnSelectCategory,
  value,
  readOnly,
}: PostCategoryMultiSelectProps) {
  const inputContentRef = useRef<HTMLDivElement | null>(null);
  const listElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const listCategoriesRef = useRef<PostCategory[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState(false);

  if (!open && pointer) {
    setPointer(false);
  }

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(-(inputContentRef.current?.clientHeight || 40) - 2),
      flip({ padding: 8 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            height: `${Math.min(availableHeight, 400)}px`,
          });
        },
        padding: 8,
      }),
    ],
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context, {
        enabled: !readOnly,
      }),
      useRole(context, { role: "listbox" }),
      useDismiss(context),
      useListNavigation(context, {
        listRef: listElementsRef,
        activeIndex,
        onNavigate: setActiveIndex,
        enabled: !readOnly,
      }),
    ]
  );

  (typeof document !== "undefined" ? useLayoutEffect : useEffect)(() => {
    if (open && activeIndex != null && !pointer) {
      requestAnimationFrame(() => {
        listElementsRef.current[activeIndex]?.scrollIntoView({
          block: "nearest",
        });
      });
    }
  }, [open, activeIndex, pointer]);

  const { categories, page, hasMore, loadMore, retry, loading, error } =
    useCategories();
  listCategoriesRef.current = categories;
  useEffect(() => {
    if (open && page === 0) {
      loadMore();
    }
  }, [open]);

  const selectClassName = [styles.Select];
  if (readOnly) {
    selectClassName.push(styles.ReadOnly);
  }
  if (open) {
    selectClassName.push(styles.IsOpen);
  }

  return (
    <>
      <div
        {...getReferenceProps({
          ref: reference,
          className: selectClassName.join(" "),
          tabIndex: 0,
        })}
      >
        <div ref={inputContentRef}>
          {value.length ? (
            <div className={styles.Categories}>
              {value.map((category) => (
                <div
                  key={category.id}
                  onClick={(event) => event.stopPropagation()}
                >
                  {category.name}
                  <button
                    className={styles.UnSelectButton}
                    onClick={() => onUnSelectCategory(category)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.Placeholder}>{placeholder}</div>
          )}
        </div>
        <ExpandMoreIcon className={styles.ExpandMore} />
      </div>
      {open && (
        <FloatingFocusManager context={context} preventTabbing>
          <div
            {...getFloatingProps({
              ref: floating,
              className: styles.Dropdown,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              },
              onPointerMove() {
                setPointer(true);
              },
              onKeyDown(event) {
                setPointer(false);

                if (event.key === "Tab") {
                  setOpen(false);
                }
              },
            })}
          >
            <div
              onScroll={(event) => {
                if (loading || error || !hasMore) return;

                const itemsContainer = event.target as HTMLDivElement;
                if (
                  itemsContainer.scrollHeight -
                    (itemsContainer.clientHeight + itemsContainer.scrollTop) -
                    (loaderRef.current?.clientHeight || 0) <=
                  0
                ) {
                  loadMore();
                }
              }}
            >
              {categories.map((category, index) => {
                const isSelected = value
                  .map((item) => item.id)
                  .includes(category.id);
                return (
                  <div
                    key={category.id}
                    role="option"
                    ref={(node) => (listElementsRef.current[index] = node)}
                    tabIndex={activeIndex === index ? 0 : 1}
                    aria-selected={activeIndex === index}
                    data-selected={isSelected}
                    {...getItemProps({
                      onClick: () => {
                        if (!isSelected) {
                          onSelectCategory(category);
                        } else {
                          onUnSelectCategory(category);
                        }
                        setActiveIndex(null);
                      },
                      onKeyPress: (event: React.KeyboardEvent) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          if (!isSelected) {
                            onSelectCategory(category);
                          } else {
                            onUnSelectCategory(category);
                          }
                          setActiveIndex(null);
                        }
                      },
                    })}
                  >
                    <CheckBox
                      checked={isSelected}
                      onChange={(newValue) =>
                        newValue
                          ? onSelectCategory(category)
                          : onUnSelectCategory(category)
                      }
                    />
                    {category.name}
                  </div>
                );
              })}
              {hasMore && (
                <div className={styles.Loader} ref={loaderRef}>
                  {loading && <SmallLoader />}
                  {error && (
                    <Button varient="filled" onClick={retry}>
                      سعی مجدد
                    </Button>
                  )}
                </div>
              )}
              {!loading && !hasMore && !categories.length && (
                <EmptyNote>هیچ دسته بندی وجود ندارد</EmptyNote>
              )}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

function useCategories() {
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function fetchCategories() {
    if (page === 0) return;

    const abortController = new AbortController();

    setError(false);
    setLoading(true);
    request({
      method: "GET",
      url: "/admins/blogs/categories",
      needAuth: true,
      params: {
        page,
      },
      signal: abortController.signal,
    })
      .then(({ data }) => {
        const ids: string[] = [];
        setCategories((categories) =>
          [...categories, ...data.categories].filter((category) => {
            if (ids.includes(category.id)) return false;
            ids.push(category.id);
            return true;
          })
        );
        setHasMore(data.totalCountLeft > 0);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      })
      .finally(() => setLoading(false));

    return () => abortController.abort();
  }

  useEffect(fetchCategories, [page]);

  function loadMore() {
    setPage(page + 1);
  }

  function retry() {
    fetchCategories();
  }

  return {
    categories,
    page,
    hasMore,
    loadMore,
    retry,
    loading,
    error,
  };
}
