import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';

const RegisterPage = () => {
    const [form, setForm] = useState({
        email: '',
        nombre: '',
        password: '',
    });

    const { register } = useContext(AuthContext);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const todoOk = () => {
        return form.email.length > 0 && form.password.length > 0 && form.nombre.length > 0 ? false : true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const { email, password, nombre } = form;
        const msg = await register(nombre, email, password);

        if (msg !== true) {
            Swal.fire('Error', msg, 'error');
        }
    };

    return (
        <form className='login100-form validate-form flex-sb flex-w' onSubmit={onSubmit}>
            <span className='login100-form-title mb-3'>Chat - Registro</span>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='text'
                    value={form.nombre}
                    onChange={onChange}
                    name='nombre'
                    placeholder='Nombre'
                />
                <span className='focus-input100'></span>
            </div>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='email'
                    value={form.email}
                    onChange={onChange}
                    name='email'
                    placeholder='Email'
                />
                <span className='focus-input100'></span>
            </div>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    value={form.password}
                    onChange={onChange}
                    type='password'
                    name='password'
                    placeholder='Password'
                />
                <span className='focus-input100'></span>
            </div>

            <div className='row mb-3'>
                <div className='col text-right'>
                    <Link to='/auth/login' className='txt1'>
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className='container-login100-form-btn m-t-17'>
                <button className='login100-form-btn' type='submit' disabled={todoOk()}>
                    Crear cuenta
                </button>
            </div>
        </form>
    );
};

export default RegisterPage;
