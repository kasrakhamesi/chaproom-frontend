import styles from "./style.module.scss";
import { useRef, useEffect } from "react";
import CustomerList from "@/main/assets/json/customers.json";

export default function OurCustomers() {
  const customerListContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!customerListContainerRef.current) return;
    const customerListContainer = customerListContainerRef.current;
    const customerListItems = Array.from(customerListContainer.children);
    let currentIndex = 0;
    const startCloneItems: HTMLElement[] = [];
    const endCloneItems: HTMLElement[] = [];
    let currentCloneIndex;

    currentCloneIndex = customerListItems.length - 1;
    do {
      const cloneElement = document.createElement("div");
      cloneElement.innerHTML = customerListItems[currentCloneIndex].innerHTML;
      startCloneItems.push(cloneElement);
      customerListContainer.prepend(cloneElement);

      currentCloneIndex -= 1;
    } while (
      startCloneItems.reduce(
        (result, child, index) =>
          index === 0 ? result : result + child.clientWidth + 50,
        0
      ) < 682.5 &&
      currentCloneIndex >= 0
    );

    currentCloneIndex = 0;
    do {
      const cloneElement = document.createElement("div");
      cloneElement.innerHTML = customerListItems[currentCloneIndex].innerHTML;
      endCloneItems.push(cloneElement);
      customerListContainer.append(cloneElement);

      currentCloneIndex += 1;
    } while (
      endCloneItems.reduce(
        (result, child, index) =>
          index === 0 ? result : result + child.clientWidth + 50,
        0
      ) < 682.5 &&
      currentCloneIndex < customerListItems.length
    );

    function setCurrentItem(itemIndex: number) {
      currentIndex = itemIndex;

      let itemOffset = 0;
      startCloneItems.forEach((child, index) => {
        if (-(index + 1) < itemIndex) {
          itemOffset += child.clientWidth + 50;
        }
      });
      customerListItems.forEach((child, index) => {
        if (index < itemIndex) {
          itemOffset += child.clientWidth + 50;
        }
      });

      const offset =
        itemOffset -
        (customerListContainer.parentElement?.clientWidth || 0) / 2 +
        (itemIndex >= 0
          ? customerListItems[itemIndex].clientWidth / 2
          : startCloneItems[-(itemIndex + 1)].clientWidth / 2);
      customerListContainer.style.transform = `translateX(${offset}px)`;
    }
    customerListContainer.style.transition = "none";
    setCurrentItem(0);
    console.log(setCurrentItem);
    setTimeout(() => customerListContainer.style.removeProperty("transition"));

    const interval = setInterval(() => {
      setCurrentItem(currentIndex + 1);

      if (currentIndex + 1 >= customerListItems.length) {
        setTimeout(() => {
          customerListContainer.style.transition = "none";
          setCurrentItem(currentIndex - customerListItems.length);
          setTimeout(() => {
            customerListContainer.style.removeProperty("transition");
          }, 100);
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.OurCustomers}>
      <h1>مشتریان چاپ روم</h1>
      <div>
        <div ref={customerListContainerRef}>
          {CustomerList.map(({ title, image }, index) => (
            <div key={index}>
              <img src={image} alt={title} title={title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
