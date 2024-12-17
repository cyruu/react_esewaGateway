import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [search] = useSearchParams();
  const dataQuery = search.get("data");
  const [data, setData] = useState({});

  useEffect(() => {
    const resData = atob(dataQuery);
    const resObject = JSON.parse(resData);
    setData(resObject);
  }, [search]);
  return (
    <>
      <div>Payment Success</div>
      <p>Total : {data.total_amount}</p>
      <p>Status : {data.status}</p>
    </>
  );
};

export default PaymentSuccess;
