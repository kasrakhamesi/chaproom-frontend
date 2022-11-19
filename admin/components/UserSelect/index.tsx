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
import { User } from "@/shared/types";
import { request } from "@/admin/api";
import ExpandMoreIcon from "@/shared/assets/icons/expandMore.svg";
import TextInput from "@/shared/components/TextInput";
import SmallLoader from "@/shared/components/SmallLoader";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import Button from "@/shared/components/Button";

type UserSelectProps =
  | {
      placeholder?: undefined;
      value: User;
      onChange: (newValue: User) => void;
      readOnly?: boolean;
    }
  | {
      placeholder?: string;
      value: User | null;
      onChange: (newValue: User) => void;
      readOnly?: boolean;
    };

export default function UserSelect({
  placeholder = "کاربر را نتخاب کنید ...",
  onChange,
  value,
  readOnly,
}: UserSelectProps) {
  const listElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const listUsersRef = useRef<User[]>([]);
  const [search, setSearch] = useState("");
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const selectedIndex = listUsersRef.current.includes(value!)
    ? listUsersRef.current.indexOf(value!)
    : null;
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
      offset(-60),
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
        selectedIndex,
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

  const { users, page, hasMore, loadMore, retry, loading, error } =
    useUsersSearch(search);
  listUsersRef.current = users;
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
        <div>
          <div>
            {value ? (
              <div className={styles.User}>
                <div>{value.name}</div>
                <div>{value.phoneNumber}</div>
              </div>
            ) : (
              <div className={styles.Placeholder}>{placeholder}</div>
            )}
          </div>
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
            <div>
              <TextInput
                inputProps={{ placeholder: "جستجو ..." }}
                value={search}
                onChange={setSearch}
              />
            </div>
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
              {users.map((user, index) => (
                <div
                  key={user.id}
                  role="option"
                  ref={(node) => (listElementsRef.current[index] = node)}
                  tabIndex={activeIndex === index ? 0 : 1}
                  aria-selected={activeIndex === index}
                  data-selected={selectedIndex === index}
                  {...getItemProps({
                    onClick: () => {
                      onChange(user);
                      setOpen(false);
                      setActiveIndex(null);
                    },
                    onKeyPress: (event: React.KeyboardEvent) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onChange(user);
                        setOpen(false);
                        setActiveIndex(null);
                      }
                    },
                  })}
                >
                  <div>{user.name}</div>
                  <div>{user.phoneNumber}</div>
                </div>
              ))}
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
              {!loading && !hasMore && !users.length && (
                <EmptyNote>هیچ کاربری وجود ندارد</EmptyNote>
              )}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

function useUsersSearch(searchQuery: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (page === 0) return;

    setPage(1);
    setUsers([]);
    setHasMore(true);
  }, [searchQuery]);

  function fetchUsers() {
    if (page === 0) return;

    const abortController = new AbortController();

    setError(false);
    setLoading(true);
    request({
      method: "GET",
      url: "/admins/users",
      needAuth: true,
      params: {
        search: searchQuery,
        page,
      },
      signal: abortController.signal,
    })
      .then(({ data }) => {
        const ids: string[] = [];
        setUsers((users) =>
          [...users, ...data.users].filter((user) => {
            if (ids.includes(user.id)) return false;
            ids.push(user.id);
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

  useEffect(fetchUsers, [searchQuery, page]);

  function loadMore() {
    setPage(page + 1);
  }

  function retry() {
    fetchUsers();
  }

  return {
    users,
    page,
    hasMore,
    loadMore,
    retry,
    loading,
    error,
  };
}
