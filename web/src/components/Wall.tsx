export function Wall() {
    return (
        <section>
            <div className='flex-1 bg-blue-600 h-screen items-center justify-center w-full'>
                <div className='flex items-start justify-start flex-col h-full pl-32 pt-16'>
                    <nav>
                        <a className='text-1xl font-bold text-gray-50'>StrawHat Reels</a>
                    </nav>
                    <div className='pt-32 space-y-2'>
                        <h1 className='text-6xl font-bold text-gray-50'>Assista</h1>
                        <h1 className='text-6xl font-bold text-gray-50'>Conecte</h1>
                        <h1 className='text-6xl font-bold text-gray-50'>Compartilhe</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}