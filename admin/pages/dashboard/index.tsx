import styles from "./style.module.scss";
import { ReactElement, useState } from "react";
import { FormattedNumber, IntlShape, useIntl } from "react-intl";
import Head from "next/head";
import { AdminUserRole } from "@/shared/types";
import { getDashboard, request } from "@/admin/api";
import Avatar from "@/shared/components/Dashboard/Avatar";
import DashboardLayout from "@/admin/components/Layout";
import DashboardNavLinks from "@/admin/components/NavLinks";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import BarChart from "@/admin/components/BarChart";
import IranMap from "@/admin/components/IranMap";
import DataLoader from "@/shared/components/DataLoader";
import FilterSelect from "@/admin/components/FilterSelect";

function forrmateTime(intl: IntlShape, time: string) {
  if (time.includes("/")) {
    const splitedTime = time.split("/");
    return [
      intl.formatNumber(parseInt(splitedTime[0]), {
        minimumIntegerDigits: 2,
      }),
      intl.formatNumber(parseInt(splitedTime[1]), {
        minimumIntegerDigits: 2,
      }),
    ].join("/");
  } else if (!isNaN(parseInt(time))) {
    return intl.formatNumber(parseInt(time));
  } else {
    return time;
  }
}

export default function DashboardMain() {
  const intl = useIntl();

  const [adminData, setAdminData] = useState<{
    avatar: string | null;
    name: string;
    phoneNumber: string;
    role: AdminUserRole;
  }>({
    avatar: null,
    name: "",
    phoneNumber: "",
    role: {
      name: "admin",
    },
  });

  const [sidebarData, setSidebarData] = useState<{
    countOfInProgressOrders: number;
    countOfPendingCooperations: number;
    countOfPendingWithdrawals: number;
  }>({
    countOfInProgressOrders: 0,
    countOfPendingCooperations: 0,
    countOfPendingWithdrawals: 0,
  });

  const [salesTicker, setSalesTicker] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [salesData, setSalesData] = useState<{
    totalSales: number;
    chart: {
      time: string;
      debtor: number;
      creditor: number;
    }[];
  }>({
    totalSales: 0,
    chart: [],
  });
  const [salesTooltipData, setSalesTooltipData] = useState<{
    item: {
      label: string;
      value: number;
      debtor: number;
      creditor: number;
    };
    position: { left: number; top: number };
  } | null>(null);

  const [usersTicker, setUsersTicker] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [usersData, setUsersData] = useState<{
    totalUsers: number;
    chart: {
      time: string;
      count: number;
    }[];
  }>({
    totalUsers: 0,
    chart: [],
  });
  const [usersTooltipData, setUsersTooltipData] = useState<{
    item: {
      label: string;
      value: number;
    };
    position: { left: number; top: number };
  } | null>(null);

  const [ordersTicker, setOrdersTicker] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [ordersData, setOrdersData] = useState<{
    totalOrders: number;
    chart: {
      time: string;
      count: number;
    }[];
  }>({
    totalOrders: 0,
    chart: [],
  });
  const [ordersTooltipData, setOrdersTooltipData] = useState<{
    item: {
      label: string;
      value: number;
    };
    position: { left: number; top: number };
  } | null>(null);

  const [usersOrdersTicker, setUsersOrdersTicker] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [usersOrdersFilter, setUsersOrdersFilter] = useState<
    "one" | "two" | "three"
  >("one");
  const [usersOrdersData, setUsersOrdersData] = useState<{
    totalUsersWithOneOrder: number;
    totalUsersWithTwoOrder: number;
    totalUsersWithThreeOrder: number;
    chart: {
      time: string;
      count: number;
    }[];
  }>({
    totalUsersWithOneOrder: 0,
    totalUsersWithTwoOrder: 0,
    totalUsersWithThreeOrder: 0,
    chart: [],
  });
  const [usersOrdersTooltipData, setUsersOrdersTooltipData] = useState<{
    item: {
      label: string;
      value: number;
    };
    position: { left: number; top: number };
  } | null>(null);

  const [provincesOrders, setProvincesOrders] = useState<
    Record<
      string,
      {
        sale: number;
        totalOrders: number;
        totalUsers: number;
      }
    >
  >({});

  return (
    <>
      <Head>
        <title>داشبورد</title>
      </Head>
      <SectionHeader title="داشبورد" isAdmin />
      <DataLoader
        load={() => getDashboard()}
        setData={(data) => {
          setAdminData(data.admin);
          setSidebarData(data.sidebarData);
          setSalesData(data.sales);
          setUsersData(data.users);
          setOrdersData(data.orders);
          setUsersOrdersData(data.usersOrders);
          setProvincesOrders(data.provincesOrders);
        }}
      >
        <div className={styles.Container}>
          <div className={styles.NonMobile}>
            <div className={styles.ContentContainer}>
              <div>
                <SectionContent>
                  <div className={styles.ContentHeader}>
                    <div>
                      <div>فروش</div>
                      <FilterSelect
                        options={{
                          daily: "روزانه",
                          weekly: "هفتگی",
                          monthly: "ماهانه",
                        }}
                        value={salesTicker}
                        onChange={setSalesTicker}
                      />
                    </div>
                    <div>
                      <div>
                        <div>کل فروش:</div>
                        <FormattedNumber value={salesData.totalSales} /> تومان
                      </div>
                    </div>
                  </div>
                  <DataLoader
                    load={() =>
                      request({
                        method: "GET",
                        url: `/admins/dashboard/sales/ticker/${salesTicker}`,
                        needAuth: true,
                      }).then(({ data }) => data)
                    }
                    deps={[salesTicker]}
                    setData={setSalesData}
                    initialFetch={false}
                  >
                    <BarChart
                      data={salesData.chart.map(
                        ({ time, creditor, debtor }) => ({
                          label: forrmateTime(intl, time),
                          value: creditor - debtor,
                          creditor,
                          debtor,
                        })
                      )}
                      setTooltipData={setSalesTooltipData}
                      hideY
                    />
                    {salesTooltipData && (
                      <div
                        className={styles.SalesTooltip}
                        style={{
                          left: salesTooltipData.position.left,
                          top: salesTooltipData.position.top,
                        }}
                      >
                        <div>
                          <div>
                            <div>بستانکار:</div>
                            <div>
                              <div>
                                <FormattedNumber
                                  value={salesTooltipData.item.creditor}
                                />
                              </div>
                              <div>تومان</div>
                            </div>
                          </div>
                          <div>
                            <div>بدهکار:</div>
                            <div>
                              <div>
                                <FormattedNumber
                                  value={salesTooltipData.item.debtor}
                                />
                              </div>
                              <div>تومان</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DataLoader>
                </SectionContent>
                <SectionContent>
                  <div className={styles.ContentHeader}>
                    <div>
                      <div>کاربران</div>
                      <FilterSelect
                        options={{
                          daily: "روزانه",
                          weekly: "هفتگی",
                          monthly: "ماهانه",
                        }}
                        value={usersTicker}
                        onChange={setUsersTicker}
                      />
                    </div>
                    <div>
                      <div>
                        <div>کل کاربران:</div>
                        <FormattedNumber value={salesData.totalSales} /> کاربر
                      </div>
                    </div>
                  </div>
                  <DataLoader
                    load={() =>
                      request({
                        method: "GET",
                        url: `/admins/dashboard/users/ticker/${usersTicker}`,
                        needAuth: true,
                      }).then(({ data }) => data)
                    }
                    deps={[usersTicker]}
                    setData={setUsersData}
                    initialFetch={false}
                  >
                    <BarChart
                      data={usersData.chart.map(({ time, count }) => ({
                        label: forrmateTime(intl, time),
                        value: count,
                      }))}
                      setTooltipData={setUsersTooltipData}
                      hideY
                    />
                    {usersTooltipData && (
                      <div
                        className={styles.UsersTooltip}
                        style={{
                          left: usersTooltipData.position.left,
                          top: usersTooltipData.position.top,
                        }}
                      >
                        <div>
                          <FormattedNumber
                            value={usersTooltipData.item.value}
                          />{" "}
                          کاربر
                        </div>
                      </div>
                    )}
                  </DataLoader>
                </SectionContent>
              </div>
              <div>
                <SectionContent>
                  <div className={styles.ContentHeader}>
                    <div>
                      <div>سفارش ها</div>
                      <FilterSelect
                        options={{
                          daily: "روزانه",
                          weekly: "هفتگی",
                          monthly: "ماهانه",
                        }}
                        value={ordersTicker}
                        onChange={setOrdersTicker}
                      />
                    </div>
                    <div>
                      <div>
                        <div>کل سفارشات:</div>
                        <FormattedNumber value={ordersData.totalOrders} /> سفارش
                      </div>
                    </div>
                  </div>
                  <DataLoader
                    load={() =>
                      request({
                        method: "GET",
                        url: `/admins/dashboard/orders/ticker/${ordersTicker}`,
                        needAuth: true,
                      }).then(({ data }) => data)
                    }
                    deps={[ordersTicker]}
                    setData={setOrdersData}
                    initialFetch={false}
                  >
                    <BarChart
                      data={ordersData.chart.map(({ time, count }) => ({
                        label: forrmateTime(intl, time),
                        value: count,
                      }))}
                      setTooltipData={setOrdersTooltipData}
                      hideY
                    />
                    {ordersTooltipData && (
                      <div
                        className={styles.OrdersTooltip}
                        style={{
                          left: ordersTooltipData.position.left,
                          top: ordersTooltipData.position.top,
                        }}
                      >
                        <div>
                          <FormattedNumber
                            value={ordersTooltipData.item.value}
                          />{" "}
                          سفارش
                        </div>
                      </div>
                    )}
                  </DataLoader>
                </SectionContent>
                <SectionContent>
                  <div className={styles.ContentHeader}>
                    <div>
                      <div>کاربر سفارش</div>
                      <FilterSelect
                        options={{
                          daily: "روزانه",
                          weekly: "هفتگی",
                          monthly: "ماهانه",
                        }}
                        value={usersOrdersTicker}
                        onChange={setUsersOrdersTicker}
                      />
                      <FilterSelect
                        options={{
                          one: `${intl.formatNumber(1)} سفارش`,
                          two: `${intl.formatNumber(2)} سفارش`,
                          three: `${intl.formatNumber(3)} سفارش و بیشتر`,
                        }}
                        value={usersOrdersFilter}
                        onChange={setUsersOrdersFilter}
                        maxWidth={150}
                      />
                    </div>
                    <div>
                      <div className={styles.UsersOrdersSeeAll}>
                        مشاهده کل
                        <div className={styles.UsersOrdersSeeAllTooltip}>
                          <div>
                            <div>
                              <FormattedNumber value={1} /> سفارش:
                            </div>
                            <div>{usersOrdersData.totalUsersWithOneOrder}</div>
                            <div>کاربر</div>
                          </div>
                          <div>
                            <div>
                              <FormattedNumber value={2} /> سفارش:
                            </div>
                            <div>{usersOrdersData.totalUsersWithTwoOrder}</div>
                            <div>کاربر</div>
                          </div>
                          <div>
                            <div>
                              <FormattedNumber value={3} /> سفارش و بیشتر:
                            </div>
                            <div>
                              {usersOrdersData.totalUsersWithThreeOrder}
                            </div>
                            <div>کاربر</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DataLoader
                    load={() =>
                      request({
                        method: "GET",
                        url: `/admins/dashboard/users-orders/ticker/${usersOrdersTicker}`,
                        needAuth: true,
                        params: {
                          orders: usersOrdersFilter,
                        },
                      }).then(({ data }) => data)
                    }
                    deps={[usersOrdersTicker, usersOrdersFilter]}
                    setData={setUsersOrdersData}
                    initialFetch={false}
                  >
                    <BarChart
                      data={usersOrdersData.chart.map(({ time, count }) => ({
                        label: forrmateTime(intl, time),
                        value: count,
                      }))}
                      setTooltipData={setUsersOrdersTooltipData}
                      hideY
                    />
                    {usersOrdersTooltipData && (
                      <div
                        className={styles.UsersOrdersTooltip}
                        style={{
                          left: usersOrdersTooltipData.position.left,
                          top: usersOrdersTooltipData.position.top,
                        }}
                      >
                        <div>
                          <FormattedNumber
                            value={usersOrdersTooltipData.item.value}
                          />{" "}
                          کاربر
                        </div>
                      </div>
                    )}
                  </DataLoader>
                </SectionContent>
              </div>
              <SectionContent>
                <div className={styles.ContentHeader}>
                  <div>
                    <div>سفارش بر اساس استان</div>
                  </div>
                </div>
                <IranMap data={provincesOrders} />
              </SectionContent>
            </div>
          </div>
          <div className={styles.Mobile}>
            <div className={styles.User}>
              <Avatar user={adminData} />
              <div className={styles.Meta}>
                <div className={styles.UserRole}>
                  {
                    {
                      superAdmin: "سوپر ادمین",
                      admin: "ادمین",
                      agent: "نمایندگی",
                    }[adminData.role.name]
                  }
                </div>
                <div className={styles.Name}>{adminData.name}</div>
              </div>
            </div>
            <div className={styles.Welcome}>خوش‌آمدی!</div>
            <DashboardNavLinks sidebarData={sidebarData} />
          </div>
        </div>
      </DataLoader>
    </>
  );
}

DashboardMain.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
