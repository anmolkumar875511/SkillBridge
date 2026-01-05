import React, { useState } from 'react'

const ConfirmResume = () => {
    const [isEdit,setIsEdit] = useState(false)
  return (
    <div>
      <div>Skills</div>
      <div>Education</div>
      <div>Experience</div>
      <div>Projects</div>
      <div>
        {isEdit ? <button onClick={() => setIsEdit(false)}>Save</button> : <button onClick={()=> setIsEdit(true)}>Edit</button>}
      </div>
    </div>
  )
}

export default ConfirmResume
