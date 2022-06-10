import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const FormularioAgenda = () => {

  const [data, setData] = useState({apellido:"",nombre:"",telefono:"",email:"",fotourl:""})
  let navigate = useNavigate();
  const handleChange = ({target})=> {
      setData({
          ...data,
          [target.name]: target.value
      })
  }

  const handleSubmit = async (e) =>{
      if (data.apellido === '' || data.nombre === '' || data.telefono <= 0 || data.email === '' || data.fotourl === '') {
            alert('Todos los campos son obligatorios')
            return
      }    
      e.preventDefault()
      await axios.post('http://168.194.207.98:8081/api_contacto/post_contacto.php', data)
      navigate("/grilla", { replace: true });
  }

  return (  
        <div className="container">  
            <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">apellido</label>
                        <input value={data.apellido} name="apellido" onChange={handleChange} type="text" id="apellido" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">nombre</label>
                        <input value={data.nombre} name="nombre" onChange={handleChange} type="text" id="nombre" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">telefono</label>
                        <input value={data.telefono} name="telefono" onChange={handleChange} type="number" id="telefono" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">email</label>
                        <input value={data.email} name="email" onChange={handleChange} type="text" id="email" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fotourl" className="form-label">fotourl</label>
                        <input value={data.fotourl} name="fotourl" onChange={handleChange} type="text" id="fotourl" className="form-control input-lg"/>
                    </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>     
        </div>   
  )
}

