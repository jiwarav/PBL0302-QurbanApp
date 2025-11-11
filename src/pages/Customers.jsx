import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";
import js from "@eslint/js";

export default function Customers() {
    const [customer, setCustomer] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [alamat, setAlamat] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get('/customers')
            .then(Response => {
            //    console.log("console" + Response.data);
                setCustomer(JSON.stringify(Response.data));
               console.log(JSON.stringify(Response.data));
            })
            .catch(error => {
                console.error("There was an error!", error);
            })
            .finally(() => {
                // setLoading(false);
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/customers', {
                nama: nama,
                email: email,
                alamat: alamat
            })
            .then(Response => {
                setNama("");
                setEmail("");
                setAlamat("");
                console.log(Response);
                fetchData();
            })
            .catch(error => {
                alert("Gagal menyimpan data", error);
                console.error("Gagal menyimpan data:", error);
            })
            .finally(() => {
                const modalEl = document.getElementById('exampleModal');
                const modalInstance = Modal.getInstance(modalEl);
                modalInstance.hide();
                document.body.classList.remove('modal-open');
                const backdrops = document.querySelectorAll('.modal-backdrop')
                backdrops.forEach(bd => bd.remove())
            });
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Apakah kaamu yakin akan menghapus data ini?"
         );
         if (!confirmDelete) return;
         axios
            .delete(`/customers/${id}`)
            .then(response => {
                fetchData()
            })
            .catch(error => {

            })
            .finally(() => {

            })
    }

    const handleEdit = (id) => {
        navigate(`/edit-customer/${id}`);
    }

    return (
    <>
        <div className="container mt-5">
            {/* Button trigger modal */}
            <button className="btn btn-primary col-8 fs-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Input Customer
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Input Data Customer</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-1">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="floatingInputNama" 
                                        placeholder="Nama..." 
                                        value={nama}
                                        onChange={(e) => setNama(e.target.value)}
                                    />
                                    <label htmlFor="floatingInputNama">Nama</label>
                                </div>
                                <div className="form-floating mb-1">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="floatingInputEmail" 
                                        placeholder="Email..." 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="floatingInputEmail">Email</label>
                                </div>
                                <div className="form-floating">
                                    <textarea 
                                        className="form-control" 
                                        placeholder="Alamat..." 
                                        id="floatingTextareaAlamat" 
                                        value={alamat}
                                        onChange={(e) => setAlamat(e.target.value)}
                                    >
                                    </textarea>
                                    <label htmlFor="floatingTextareaAlamat">Alamat</label>
                                </div>
                                <button className="btn btn-primary mt-3 col-12">Simpan</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="container mt-5">
            <div className="body px-5">
                <hr />
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">Alamat</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(customer) && customer.map ((Customer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{Customer.nama}</td>
                                <td>{Customer.email}</td>
                                <td>{Customer.alamat}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm"
                                        onClick={() => handleEdit(Customer.id)}
                                        style={{
                                            marginRight: "5px"
                                        }}>Edit</button>

                                    <button className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(Customer.id)}
                                        >Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
    )
}