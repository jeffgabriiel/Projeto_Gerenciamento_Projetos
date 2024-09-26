import '../../css/app.css';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="logo flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <img src="/images/logo.png" alt="Logo" />
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
