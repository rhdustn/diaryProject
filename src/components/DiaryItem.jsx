import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const DiaryItem = ({ id, weather, img, content, date }) => {
  const navigate = useNavigate()

  const strDate = new Date(parseInt(date)).toLocaleDateString()

  const goDetail = () => {
    navigate(`/diary/${id}`)
  }
  const goEdit = () => {
    navigate(`/edit/${id}`)
  }
  
  const slicedContent = (typeof content === 'string' && content.length > 25) ? `${content.slice(0, 25)}...` : content;

  return (
    <div className='DiaryItem'>
      <div className='DiaryItem2'>
        {/* <div className='img_warpper'>
            <img src={process.env.PUBLIC_URL +`img/weather${weather}.png`}/>
        </div> */}
        <div className='info_warpper' onClick={goDetail}>
          <div className='diary_date'>{strDate}</div>
          <div className='diary_content'>{slicedContent}</div>
        </div>
      </div>
      <div>
        <Button onClick={goEdit} text={"Edit"} />
      </div>
    </div>
  )
}

export default DiaryItem;