import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';

const AdminDash = () => {
    const [stats, setStats] = useState({

    });

    return (
        // Structure Flex pour aligner Sidebar et Contenu
        <div className="flex min-h-screen bg-[#F2F2F2] font-sans">

            <Sidebar />

            {/*  Contenu Principal */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">

                



            </main>
        </div>
    );
};

export default AdminDash