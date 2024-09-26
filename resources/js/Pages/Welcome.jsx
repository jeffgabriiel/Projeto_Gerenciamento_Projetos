import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://wallpaper.dog/large/10850092.jpg"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative min-h-screen flex flex-col justify-center selection:bg-[#191970] selection:text-white">
                    <header className="absolute top-0 right-0 p-6 flex justify-between items-center w-full">
                        <img src="/images/logo.png" alt="Logo" className="h-20 w-auto" />
                        <div className="flex space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-4 py-2 bg-[#00008B] text-white text-lg shadow-md transition hover:bg-[#191970]/80"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 bg-[#00008B] text-white text-lg shadow-md transition hover:bg-[#191970]/80"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-4 py-2 bg-[#00008B] text-white text-lg shadow-md transition hover:bg-[#191970]/80"
                                    >
                                        Cadastro
                                    </Link>
                                </>
                            )}
                        </div>
                    </header>

                    <main className="flex items-center justify-start h-screen w-full px-10 lg:px-20">
                        <div className="text-left max-w-lg">
                            <h1 className="text-5xl font-bold text-white">
                                Bem-vindo ao Nosso Site de Videoaulas!
                            </h1>
                            <p className="mt-6 text-2xl text-white/80">
                                Aqui você encontrará uma vasta coleção de videoaulas que ajudarão a expandir seu conhecimento em várias áreas.
                            </p>
                            <p className="mt-4 text-xl text-white/80">
                                Se você já tem uma conta, faça login para acessar seu dashboard e continuar seus estudos. Caso contrário, registre-se e comece sua jornada de aprendizado agora mesmo!
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
