import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];
const fliterOption = [
  { value: "all", name: "모두다" },
  { value: "weather1", name: "화창함" },
  { value: "weather2", name: "구름 낌" },
  { value: "weather3", name: "눈 내림" },
  { value: "weather4", name: "비 내림" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [fliter, setFliter] = useState("all");

  const getProcessDiaryList = () => {
    const fliterCallBack = (item) => {
      if (fliter === "weather1" && item.weather === 1) {
        return true;
      } else if (fliter === "weather2" && item.weather === 2) {
        return true;
      } else if (fliter === "weather3" && item.weather === 3) {
        return true;
      } else if (fliter === "weather4" && item.weather === 4) {
        return true;
      }
      return false;
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const fliteredList =
      fliter === "all" ? copyList : copyList.fliter((it) => fliterCallBack(it));

    const sortedList = fliteredList.sort(compare);
    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="meun_warpper">
      <div className="left_col">
        <ControlMenu
          value={sortType}
          onChange={setSortType}
          optionList={sortOptionList}
        />
        <ControlMenu
          value={fliter}
          onChange={setFliter}
          optionList={fliterOption}
        />
      </div>
      <div className="right_col">
        <Button type={""} text={"✏️"} onClick={() => navigate("/create")} />
      </div>
      </div>
      {getProcessDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it}/>
        
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
