import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RouteTest from "./components/RouteTest";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import List from "./pages/Diary";
import Button from "./components/Button";
import Header from "./components/Header";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREACT": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.fliter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary',JSON.stringify(newState))
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();



function App() {

  const [data, dispatch] = useReducer(reducer, []);

  
  useEffect(()=>{
  const loaclData = localStorage.getItem('diary');
  if(loaclData){
    const diaryList = JSON.parse(loaclData).sort((a,b)=>parseInt(b.id) - parseInt(a.id));
    dataId.current = parseInt(diaryList[0].id)+1


    dispatch({type:"INIT",data:diaryList});
  }
  },[])  
  console.log(new Date().getTime())


  const dataId = useRef(0);

  const onCreate = (date, content, weather, ) => {
    dispatch({
      type: "CREACT",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        weather,
        
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, weather,) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        weather,
       
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
      value={{
        onCreate,
        onEdit,
        onRemove,
      }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/diary/:id" element={<List />} />
          </Routes>

        </div>
      </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
