'use client'
import { useState } from 'react';
import QRCode from 'qrcode.react'; // Corrected import

const Generator = () => {
  const [text, setText] = useState('');
  const [showQR, setShowQR] = useState(false);

  const handleGenerate = () => {
    if (text.trim() !== '') setShowQR(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID or content"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate QR Code</button>

      {showQR && (
        <div>
          <QRCode value={text} size={256} level={"H"} />
        </div>
      )}
    </div>
  );
};

export default Generator;

