import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        // Client-side validation
        const errors = {};
        if (!values.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!values.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email format';
        }
        if (!values.age.trim()) {
            errors.age = 'Age is required';
        } else if (isNaN(values.age)) {
            errors.age = 'Age must be a number';
        }
        if (!values.gender.trim()) {
            errors.gender = 'Gender is required';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setLoading(true);
        axios.post('http://localhost:5000/students', values)
            .then((response) => {
                console.log(response.data);
                setValues({ name: '', email: '', age: '', gender: '' }); // Clear form fields
                setErrors({}); // Clear any previous errors
                setSuccessMessage('Student created successfully');
                setLoading(false);
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/'); // Redirect to home page after successful submission
                }, 2000);
            })
            .catch((error) => {
                console.error('Error creating student:', error);
                setLoading(false);
                setErrors({ submit: 'Failed to create student' });
            });
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h3>Add Student</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' className='form-control' name='name' value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
                            {errors.name && <div className='text-danger'>{errors.name}</div>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' className='form-control' name='email' value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                            {errors.email && <div className='text-danger'>{errors.email}</div>}
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor='age'>Age</label>
                            <input type='text' className='form-control' name='age' value={values.age} onChange={(e) => setValues({ ...values, age: e.target.value })} />
                            {errors.age && <div className='text-danger'>{errors.age}</div>}
                        </div>
                        
                        <div className='form-group'>
                            <label htmlFor='gender'>Gender</label>
                            <input type='text' className='form-control' name='gender' value={values.gender} onChange={(e) => setValues({ ...values, gender: e.target.value })} />
                            {errors.gender && <div className='text-danger'>{errors.gender}</div>}
                        </div>
                        
                        {errors.submit && <div className='alert alert-danger'>{errors.submit}</div>}
                        {successMessage && <div className='alert alert-success'>{successMessage}</div>}
                        {loading && <div className='text-center'><i className='fa fa-spinner fa-spin'></i></div>}
                        
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;
