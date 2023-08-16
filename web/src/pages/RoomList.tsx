import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { storage, firestore } from "../firebase";
import { ref, listAll, getDownloadURL } from "@firebase/storage";
import { collection, doc, getDoc } from "firebase/firestore";
import { RoomCode } from "../components/RoomCode";
import { WebCam } from "../components/Webcam";

type RoomParams = {
    id: string;
};

export function RoomList() {
    const [roomTitle, setRoomTitle] = useState('');
    const [videoUrls, setVideoUrls] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isVideoFullScreen, setIsVideoFullScreen] = useState(false);

    const params = useParams<RoomParams>();
    const roomId = params.id;

    useEffect(() => {
        async function fetchVideoUrls() {
            try {
                const storageRef = ref(storage, `videos/${roomId}`);
                const fileList = await listAll(storageRef);

                const urls = await Promise.all(fileList.items.map(async (item) => {
                    const url = await getDownloadURL(item);
                    return { url, name: item.name };
                }));

                setVideoUrls(urls);
            } catch (error) {
                console.error("Error fetching video URLs: ", error);
            }
        }

        async function fetchRoomTitle() {
            try {
                const roomDocRef = doc(collection(firestore, "room"), roomId);
                const roomDocSnap = await getDoc(roomDocRef);

                if (roomDocSnap.exists()) {
                    const data = roomDocSnap.data();
                    setRoomTitle(data.title);
                }
            } catch (error) {
                console.error("Error fetching room title: ", error);
            }
        }

        fetchRoomTitle();
        fetchVideoUrls();
    }, [roomId]);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setIsVideoFullScreen(true);
    };

    const handleFullScreenExit = () => {
        setIsVideoFullScreen(false);
        setSelectedVideo(null);
    };

    return (
        <div className="container">
            <header className="border-b border-zinc-800 py-4 h-20 items-center w-full flex justify-between">
                <h2 className="text-blue-500 font-bold">
                    {roomTitle}
                </h2>
                <RoomCode code={roomId} />
            </header>
            <div className="flex gap-4 overflow-hidden pt-4">
                {videoUrls.map((video, index) => (
                    <div className='w-full h-[600px]'>
                        <video width='100%' height='50%' controls onClick={handleFullScreenExit}>
                            <source src={video.url} type='video/mp4' />
                        </video>
                    </div>
                ))}
                <WebCam />
            </div>
        </div>
    );
}
