import styles from "./style.module.scss";
import React, {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";
import {
  useFloating,
  offset,
  flip,
  useListNavigation,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  FloatingFocusManager,
  autoUpdate,
  size,
} from "@floating-ui/react-dom-interactions";
import ExpandMoreIcon from "@/shared/assets/icons/expandMore.svg";
interface SelectProps {
  placeholder?: string;
  options: Record<string, string>;
  value: string | null;
  onChange: (newValue: any) => void;
  varient?:
    | "outlined"
    | "shadow"
    | "inset-shadow"
    | "shadow-without-bg"
    | "inset-shadow-without-bg";
  readOnly?: boolean;
  height?: number;
}

export default function Select({
  placeholder,
  options,
  onChange,
  varient = "outlined",
  value,
  readOnly,
  height = 40,
}: SelectProps) {
  const listElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const listValueRef = useRef<string[]>([]);
  const listLabelsRef = useRef<string[]>([]);

  useMemo(() => {
    const newListElements: (HTMLDivElement | null)[] = [];
    const newListValue: string[] = [];
    const newListLabels: string[] = [];

    const existingElements: Record<string, HTMLDivElement | null> = {};
    listValueRef.current.forEach((itemValue, index) => {
      existingElements[itemValue] = listElementsRef.current[index];
    });

    Object.entries(options).forEach(([itemValue, itemLabel]) => {
      newListElements.push(
        existingElements[itemValue] ? existingElements[itemValue] : null
      );
      newListValue.push(itemValue);
      newListLabels.push(itemLabel);
    });

    listElementsRef.current = newListElements;
    listValueRef.current = newListValue;
    listLabelsRef.current = newListLabels;
  }, [options]);

  const [open, setOpen] = useState(false);
  const selectedIndex =
    value !== null ? Math.max(0, listValueRef.current.indexOf(value)) : value;
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
      offset(-height),
      flip({ padding: 8 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${Math.min(availableHeight, 300)}px`,
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
      useTypeahead(context, {
        listRef: listLabelsRef,
        onMatch: open
          ? setActiveIndex
          : (index) => onChange(listValueRef.current[index]),
        activeIndex,
        selectedIndex,
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

  const selectClassName = [styles.Select];
  switch (varient) {
    case "outlined":
      selectClassName.push(styles.Outlined);
      break;
    case "shadow":
      selectClassName.push(styles.Shadow);
      break;
    case "inset-shadow":
      selectClassName.push(styles.InsetShadow);
      break;
    case "shadow-without-bg":
      selectClassName.push(styles.ShadowWithoutBg);
      break;
    case "inset-shadow-without-bg":
      selectClassName.push(styles.InsetShadowWithoutBg);
      break;
  }
  if (readOnly) {
    selectClassName.push(styles.ReadOnly);
  }
  if (open) {
    selectClassName.push(styles.IsOpen);
  }

  const dropdownClassName = [styles.Dropdown];
  switch (varient) {
    case "outlined":
      dropdownClassName.push(styles.Outlined);
      break;
    case "shadow":
    case "inset-shadow":
    case "shadow-without-bg":
    case "inset-shadow-without-bg":
      dropdownClassName.push(styles.Shadow);
      break;
  }

  function handleSelect(index: number) {
    onChange(listValueRef.current[index]);
    setOpen(false);
    setActiveIndex(null);
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSelect.apply(null, [index]);
    }

    if (event.key === " ") {
      event.preventDefault();
    }
  }

  function handleKeyUp(index: number, event: React.KeyboardEvent) {
    if (event.key === " " && !context.dataRef.current.typing) {
      handleSelect.apply(null, [index]);
    }
  }

  return (
    <>
      <div
        {...getReferenceProps({
          ref: reference,
          className: selectClassName.join(" "),
          tabIndex: 0,
          style: {
            height,
            borderRadius: Math.round(height / 2),
          },
        })}
      >
        <div className={styles.Text}>
          <div>
            {selectedIndex !== null ? (
              <div>{listLabelsRef.current[selectedIndex]}</div>
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
              className: dropdownClassName.join(" "),
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                borderRadius: Math.round(height / 2),
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
              {listLabelsRef.current.map((label, index) => (
                <div
                  key={listValueRef.current[index]}
                  role="option"
                  ref={(node) => (listElementsRef.current[index] = node)}
                  tabIndex={activeIndex === index ? 0 : 1}
                  aria-selected={activeIndex === index}
                  data-selected={selectedIndex === index}
                  {...getItemProps({
                    onClick: handleSelect.bind(null, index),
                    onKeyDown: handleKeyDown.bind(null, index),
                    onKeyUp: handleKeyUp.bind(null, index),
                    style: {
                      height,
                    },
                  })}
                >
                  <div>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
