import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getTransactions } from "@/main/api";
import { Transaction } from "@/shared/types";
import DashboardLayout from "@/main/components/Dashboard/Layout";
import SectionHeader from "@/shared/components/Dashboard/SectionHeader";
import SectionContent from "@/shared/components/Dashboard/SectionContent";
import ContentHeader from "@/shared/components/Dashboard/ContentHeader";
import MobileContentHeader from "@/shared/components/Dashboard/MobileContentHeader";
import TransactionTable from "@/main/components/Dashboard/TransactionTable";
import EmptyNote from "@/shared/components/Dashboard/EmptyNote";
import DataLoader from "@/shared/components/DataLoader";

export default function DashboardTransactions() {
  const router = useRouter();

  const [data, setData] = useState<{
    countOfItems: number;
    transactions: Transaction[];
  }>({ countOfItems: 0, transactions: [] });

  const [page, setPage] = useState(1);

  return (
    <>
      <Head>
        <title>داشبورد - تراکنش های انجام شده</title>
      </Head>
      <SectionHeader
        title="تراکنش های انجام شده"
        description="سوابق مالی خود را از این قسمت مشاهده کنید"
      />
      <SectionContent>
        <ContentHeader title="کل سوابق مالی" />
        <MobileContentHeader backTo="/dashboard" title="تراکنش ها" />
        <DataLoader load={() => getTransactions(page)} setData={setData}>
          <TransactionTable
            transactions={data.transactions}
            onSeeDetails={(orderId) => {
              router.push(
                `/dashboard/orders/${orderId}/details?fromTransactions=true`,
              );
            }}
          />
          {!data.transactions.length && (
            <EmptyNote>شما هیچ تراکنشی ندارید</EmptyNote>
          )}
        </DataLoader>
      </SectionContent>
    </>
  );
}

DashboardTransactions.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
