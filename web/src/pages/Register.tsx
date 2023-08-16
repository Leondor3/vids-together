import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore, storage } from '../firebase';
import { Link } from 'react-router-dom';
import { Wall } from '../components/Wall';
import { useUser } from '../context/UserProfile';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);

    const { setUserName } = useUser();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();
        if (!name || !email || !password) {
            console.log('Preencha todos os campos obrigatórios');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            if (photo) {
                const storageRef = ref(storage, `photos/${user.uid}.jpg`);
                await uploadBytes(storageRef, photo);
            }

            const userDocRef = doc(collection(firestore, "users",), user.uid);
            await setDoc(userDocRef, {
                displayName: name,
                email: email,
            });

            setUserName(name);

            console.log('Usuário cadastrado com sucesso!', user);

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
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
                    <h1 className='text-2xl text-gray-50 font-bold'>Uma Experiência Compartilhada de Entretenimento Online</h1>
                    <p className='text-gray-200'>Crie seu Login e Explore uma Nova Forma de Assistir Vídeos com Amigos</p>
                    <form className='space-y-4'>
                        <fieldset className='flex flex-col space-y-2'>
                            <label className='text-gray-50'>Nome</label>
                            <input className='bg-zinc-900 rounded-md outline-none py-2 px-2' placeholder='Digite seu nome' type='text' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </fieldset>
                        <fieldset className='flex flex-col space-y-2'>
                            <label className='text-gray-50'>E-mail</label>
                            <input className='bg-zinc-900 rounded-md outline-none py-2 px-2' placeholder='Digite seu e-mail' type='text' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </fieldset>
                        <fieldset className='flex flex-col space-y-2'>
                            <label className='text-gray-50'>Password</label>
                            <input className='bg-zinc-900 rounded-md outline-none py-2 px-2' placeholder='Digite sua senha' type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </fieldset>
                        <fieldset className='flex flex-col space-y-2'>
                            <label className='text-gray-50'>Foto de Perfil</label>
                            <input
                                className='bg-zinc-900 rounded-md outline-none py-2 px-2'
                                type='file'
                                accept="image/*"
                                onChange={(e) => {
                                    const selectedPhoto = e.target.files?.[0];
                                    if (selectedPhoto && selectedPhoto.type.includes('image/') && selectedPhoto.size <= MAX_FILE_SIZE) {
                                        setPhoto(selectedPhoto);
                                    } else {
                                        console.log('Foto de perfil inválida');
                                    }
                                }}
                            />
                        </fieldset>
                        <div className='flex flex-col gap-4'>
                            <button className='bg-blue-600 px-4 py-4 rounded-md text-gray-50 font-bold w-full' onClick={handleSignIn}>Criar Conta</button>
                            <hr className='border border-zinc-800' />
                            <small className='text-gray-400 text-center'>Ou continue com sua rede social</small>
                            <small className='text-center text-gray-400'>Já é cadastrado?
                                <Link to="/signin" className='text-blue-600'> Entrar</Link>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
