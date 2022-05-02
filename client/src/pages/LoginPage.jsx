import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

import Swal from 'sweetalert2';

export const LoginPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '123456',
        rememberme: true,
    });

    const { login } = useContext(AuthContext);

    useEffect(() => {
        const remembermeEmail = localStorage.getItem('email');

        if (remembermeEmail) {
            setForm((form) => ({
                ...form,
                email: remembermeEmail,
                rememberme: true,
            }));
        }
    }, []);

    const todoOk = () => {
        return form.email.length > 0 && form.password.length > 0 ? false : true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (form.rememberme) {
            localStorage.setItem('email', form.email);
        } else {
            localStorage.removeItem('email');
        }

        const { email, password } = form;
        const resp = await login(email, password);

        if (!resp) {
            Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
        }
    };

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const toogleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme,
        });
    };

    return (
        <form className='login100-form validate-form flex-sb flex-w' onSubmit={onSubmit}>
            <span className='login100-form-title mb-3'>Chat - Ingreso</span>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='email'
                    onChange={onChange}
                    value={form.email}
                    name='email'
                    placeholder='Email'
                />
                <span className='focus-input100'></span>
            </div>

            <div className='wrap-input100 validate-input mb-3'>
                <input
                    className='input100'
                    type='password'
                    value={form.password}
                    name='password'
                    placeholder='Password'
                    onChange={onChange}
                />
                <span className='focus-input100'></span>
            </div>

            <div className='row mb-3'>
                <div className='col' onClick={() => toogleCheck()}>
                    <input
                        className='input-checkbox100'
                        id='ckb1'
                        type='checkbox'
                        name='rememberme'
                        checked={form.rememberme}
                        readOnly
                    />
                    <label className='label-checkbox100'>Recordarme</label>
                </div>

                <div className='col text-right'>
                    <Link to='/auth/register' className='txt1'>
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className='container-login100-form-btn m-t-17'>
                <button className='login100-form-btn' type='submit' disabled={todoOk()}>
                    Ingresar
                </button>
            </div>
        </form>
    );
};
