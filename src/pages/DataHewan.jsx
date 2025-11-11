import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormHewan from '../components/FormHewan';
import TabelHewan from '../components/TabelHewan';
import { Modal } from 'bootstrap'; // penting untuk kontrol modal

export default function DataHewan() {
  const [hewan, setHewan] = useState([]);
  const [editId, setEditId] = useState(null);
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
    .get(`/jenis_hewan`)
    .then((response) => {
      setHewan(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      
    })
  }

  const handleDelete = (id) => {
    axios
    .delete(`/jenis_hewan/${id}`)
    .then(response => {
      console.log(response.data);
      fetchData();
      toast.success('Data berhasil dihapus!', { position: 'top-center', autoClose: 2000 });
    })
    .catch(error => {
      console.error(error);
      toast.error('Data Gagal dihapus!', { position: 'top-center', autoClose: 2000 });
    })
    .finally(() => {

    })
  }

  // buka modal edit
  const openModal = (item) => {
    setEditId(item.id); // simpan ID hewan yang mau diedit
    setNama(item.nama); // tampilkan nama di input form modal
    setDeskripsi(item.deskripsi); // tampilkan deskripsi di input form modal
    const modalElement = document.getElementById('exampleModal');
    const modal = Modal.getOrCreateInstance(modalElement);
    modal.show(); // tampilkan modal
  };

  // simpan hasil edit
  const handleSubmit =  (e) => {
    e.preventDefault();
       axios.put(`/jenis_hewan/${editId}`, {
        nama,
        deskripsi,
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
        const modalElement = document.getElementById('exampleModal');
        const modal = Modal.getOrCreateInstance(modalElement);
        modal.hide(); // tutup modal
        toast.success('Data berhasil diperbarui!', { position: 'top-center', autoClose: 2000 });
      })
      .catch((error) => {
        console.error(error);
        toast.error('Data Gagal diperbarui!', { position: 'top-center', autoClose: 2000 });
      })
      .finally(() => {

      });
  };
  


  return (
    <>
      <div className="container mt-5">
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Data Hewan</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                      <div className="modal-body">
                          <form onSubmit={handleSubmit}>
                              <div className="form-floating mb-3">
                                  <input 
                                      type="text" 
                                      className="form-control" 
                                      id="floatingInputNamaHewan"
                                      value={nama} 
                                      onChange={(e) => setNama(e.target.value)} 
                                      placeholder="Nama Hewan"/>
                                  <label htmlFor="floatingInputNamaHewan">Nama Hewan</label>
                              </div>
                              <div className="form-floating mb-3">
                                  <input 
                                      type="text" 
                                      className="form-control" 
                                      id="floatingInputDeskripsi" 
                                      value={deskripsi}
                                      onChange={(e) => setDeskripsi(e.target.value)}
                                      placeholder="deskripsi"/>
                                  <label htmlFor="floatingInputDeskripsi">Deskripsi</label>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                  <button type="submit" className="btn btn-primary">Simpan</button>
                              </div>
                          </form>
                      </div>       
                  </div>
              </div>
          </div>
          <div className="container">
          <h2 className="text-center mb-4">Data Jenis Hewan</h2>
            <div className="card p-3 shadow-sm mb-4">
              <div className="card-body">
                <FormHewan onSuccess={fetchData}/>
              </div>
            </div>
            <TabelHewan hewan={hewan} onDelete={handleDelete} onEdit={openModal} />
          </div>
      </div>
      <ToastContainer />
    </>
  );
}
