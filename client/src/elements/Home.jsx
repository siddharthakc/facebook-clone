// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/students')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className='container-fluid'>
            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
