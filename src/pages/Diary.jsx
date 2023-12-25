import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import { weatherList } from "../utils/weather";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("존재하지 않는 일기입니다");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
  };
console.log(data)
  if (!data) {
    return <div className="Diary">Loading.....</div>;
  } else {
    const weatherData = weatherList.find(
      (it) => parseInt(it.weather_id) === parseInt(data.weather)
    );
    return (
      <div className="Diary">
        <Header
          left={<Button text={"<"} onClick={() => navigate(-1)} />}
          right={
            <Button
              text={"edit"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
          headerText={`${getStringDate(new Date(data.date))} 의 일기`}
        />
        <article>
          <section>
            <h4>날씨</h4>
            <div className="diary_img_warp">
              <img
                className="diary_img"
                src={
                  weatherData
                    ? `${process.env.PUBLIC_URL}${weatherData.weather_img}`
                    : ""
                }
                alt=""
              />
            </div>
          </section>
          <section>
            <h4>일기 내용</h4>
            <div className="diary_content">{data.content}</div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
