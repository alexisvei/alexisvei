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
        // Assuming data is the 'id' from the QR code
        const matchedUser = userData.find(user => user.id === data);
        if (matchedUser) {
            setUser(matchedUser);
            setScanning(false); // Stop scanning once a match is found
        } else {
            // Handle case where QR code does not match any user
            console.log("No matching user found.");
            setScanning(false); // Optionally, stop scanning or provide feedback
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
                <p>No user data found. Scan again?</p> // Optionally, offer to restart scanning
            )}
        </div>
        </>
    );
};

export default App;