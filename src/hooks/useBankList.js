import axios from "axios";
import React, { useEffect, useState } from "react";

const useBankList = () => {
  const [list, setList] = useState();
  const [search, setSearch] = useState("");
  const [error, setError] = useState({ Error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState(list);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const fetchData = async () => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://nigerianbanks.xyz",
      responseType: "json",
    })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        setList(list);
        setError({ Error: true, message: "Check your network connection" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchList(list);
    } else {
      const searchTerm = search.toLowerCase();
      const filteredList = list.filter(({ name }) =>
        name.toLowerCase().startsWith(searchTerm)
      );
      setSearchList(filteredList);
    }
  }, [list, search]);

  return {
    searchList,
    handleSearch,
    setSearch,
    loading,
    error,
  };
};

export default useBankList;
