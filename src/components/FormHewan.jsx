import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function FormHewan({onSuccess}) {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post(`/jenis_hewan`, {
      nama: nama,
      deskripsi: deskripsi,
    })
    .then((response) => {
      console.log(response.data);
      setNama("");
      setDeskripsi("");
      toast.success('Data berhasil disimpan!', { position: 'top-center', autoClose: 2000 });
    
      if (onSuccess) onSuccess();
    })
    .catch((error) => {
      console.error(error);
      toast.error('Data Gagal disimpan!', { position: 'top-center', autoClose: 2000 });
    })
    .finally(() => {
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="floatingInputNama" className="form-label">Nama Hewan</label>
          <input
            type="text"
            className="form-control"
            id="floatingInputNama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="floatingTextareaDeskripsi"
            style={{height: "100px", resize: "none"}}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextareaDeskripsi" className="form-label">Deskripsi</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Simpan</button>
      </form>
    </>
  );
}
