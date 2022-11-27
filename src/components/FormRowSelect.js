
const FormRowSelect = ({labelText,name,value,handleChange,list}) => {

  return <div className="form-row">

    <label htmlFor={name} className="form-label">{labelText||name}</label>

    <select value={value} name={name} id={name} onChange={handleChange} className='form-select'>

      {
        list.map((item,index)=>{
          return <option key={index} value={item}>{item}</option>;
        })
      }
    
    </select>

  </div>
  
}

export default FormRowSelect