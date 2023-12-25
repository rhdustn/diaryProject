import DiaryEditer from "../components/DiaryEditer";

const getStringDate = (date)=>{
  return date.toISOString().slice(0,10)
}

const Create = () => {


  return (
    <div>
      <DiaryEditer />
    </div>
  );
};

export default Create;
