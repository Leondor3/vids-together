import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { storage } from '../firebase';

import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

const UploadVideo = () => {
    const [imgURL, setImgURL] = useState("");
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleUpload = async () => {
        if (file) {
            const storageRef = ref(storage, `episodes/${file.name}`);
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
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    setImgURL(url);
                }
            );

            console.log('Vídeo enviado com sucesso!');
        }
    };

    return (
        <div className='space-y-4'>
            <h2>Upload de Vídeo</h2>
            <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
                {({ getRootProps, getInputProps }) => (
                    <div className='border border-orange-600 border-dashed p-5' {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Arraste e solte um vídeo aqui, ou clique para selecionar um arquivo.</p>
                    </div>
                )}
            </Dropzone>
            <button className='text-gray-50' onClick={handleUpload}>Enviar Vídeo</button>
            {progress > 0 && <p>Progresso: {progress.toFixed(2)}%</p>}
        </div>
    );
};

export default UploadVideo;
