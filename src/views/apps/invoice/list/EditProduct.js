import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

// ** Table Columns
import { columns } from './columns'
import './listStyle.css'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, LogOut } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Input, CustomInput, Row, Col, Card } from 'reactstrap'
import styled from 'styled-components'
import { useTable, useRowSelect } from 'react-table'

// ** Store & Actions
import { getData } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const EditProduct = () => {
    const params = useParams()
    const id = params.id

    const history = useHistory()

  const [nama, setNama] = useState('')
  const [harga, setHarga] = useState('')
  const [satuan, setSatuan] = useState('')
  const [qty, setQty] = useState('')
  const [minbeli, setMinbeli] = useState('')
  const [maxbeli, setMaxbeli] = useState('')
  const [stok, setStok] = useState('')

  const UpdateProduct = () => {
    const store = JSON.parse(localStorage.getItem('login'))
    const token = `Bearer ${store.token}`
    
    const Data = new FormData()
    Data.append('nama', nama)
    Data.append('harga', harga)
    Data.append('satuan', satuan)
    Data.append('qty', qty)
    Data.append('minbeli', minbeli)
    Data.append('maxbeli', maxbeli)
    Data.append('stok', stok)

    fetch(`https://api.di2ver.my.id/produk/update/${id}`, {
      method:"POST",
      headers:{
        Authorization:token
      },
      body:Data
    }).then((response) => {
        try {
        response.json().then((response) => {
        console.log(response)
        history.push('/products')
        
      })
    } catch (err) {
      console.log(err)
    }
    }) 
  }

  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <div>
      <Row>
        <Col lg='12' className='d-flex align-items-center px-0 px-lg-1'>
          
          <div className='d-flex'>
          <Input
              id='search-invoice'
              className='ml-5 mr-1 w-100'
              type='text'
              onChange={(e) => setNama(e.target.value)}
              placeholder='Nama'
            />
          <Input
              id='search-invoice'
              className='ml-5 mr-1 w-100'
              type='text'
              onChange={(e) => setHarga(e.target.value)}
              placeholder='Harga'
            />
            <Input
              id='search-invoice'
              className='ml-5 mr-1 w-100'
              type='text'
              onChange={(e) => setSatuan(e.target.value)}
              placeholder='Satuan'
            />
            <Input
              id='search-invoice'
              className='ml-5 mr-1 w-100'
              type='text'
              onChange={(e) => setQty(e.target.value)}
              placeholder='Qty'
            />
            </div>
        </Col>
        <Col
          lg='12'
          className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-3 mt-1 pr-lg-4 p-0 lowercolumn'
        >
          <div className='d-flex mr-5'>
            <Input
              id='search-invoice'
              className='ml-0 mr-4 w-100 input1'
              type='text'
              onChange={(e) => setMinbeli(e.target.value)}
              placeholder='Minbeli'
            />
            <Input
              id='search-invoice'
              className='ml-1 mr-5 w-100'
              type='text'
              onChange={(e) => setMaxbeli(e.target.value)}
              placeholder='Maxbeli'
            />
            <Input
              id='search-invoice'
              className='ml-2 mr-2 w-100'
              type='text'
              onChange={(e) => setStok(e.target.value)}
              placeholder='Stok'
            />
            
          </div>
          <Button.Ripple onClick={() => UpdateProduct()} color='primary'>
            Update
          </Button.Ripple>
        </Col>
      </Row>
      </div>
    </div>
  )
}

export default EditProduct