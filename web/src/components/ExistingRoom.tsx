import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export function ExistingRoom() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function fetchRooms() {
            try {
                const roomCollectionRef = collection(firestore, "room");
                const roomQuerySnapshot = await getDocs(roomCollectionRef);

                const roomData = roomQuerySnapshot.docs.map((doc) => doc.data());
                setRooms(roomData);
            } catch (error) {
                console.error("Error fetching rooms: ", error);
            }
        }

        fetchRooms();
    }, []);

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="text-blue-500">
                    Clique Aqui
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-zinc-950/90 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="space-y-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-full max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-zinc-950 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-gray-50 font-bold">
                        Salas Existentes
                    </Dialog.Title>
                    <hr className='border border-zinc-900' />
                    {rooms.map((room, index) => (
                        <div className='flex justify-between w-full items-center gap-4 bg-zinc-900 py-2 px-2 border border-zinc-800'>
                            <div className='w-full'>
                                <span className='text-gray-50 rounded-md px-2 w-full '>{room.title}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <span className='text-emerald-500 py-2 bg-emerald-500/20 px-2 rounded-md'>Disponivel</span>
                                <span className='bg-zinc-900 p-1 rounded-md text-gray-50'>1/4</span>
                                <button className='text-blue-500'>Entrar</button>
                            </div>
                        </div>
                    ))}
                    <hr className='border border-zinc-900' />
                    <h1 className='text-gray-400'>Não achou a sala? Digite o código da sala</h1>
                    <form className='flex gap-4 w-full'>
                        <input className='bg-zinc-900 rounded-md outline-none py-2 px-2 w-full' />
                        <button type="submit" className="bg-blue-600 px-4 py-4 rounded-md text-gray-50 font-bold w-72">
                            Entrar na sala
                        </button>
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            X
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
