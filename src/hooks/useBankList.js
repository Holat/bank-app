import axios from "axios";
import React, { useEffect, useState } from "react";

const useBankList = () => {
  const [list, setList] = useState();
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState(list);

  const handleSearch = (text) => {
    setSearch(text);
  };

  const fetchData = async () => {
    axios({
      method: "get",
      url: "https://nigerianbanks.xyz",
      responseType: "json",
    })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
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
  };
};

export default useBankList;
