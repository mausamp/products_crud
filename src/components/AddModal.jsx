import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useAddOneMutation, useEditOneMutation } from '../services/ApiQuery';

export default function AddModal(props) {

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [createdBy, setCreatedBy] = useState('')
  const [status, setStatus] = useState('')
  
  const [addOne, {isSuccess, isError}] = useAddOneMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    addOne({
      "product_name" : name,
      "category_name" : category,
      "description" : description,
      "created_by" : createdBy,
      "status" : status
    })
    
    if(isSuccess) {
      resetValues()
      alert("Added successfully!")
      props.setModalShow(false)
    }

  }
  
  const resetValues = () => {
    setName('')
    setCategory('')
    setDescription('')
    setCreatedBy('')
    setStatus('')
  }
   // console.log(status)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={resetValues}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add the Product
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

          <button>Add Product</button>

        </form>
      </Modal.Body>
    </Modal>
  );
}
