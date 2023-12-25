import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import DiaryItem from "./DiaryItem";

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const weatherList = [
  {
    weather_id: 1,
    weather_img: process.env.PUBLIC_URL + `/img/weather1.png`,
    weather_name: "화창함",
  },
  {
    weather_id: 2,
    weather_img: process.env.PUBLIC_URL + `/img/weather2.png`,
    weather_name: "흐림",
  },
  {
    weather_id: 3,
    weather_img: process.env.PUBLIC_URL + `/img/weather3.png`,
    weather_name: "눈 내림",
  },
  {
    weather_id: 4,
    weather_img: process.env.PUBLIC_URL + `/img/weather4.png`,
    weather_name: "비 내림",
  },
];

const DiaryEditer = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [weather, setWeather] = useState(1);
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const contentRef = useRef();
  const fileInputRef = useRef();

  const WeatherClick = (clickedWeather) => {
    setWeather(clickedWeather);
    const selectedWeather = weatherList.find(
      (item) => item.weather_id === clickedWeather
    );
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result); // 이미지를 읽어서 img 상태 갱신
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

  
  const { onCreate,onEdit,onRemove } = useContext(DiaryDispatchContext);

  const handelPost = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    const confirmMessage = isEdit ? "일기를 수정하시겠습니까?" : "일기를 등록하시겠습니까?";
    if (window.confirm(confirmMessage)) {
      if (!isEdit) {
        onCreate(date, content, weather);
      } else {
        onEdit(originData.id, date, content, weather);
      }
      navigate("/", { replace: true });
    }
  };

  const handleRemove =()=>{
    if(window.confirm("삭제하시겠습니까?")){
      onRemove(originData.id)
      navigate('/',{ replace:true})
    }
  }

  useEffect(()=>{
    if(isEdit){
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setWeather(originData.weather)
      setContent(originData.content)
    }else{

    }
  },[isEdit,originData])
  return (
    <div className="DiaryEditer">
      <Header
        headerText={isEdit ? "일기수정": "일기 작성"}
        left={<Button text={"<"} onClick={() => navigate(-1)} />}
        right={isEdit &&(<Button text={"삭제하기"} type={"negative"} onClick={handleRemove} />)}
      />
      <div>
        <section>
          <h3>Today</h3>
          <div>
            <input
              className="input_box"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h3>Weather</h3>
          <div className="weather_box">
            {weatherList.map((it) => (
              <div
                className={`emotion_item ${
                  it.weather_id === weather ? "selected" : ""
                }`}
                key={it.weather_id}
                onClick={() => WeatherClick(it.weather_id)}
              >
                <img
                  className="weather_item_css"
                  src={it.weather_img}
                  alt={it.weather_name}
                />
                <span>{it.weather_name}</span>
              </div>
            ))}
          </div>
        </section>
        {/* <section>
          <h3>사진 업로드</h3>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            {img && (
              <div className="uploaded-imageBox">
                <img src={img} alt="Uploaded" className="uploaded-image" style={{ width: '400px' }} />
              </div>
            )}
            <Button
              text="Upload Image"
              onClick={() => fileInputRef.current.click()}
            />
          </div>
        </section> */}
        <section>
          <h3>오늘의 일기</h3>
          <div className="diary_content">
            <textarea
              placeholder="오늘의 일기는?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <div>
          <div className="control_box">
            <Button text={"cancel"} onClick={() => navigate(-1)} />
            <Button text={"post"} type={"positive"} onClick={handelPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryEditer;
