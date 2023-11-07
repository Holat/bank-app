const getTime = (data) => {
  if (data) {
    const timeArr = data?.split("T")[1]?.split(":", 2);
    const time = `${timeArr[0]}:${timeArr[1]}`;
    return time;
  } else {
    return "";
  }
};

export default getTime;
