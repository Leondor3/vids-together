import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wall } from "../components/Wall";
import { firestore, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import Dropzone from 'react-dropzone';
import * as Dialog from '@radix-ui/react-dialog';
import { useUser } from "../context/UserProfile";
import { ExistingRoom } from "../components/ExistingRoom";

export function Room() {
    const { userName } = useUser()
    const [newRoom, setNewRoom] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imgURL, setImgURL] = useState('');
    const navigate = useNavigate();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        if (newRoom.trim() === '' || !file) {
            return;
        }

        const roomCollectionRef = collection(firestore, "room");

        try {
            const roomRef = await addDoc(roomCollectionRef, {
                title: newRoom,
            });

            const storageRef = ref(storage, `videos/${roomRef.id}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                },
                error => {
                    alert(error);
                },
                async () => {
                    const videoUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    await updateDoc(roomRef, {
                        videoUrl: videoUrl,
                    });

                    console.log('Vídeo enviado e sala criada com sucesso!');
                    setNewRoom('');
                    navigate(`/room/${roomRef.id}`);
                }
            );
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <section>
            <div className="flex">
                <div className="w-1/2">
                    <Wall />
                </div>
                <div className="w-1/2 pl-8 space-y-8 items-start justify-center flex flex-col">
                    <h1 className="text-gray-50">Bem-vindo(a) {userName}</h1>
                    <h1 className="text-2xl text-gray-50 font-bold">Criar uma sala</h1>
                    <form onSubmit={handleCreateRoom} className="flex flex-col gap-4">
                        <input
                            className="text-gray-200 bg-zinc-900 rounded-md outline-none py-2 px-2 w-full focus:border focus:border-blue-400F"
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
                            {({ getRootProps, getInputProps }) => (
                                <div className='bg-zinc-900 rounded-md outline-none py-2 px-2' {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className="text-zinc-400">Arraste e solte um vídeo aqui, ou clique para selecionar um arquivo.</p>
                                </div>
                            )}
                        </Dropzone>
                        {progress > 0 && (
                            <p className="text-blue-600">Progresso: {progress.toFixed(2)}%</p>
                        )}
                        <button type="submit" className="bg-blue-600 px-4 py-4 rounded-md text-gray-50 font-bold">
                            Criar a sala
                        </button>
                    </form>
                    <hr className='border border-zinc-800 w-full' />
                    <p className="text-gray-50">
                        Quer entrar em uma sala existente? <ExistingRoom />
                    </p>
                </div>
            </div>
        </section>
    );
}
