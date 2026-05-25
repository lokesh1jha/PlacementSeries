import { useState } from 'react';


function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,        // spread existing fields
            [name]: value   // update only the changed field
        }));
    }


    function validate() {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = 'Name is required';
        if (!formData.email.includes('@'))
            newErrors.email = 'Enter a valid email';
        if (formData.password.length < 6)
            newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    }


    function handleSubmit(e) {
        e.preventDefault();
        //validate the user data 
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setSubmitted(true);
        console.log('Form data:', formData);
    }


    if (submitted) {
        return <h2>Welcome, {formData.name}! Registration complete.</h2>;
    }


    return (
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px', maxWidth:'360px' }}>
            <h2>Register</h2>


            <div>
                <input
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Full Name'
                    style={{ width:'100%', padding:'8px', border: errors.name ? '1px solid red' : '1px solid #ddd', borderRadius:'6px' }}
                />
                {errors.name && <p style={{ color:'red', fontSize:'12px', margin:'4px 0 0' }}>{errors.name}</p>}
            </div>


            <div>
                <input
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email Address'
                    style={{ width:'100%', padding:'8px', border: errors.email ? '1px solid red' : '1px solid #ddd', borderRadius:'6px' }}
                />
                {errors.email && <p style={{ color:'red', fontSize:'12px', margin:'4px 0 0' }}>{errors.email}</p>}
            </div>


            <div>
                <input
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    style={{ width:'100%', padding:'8px', border: errors.password ? '1px solid red' : '1px solid #ddd', borderRadius:'6px' }}
                />
                {errors.password && <p style={{ color:'red', fontSize:'12px', margin:'4px 0 0' }}>{errors.password}</p>}
            </div>


            <button type='submit' style={{ padding:'10px', background:'#0088AA', color:'white', border:'none', borderRadius:'6px', cursor:'pointer' }}>
                Register
            </button>
        </form>
    );
}


export default RegisterForm;

