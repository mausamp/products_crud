import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDeleteOneMutation, useGetAllQuery } from '../services/ApiQuery';
import { useState } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal'

export default function Home() {

    const response = useGetAllQuery()
    const [deleteOne] = useDeleteOneMutation()
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState(false)

    let content
    if(response.isSuccess) {
        content = (response.data.products) 
        // console.log(filtered)
    }    

    const getStatus = (text) => {
        switch (text) {
            case 'in_stock':
                return 'In Stock'
                break;
            case 'out_off_stock':
                return 'Out Off Stock'
                break;
            case 'limited_available':
                return 'Limited Available'
                break;
        }
    }

    const [modalShow, setModalShow] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editProduct, setEditProduct] = useState()
    const [edit, setEdit] = useState(false)

    const handleEdit = (product) => {
        // editProduct = product
        setEdit(true)
        setEditProduct(product)
        setEditModal(true)
    }

    const [query, setQuery] = useState('')
    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase()
        setQuery(searchText)
        if(query.length > 0) {
            setSearch(true)
        } else {
            setSearch(false)
        }

        const filteredItems = content.filter((item) => {
            return (
                item.product_name.toLowerCase().includes(searchText) ||
                item.category_name.toLowerCase().includes(searchText)
            )
        })
        setFiltered(filteredItems)
    }

    return (
        <div>
            <div className='top'>
                <Button variant='primary' onClick={() => setModalShow(true)}>Add New Product</Button>
                <form className='search'>
                    <input type='text' placeholder='Search by Name/Category'
                        value={query} onChange={handleSearch} />
                </form>
            </div>
            <AddModal show= {modalShow} onHide={() => setModalShow(false)} setModalShow= {setModalShow} />


            <Table responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {response.isSuccess && (search ? filtered: content).map((product) => 
                    <tr key={product.id}>
                        <td>{product.product_name}</td>
                        <td>{product.category_name}</td>
                        <td>{product.description}</td>
                        <td>{product.created_at.substring(0, 10)}</td>
                        <td>{getStatus(product.status)}</td>
                        <td>
                            <Button variant="success" size='sm' onClick={() => handleEdit(product)}>Edit</Button>
                            
                            <Button variant="danger" size='sm' 
                                onClick={() => {
                                    const response = confirm("Are you sure you want to delete?");
                                    if(response) {
                                        deleteOne(product.id)
                                    }}}>
                                    Delete
                            </Button>
                        </td>
                    </tr>
                )}
                </tbody>
                
            </Table>
            {edit && <EditModal 
                show= {editModal} 
                onHide={() => setEditModal(false)} 
                name={editProduct.product_name}
                id={editProduct.id}
                category={editProduct.category_name}
                description={editProduct.description}
                created={editProduct.created_by}
                status={editProduct.status}
                setEditModal={setEditModal}
            />}
        </div>

        
    )
}