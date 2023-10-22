import { useEffect, useState } from "react";
import axios from "axios";
import { BANK_APIKEY } from "@env";

const useAccountName = ({ bankCode: bank_code, acctNo: account_number }) => {
  const [name, setName] = useState("");
  const [err, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BANK_APIKEY}`,
    },
  });

  const fetchName = async () => {
    setLoading(true);
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
          setError(true);
        } else {
          setError(false);
          setName(res.data.account_name);
        }
      })
      .catch((err) => {
        console.log(err);
        setName("");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setName("");
    setError(false);
    if (account_number.trim().length === 10 && bank_code != "") {
      fetchName();
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
