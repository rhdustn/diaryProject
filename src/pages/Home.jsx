import React, { useContext, useEffect, useState } from 'react'
import Header from "../components/Header"
import Button from "../components/Button"
import { DiaryStateContext } from '../App'
import DiaryList from '../components/DiaryList'

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [curDate, setCurDate] = useState(new Date())
  const [data, setData] = useState([])
  const headText =`${curDate.getFullYear()}년 ${curDate.getMonth()+1}월`

  useEffect(() => {
    if (diaryList.length >=1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();
  
      setData(diaryList.fliter((it) => firstDay <= it.date && it.date <= lastDay));
    }
  }, [diaryList, curDate]);

  useEffect(()=>{
    console.log(data)
  },[data])


  const increaseMonth = ()=>{
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate()))
  }
  const decreaseMonth = ()=>{
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate()))
  }
  return (
   <>
   <Header headerText={headText}
   left={<Button text={'<'} onClick={decreaseMonth}/>}
   right={<Button text={'>'} onClick={increaseMonth}/>}/>

   <DiaryList diaryList={data}/>
   </>
   
  )
}

export default Home