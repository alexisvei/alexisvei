// components/QrReader.js
import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrReader = ({ onScanComplete }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false);
    scanner.render(async (decodedText) => {
      // Make an API call to check the authorization status
      const response = await fetch('/api/checkId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: decodedText }),
      });
      const data = await response.json();
      onScanComplete(data.authorized);
    });

    return () => scanner.clear();
  }, [onScanComplete]);

  return <div id="reader"></div>;
};

export default QrReader;
