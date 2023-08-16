import copyImg from '../assets/copy.svg'


type RoomCodeProps = {
    code: string;
}

export function RoomCode(Props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(Props.code)
    }

    return (
        <button className="flex gap-4" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span className='text-gray-50'>Sala #{Props.code}</span>
        </button>
    )
}