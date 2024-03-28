'use client'
import React, { useState } from 'react';
import Scanner from '@/app/components/scanner';
import TopNav from '@/app/components/TopNav';

// Example user data array
const userData = [
    { id: "123", authorized: true, firstname: "Philip", lastname: "B" },
    { id: "alex", authorized: false, firstname: "Alexandre", lastname: "Veinand" }
];

const App = () => {
    const [user, setUser] = useState(null);
    const [scanning, setScanning] = useState(true);

    const handleQRCodeScan = (data) => {
        const matchedUser = userData.find(user => user.id === data);
        if (matchedUser) {
            setUser(matchedUser);
            setScanning(false);
        } else {
            console.log("No matching user found.");
            setScanning(false);
        }
    };

    return (
        <>
        <TopNav/>
        <div>
            {scanning ? (
                <Scanner onData={handleQRCodeScan} isActive={scanning} />
            ) : user ? (
                <div style={{ padding: 20, backgroundColor: user.authorized ? 'green' : 'red', color: 'white' }}>
                    {user.firstname} {user.lastname}
                </div>
            ) : (
                <p>No user data found. Scan again?</p>
            )}
        </div>
        </>
    );
};

export default App;