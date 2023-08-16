import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from '@firebase/storage';

const ListVideo = () => {
    const [videoUrls, setVideoUrls] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isVideoFullScreen, setIsVideoFullScreen] = useState(false);
    useEffect(() => {
        async function fetchVideoUrls() {
            const storageRef = ref(storage, 'episodes');
            const fileList = await listAll(storageRef);

            const urls = await Promise.all(fileList.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return { url, name: item.name };
            }));

            setVideoUrls(urls);
        }

        fetchVideoUrls();
    }, []);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setIsVideoFullScreen(true);
    };

    const handleFullScreenExit = () => {
        setIsVideoFullScreen(false);
        setSelectedVideo(null);
    };

    return (
        <div className='space-y-4'>
            <h2 className='text-gray-200 text-4xl'>Vídeos Disponíveis</h2>
            {videoUrls.map((video, index) => (
                <div>
                    <div key={index} className='w-72 px-4 bg-orange-600' onClick={() => handleVideoClick(video)}>
                        <p>{video.name}</p>
                    </div>
                    {selectedVideo === video && isVideoFullScreen && (
                        <div className='fullscreen-video'>
                            <video width='100%' height='100%' controls onClick={handleFullScreenExit}>
                                <source src={video.url} type='video/mp4' />
                            </video>
                        </div>
                    )}
                </div>

            ))}
        </div>
    );
};

export default ListVideo;
