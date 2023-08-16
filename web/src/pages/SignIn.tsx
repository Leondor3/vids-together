import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Wall } from '../components/Wall';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    function handleSignIn(e) {
        e.preventDefault()
        signInWithEmailAndPassword(email, password)
        console.log("Usuario logado", user?.email)
        if (user) {
            navigate("/room")
        }
    }

    if (error) {
        return (
            <div>
                <p className='text-gray-50'>Error: {error.message}</p>
            </div>
        );
    }
    if (loading) {
        return <p className='text-gray-50'>Loading...</p>;
    }
    return (
        <section className="relative">
            <div className='flex items-center justify-center'>
                <div className='w-1/2'>
                    <Wall />
                </div>
                <div className='space-y-4 w-1/2 text-left px-32'>
                    <h1 className='text-2xl text-gray-50 font-bold'>Bem vindo de volta!</h1>
                    <p className='text-gray-200'>Acesse sua conta e Explore uma Nova Forma de Assistir Vídeos com Amigos</p>
                    <form className='space-y-4'>
                        <fieldset className='flex flex-col space-y-2'>
                            <label className='text-gray-50'>E-mail</label>
                            <input className='bg-zinc-900 rounded-md outline-none py-2 px-2' placeholder='Digite seu e-mail' type='text' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className='flex flex-col space-y-2'>
                            <label className='text-gray-50'>Password</label>
                            <input className='bg-zinc-900 rounded-md outline-none py-2 px-2' placeholder='Digite sua senha' type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                        <div className='flex flex-col gap-4'>
                            <button className='bg-blue-600 px-4 py-4 rounded-md text-gray-50 font-bold w-full' onClick={handleSignIn}>Entrar</button>
                            <hr className='border border-zinc-800' />
                            <small className='text-center text-gray-400'>Não tem conta ainda?
                                <a className='text-blue-600'> Entrar</a>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}