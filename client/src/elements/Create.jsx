import React, { useState } from 'react';
import axios from 'axios'; // Don't forget to import axios
import { Link, useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });
    const navigate = useNavigate();

    function handleSumbit(e) {
        e.preventDefault();

     useEffect(() => {
    axios.get('http://localhost:5000/students')
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
}, []);


    }

    return (
        <div className='container vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Student</h3>
                <form onSubmit={handleSumbit}> {/* Corrected onSubmit attribute */}
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' onChange={(e) => setValues({ ...values, name: e.target.value })} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='age'>Age</label>
                        <input type='text' name='age' onChange={(e) => setValues({ ...values, age: e.target.value })} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='gender'>Gender</label>
                        <input type='text' name='gender' onChange={(e) => setValues({ ...values, gender: e.target.value })} />
                    </div>
                    <button type="submit">Submit</button> {/* Added a submit button with a name attribute */}
                </form>
            </div>
        </div>
    );
}

export default Create;
