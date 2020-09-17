import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

require("dayjs/locale/tr");

const DecideDate = (props) => {
  dayjs.extend(relativeTime);
  let dateSent = props.dateSent;

  return `${dayjs(dateSent).locale("tr").fromNow()}`;
};

export default DecideDate;
