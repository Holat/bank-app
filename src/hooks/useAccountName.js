import React, { useEffect, useState } from "react";
import axios from "axios";
import { BANK_APIKEY } from "@env";

const useAccountName = ({ bankCode: bank_code, acctNo: account_number }) => {
  const [name, setName] = useState("");
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BANK_APIKEY}`,
    },
  });

  const fetchName = async () => {
    axiosInstance
      .get("https://nubapi.com/api/verify", {
        params: {
          account_number,
          bank_code,
        },
      })
      .then((res) => {
        if (res.data.success === false || res.data.status === false) {
          setName("");
          setLoading(true);
          setError(true);
          setLoading(false);
        } else {
          setError(false);
          setName(res.data.account_name);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setName("");
        setError(true);
      });
  };

  useEffect(() => {
    if (account_number.trim().length === 10 && bank_code != "") {
      fetchName();
    } else {
      setError(false);
      setName("");
      return;
    }
  }, [account_number, bank_code]);

  return {
    name,
    err,
    loading,
  };
};

export default useAccountName;

/**
 * acct num == 10 (status = true && success = undefined)
 * acct num > 10 || < 10 (status = undefined && success = false)
 */
