import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const TablaAgenda = () => {

    const getData = async () => {
        const response = axios.get('http://168.194.207.98:8081/api_contacto/get_contactos.php')
        return response
    }  
  
    const [data, setData] = useState([])
    const [updateList, setUpdateList] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}

    useEffect(() => {
      getData().then((response) => {
          setData(response.data)
      })
    },[updateList])


    const handleChange = ({target}) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    const handleDelete = async id => {
        await axios.delete(`http://168.194.207.98:8081/api_contacto/delete_contacto.php?id=${id}`)
        setUpdateList(!updateList)
    }

    const handleEdit = async (info) => {
        setDataModal(info)
        handleOpenModal()
    }
    
    const handleSubmit = async (e) => {
        if (dataModal.apellido === '' || dataModal.nombre === '' || dataModal.telefono <= 0 || dataModal.email === '' || dataModal.fotourl === '') {
            alert('Todos los campos son obligatorios')
            return
        }    
        e.preventDefault()
        await axios.put(`http://168.194.207.98:8081/api_contacto/put_contacto.php`, dataModal)
    }


    const DisplayData=data.map(
        
        (info)=>{
            return(
                <tr key={info.id}>
                    <td>{info.id}</td>
                    <td>{info.apellido}</td>
                    <td>{info.nombre}</td>
                    <td>{info.telefono}</td>
                    <td>{info.email}</td>
                    <td>{info.fotourl}</td>
                    <td>
                        <div className="mb-3">
                            <button onClick={()=>handleDelete(info.id)} className="btn btn-danger">Borrar</button>
                        </div>
                        <div className="mb-3">
                            <button onClick={()=>handleEdit(info)} className="btn btn-dark">Actualizar</button>
                        </div>
                        <div className="mb-3">
                            <button Link to={`/A`} className="btn btn-dark"><Link  to={'/agregar'}>Agregar</Link></button>
                        </div>
                    </td>
                </tr>
            )
        }
    ) 

  return (
    
    <Container>
        <table className="table table-striped">
        <thead>
            <tr>
                <th>Id</th>
                <th>apellido</th>
                <th>nombre</th>
                <th>telefono</th>
                <th>email</th>
                <th>fotourl</th>
            </tr>
        </thead>
        <tbody>
            {DisplayData}                   
        </tbody>
        </table>

        
        <Modal show={showModal} onHide={handleCloseModal} className="modal-lg">
                <Modal.Title>Actualizar datos</Modal.Title >
                <Form>
                    <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">apellido</label>
                        <input value={dataModal.apellido} name="apellido" onChange={handleChange} type="text" id="apellido" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">nombre</label>
                        <input value={dataModal.nombre} name="nombre" onChange={handleChange} type="text" id="nombre" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">telefono</label>
                        <input value={dataModal.telefono} name="telefono" onChange={handleChange} type="number" id="telefono" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">email</label>
                        <input value={dataModal.email} name="ordenSlider" onChange={handleChange} type="text" id="email" className="form-control input-lg"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fotourl" className="form-label">fotourl</label>
                        <input value={dataModal.fotourl} name="ordenSlider" onChange={handleChange} type="text" id="fotourl" className="form-control input-lg"/>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleCloseModal}>
                            Cerrar
                        </button>
                        <button className="btn btn-success" type="submit" onClick={handleSubmit}>
                            Guardar 
                        </button>
                    </Modal.Footer>
                </Form>
        </Modal>

    </Container>
  )

}
