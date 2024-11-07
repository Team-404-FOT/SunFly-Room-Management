import React, { useState, useEffect } from 'react';
import { Table } from "flowbite-react";

function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/bookings/payment-history")
      .then((response) => response.json())
      .then((data) => setPaymentHistory(data))
      .catch((error) => console.error("Error fetching payment history:", error));
  }, []);

  return (
    <div className='p-5 bg-gray-100 h-full'>
        <h1 className="text-2xl mb-2">Payment History</h1>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Payment ID</Table.HeadCell>
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>AC Type</Table.HeadCell>
            <Table.HeadCell>Room Type</Table.HeadCell>
            <Table.HeadCell>Payment Method</Table.HeadCell>
            <Table.HeadCell>Payment Date</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {paymentHistory.length > 0 ? (
              paymentHistory.map((payment) => (
                <Table.Row key={payment.payId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {payment.payId}
                  </Table.Cell>
                  <Table.Cell>{payment.cusName}</Table.Cell>
                  <Table.Cell>{payment.roomNum}</Table.Cell>
                  <Table.Cell>{payment.acType}</Table.Cell>
                  <Table.Cell>{payment.type}</Table.Cell>
                  <Table.Cell>{payment.paymentMethod}</Table.Cell>
                  <Table.Cell>{payment.checkOut}</Table.Cell>
                  <Table.Cell>{payment.amount}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="8" className="text-center text-gray-500">
                  No payment history available.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default PaymentHistory;
