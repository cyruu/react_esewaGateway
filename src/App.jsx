import "./App.css";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { useState } from "react";
function App() {
  // esewa
  const [formData, setFormData] = useState({
    amount: "1000",
    tax_amount: "0",
    total_amount: "1000",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: `http://localhost:5173/paymentsuccess`,
    failure_url: `http://localhost:5173/paymentfailed`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
    return hashedSignature;
  };
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;

    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );
    setFormData({ ...formData, signature: hashedSignature });
  }, []);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input
        type="text"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={({ target }) =>
          setFormData({ ...formData, amount: target.value })
        }
        required
      />
      <input
        type="text"
        id="tax_amount"
        name="tax_amount"
        value={formData.tax_amount}
        onChange={({ target }) =>
          setFormData({ ...formData, tax_amount: target.value })
        }
        required
      />
      <input
        type="text"
        id="total_amount"
        name="total_amount"
        value={formData.total_amount}
        onChange={({ target }) =>
          setFormData({ ...formData, total_amount: target.value })
        }
        required
      />
      <input
        type="text"
        id="transaction_uuid"
        name="transaction_uuid"
        value={formData.transaction_uuid}
        onChange={({ target }) =>
          setFormData({ ...formData, transaction_uuid: target.value })
        }
        required
      />
      <input
        type="text"
        id="product_code"
        name="product_code"
        value={formData.product_code}
        onChange={({ target }) =>
          setFormData({ ...formData, product_code: target.value })
        }
        required
      />
      <input
        type="text"
        id="product_service_charge"
        name="product_service_charge"
        value={formData.product_service_charge}
        onChange={({ target }) =>
          setFormData({ ...formData, product_service_charge: target.value })
        }
        required
      />
      <input
        type="text"
        id="product_delivery_charge"
        name="product_delivery_charge"
        value={formData.product_delivery_charge}
        onChange={({ target }) =>
          setFormData({ ...formData, product_delivery_charge: target.value })
        }
        required
      />
      <input
        type="text"
        id="success_url"
        name="success_url"
        defaultValue={formData.success_url}
        required
      />
      <input
        type="text"
        id="failure_url"
        name="failure_url"
        defaultValue={formData.failure_url}
        required
      />
      <input
        type="text"
        id="signed_field_names"
        name="signed_field_names"
        defaultValue="total_amount,transaction_uuid,product_code"
        required
      />
      <input
        type="text"
        id="signature"
        name="signature"
        defaultValue={formData.signature}
        required
      />
      <input value="Submit" type="submit" />
    </form>
  );
}

export default App;
