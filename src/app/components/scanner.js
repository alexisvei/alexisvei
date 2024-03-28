'use client'
import React, { useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import styles from '@/app/styles/scanner.scss'

const Scanner = ({ onData, isActive }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const stopVideoStream = () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        };

        if (!isActive) {
            stopVideoStream();
            return;
        }

        const setupVideoAndScan = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch(error => console.error('Error attempting to play video:', error));
                };

                console.log('Scanner activated, attempting to scan QR code...');

                const scanQRCode = () => {
                    if (!isActive || !videoRef.current || videoRef.current.readyState !== HTMLVideoElement.HAVE_ENOUGH_DATA) {
                        requestAnimationFrame(scanQRCode);
                        return;
                    }

                    const canvasElement = document.createElement('canvas');
                    canvasElement.width = videoRef.current.videoWidth;
                    canvasElement.height = videoRef.current.videoHeight;
                    const context = canvasElement.getContext('2d');
                    context.drawImage(videoRef.current, 0, 0, canvasElement.width, canvasElement.height);
                    const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
                    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                    if (qrCode) {
                        console.log('QR Code detected:', qrCode.data);
                        onData(qrCode.data);
                        stopVideoStream();
                    } else {
                        requestAnimationFrame(scanQRCode);
                    }
                };

                requestAnimationFrame(scanQRCode);
            } catch (error) {
                console.error('Error accessing video stream:', error);
            }
        };

        setupVideoAndScan();

        return () => {
            stopVideoStream();
        };
    }, [isActive, onData]);

    return <video className={styles.videoScanner} ref={videoRef} style={{ width: '100%' }} playsInline muted autoPlay />;
};

export default Scanner;