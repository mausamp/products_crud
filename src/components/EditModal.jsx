import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEditOneMutation } from '../services/ApiQuery';

export default function EditModal(props) {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [status, setStatus] = useState('')
    const [id, setId] = useState('')

    const showModal = () => {
      setName(props.name)
      setCategory(props.category)
      setDescription(props.description)
      setCreatedBy(props.created)
      setStatus(props.status)
      setId(props.id)
    }

  const [editOne, {isSuccess, isError}] = useEditOneMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    editOne({id: id,content: {
      "product_name" : name,
      "category_name" : category,
      "description" : description,
      "created_by" : createdBy,
      "status" : status
    }})

    if(isSuccess) {
      resetValues()
      alert("Edit Successful!")
      props.setEditModal(false)

    }

    if(isError) {
      alert("Edit failed!")
    }


  }

  const resetValues = () => {
    setName('')
    setCategory('')
    setDescription('')
    setCreatedBy('')
    setStatus('')
  }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit= {resetValues}
      onShow = {showModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit the Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input 
            type='text' 
            value={name} 
            required
            onChange={(e) => setName(e.target.value)} 
          />
          
          <label>Category Name:</label>
          <select value={category} required onChange={(e) => setCategory(e.target.value)}>
            <option value='' disabled>...</option>
            <option value="electronic">Electronic</option>
            <option value="furniture">Furniture</option>
            <option value="dairy">Dairy</option>
          </select>

          <label>Description:</label>
          <input 
            type='text' 
            value={description} required
            onChange={(e) => setDescription(e.target.value)} 
          />

          <label>Created By:</label>
          <input 
            type='text' required
            value={createdBy} 
            onChange={(e) => setCreatedBy(e.target.value)} 
          />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value='' disabled>...</option>
            <option value="in_stock">In Stock</option>
            <option value="out_off_stock">Out Off Stock</option>
            <option value="limited_available">Limited Available</option>
          </select>

          <button>Edit Product</button>

        </form>
      </Modal.Body>
    </Modal>
  );
}
