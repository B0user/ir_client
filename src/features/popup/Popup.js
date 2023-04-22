import React from 'react'
import './popup.css';

const Popup = ({ active, setActive, children}) => {
  return (
    <div className={active ? 'popmodal active' : 'popmodal'} onClick={() => setActive(false)}>
      <div className='modal_content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Popup
