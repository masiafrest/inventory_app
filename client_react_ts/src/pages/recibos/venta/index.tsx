import React from "react";
import OrderTableContainer from "./components/orderTable/OrderTableContainer";
import HeaderTable from "./components/headerTable/HeaderTable";

export default function ReciboContainer() {
  return (
    <>
      <HeaderTable />
      <OrderTableContainer />
    </>
  );
}
