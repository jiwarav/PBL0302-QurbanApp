import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';

export default function TabelHewan({ hewan, onDelete, onEdit }) {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Deskripsi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {hewan.length > 0 ? (
          Array.isArray(hewan) && hewan.map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.nama}</td>
              <td>{item.deskripsi}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                    className="btn btn-danger btn-sm mx-2"
                    onClick={() => {
                        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
                        if (confirmDelete) {
                        onDelete(item.id); 
                        }
                    }}
                    >
                    Hapus
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">Belum ada data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
