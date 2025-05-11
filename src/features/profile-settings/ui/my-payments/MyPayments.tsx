"use client";

import { useState } from "react";
import styles from "./MyPayments.module.css";
import { Pagination } from "@/shared/ui/pagination/pagination";
import { useGetPaymentInfoQuery } from "@/features/profile-settings/api/profileSettings.api";

export const MyPayments = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { data: payments } = useGetPaymentInfoQuery();

  const paginatedData =
    payments?.slice((page - 1) * rowsPerPage, page * rowsPerPage) ?? [];

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Date of Payment</th>
            <th className={styles.th}>End date of subscription</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Subscription Type</th>
            <th className={styles.th}>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.subscriptionId}>
              <td className={styles.td}>{row.dateOfPayment}</td>
              <td className={styles.td}>{row.endDateOfSubscription}</td>
              <td className={styles.td}>${row.price}</td>
              <td className={styles.td}>{row.subscriptionType}</td>
              <td className={styles.td}>{row.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalItems={payments?.length ?? 0}
        itemsPerPage={rowsPerPage}
        onPageChange={setPage}
        onItemsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};
