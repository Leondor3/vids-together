import { VideoCamera } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export function WebCam() {
    const [activeWeb, setActiveWeb] = useState(false);

    const webcamRef = useRef(null)

    const openWebcam = () => {
        if (webcamRef.current) {
            console.log('webcam open')
        }
    }

    return (
        <div>
            <div className="bg-emerald-500 w-96 h-60 flex items-center justify-center relative">
                <button className="absolute z-20 bottom-2 left-4 p-2 rounded-full bg-zinc-900" onClick={() => setActiveWeb(!activeWeb)}>
                    <VideoCamera size={24} weight="fill" alt="Active webcam" color="#fff" />
                </button>
                {activeWeb == true ? <Webcam audio={false} ref={webcamRef} /> :
                    <div className="rounded-full h-20 w-20 overflow-hidden">
                        {/* <Webcam  audio={false} ref={webcamRef} /> */}
                        <img className="w-full h-full" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec156b50-abf0-4dac-93ed-8ffeecff2ab7/da5iujn-fe72367a-45ae-486e-9d83-8f3c91b06600.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VjMTU2YjUwLWFiZjAtNGRhYy05M2VkLThmZmVlY2ZmMmFiN1wvZGE1aXVqbi1mZTcyMzY3YS00NWFlLTQ4NmUtOWQ4My04ZjNjOTFiMDY2MDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.k85S0PxfSnC0NMLZLiyEF0Cx0swxHOs2CbmJAjh6Y3I" />
                    </div>
                }
g            </div>
        </div>
    )
}