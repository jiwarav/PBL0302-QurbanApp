import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";

export default function CustomerEdit() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [alamat, setAlamat] = useState("");

    useEffect(() => {
        fetchDataById();
    }, []);

    const fetchDataById = () => {
        axios
            .get(`/customers/${id}`)
            .then(Response => {
                //console.log(Response.data[0]);
                const myData = Response.data;
                setNama(myData.nama);
                setEmail(myData.email);
                setAlamat(myData.alamat);
            })
            .catch(error => {

            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`/customers/${id}`, {
                nama: nama,
                email: email,
                alamat: alamat
            })
            .then(response => {
                console.log(response)
                var message = response.data.message
                if(message) {
                    alert('Data berhasil diupdate!')
                }
            })
            .catch(error => {

            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            <form onSubmit={handleUpdate} className="container mt-5 bg-light p-4 border rounded"> <h3>Ubah Data Customer</h3>
                                <div className="form-floating m-3">
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
                                <div className="form-floating m-3">
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
                                <div className="form-floating m-3">
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
                                <button className="btn btn-primary mt-3 col-12">Update</button>
                            </form>
        </>
    )
}