const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

// In your Node.js server setup
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3001' // Adjust this to match your React app's URL
}));




app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!, hello again');
});

app.get('/generate-qris-code', (req, res) => {
    const transactionData = {
        merchantCode: '123456789012345',
        transactionAmount: '100000',
        referenceNumber: 'TX1234567890',
        merchantName: 'Dummy Store',
        currency: 'IDR'
    };
    const dataString = JSON.stringify(transactionData);

    QRCode.toDataURL(dataString, { errorCorrectionLevel: 'H' }, (err, url) => {
        if (err) {
            res.status(500).send('Error generating QR code');
        } else {
            res.json({ qrisUrl: url });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
