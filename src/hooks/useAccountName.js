import React, { useEffect, useState } from "react";
import axios from "axios";

const useAccountName = () => {
  const [name, setName] = useState("");
  const [err, setError] = useState(false);
  const accountNumber = "0558108161";
  const bankCode = "058";

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer xhP71VduKeKGxFxqwqR21SYhBXvF9yvhrPmuOAB53bd77a29`,
    },
  });

  const fetchName = async () => {
    axiosInstance
      .get("https://nubapi.com/api/verify", {
        params: {
          account_number: accountNumber,
          bank_code: bankCode,
        },
      })
      .then((res) => {
        setName(res.data.account_name);
        setError(false);
        console.log(res.data.status);
        console.log(res.data.success);
      })
      .catch((err) => {
        console.log(err);
        setName("");
        setError(true);
      });
  };

  useEffect(() => {
    fetchName();
  }, []);

  return {
    name,
    err,
  };
};

export default useAccountName;

/**
 * acct num == 10 (status = true && success = undefined)
 * acct num > 10 || < 10 (status = undefined && success = false)
 */
