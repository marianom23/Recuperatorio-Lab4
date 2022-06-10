import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Indice } from './Indice';

export const MostrarPorLetra = () => {
    const {letra} = useParams();

    const [data, setData] = useState([])

    
    const getData = async () => {
        const response = await axios.get(`http://168.194.207.98:8081/api_contacto/get_contactos.php?indice=${letra}`)
        return response
    }  

    useEffect(() => {
        getData().then((response) => {
            setData(response.data)
        })
      },[])

 
    
    const DisplayData=data.map(
        (info)=>{
            return(
                <tr key={info.id}>
                    <td> <img src={info.fotourl}/> </td>
                    <td>{info.apellido}</td>
                    <td>{info.nombre}</td>
                    <td>{info.telefono}</td>
                    <td>{info.email}</td>
                </tr>
            )
        }
    ) 

  return (
<>
    <h3>Buscar por indice</h3>
    <Indice/>
    <h3>Agenda de contactos</h3>
    <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>imagen</th>
                    <th>Apellido</th>
                    <th>Nombre</th>
                    <th>telefono</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
               { 
                DisplayData 
               }
            </tbody>
        </table>
    </div>   
    </>
  )
}
