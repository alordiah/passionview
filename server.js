import express from 'express'
const app = express();
const port = 3001;
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
import { JWT } from 'google-auth-library';
import {GoogleSpreadsheet} from 'google-spreadsheet'
import creds from './creds.json' assert { type: "json" };


app.post('/api', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    const query = req.body;
    res.send("Hitting Backend");
    console.log(query);

    
    
})

app.get('/api', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', '*');
      res.send('Hello World!');
      console.log(req.body);
    });

import cors from 'cors';
app.use(cors({origin: true, credentials: true}));
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
});
let docId = "15JERat8Et3A8Fg851Z0YJPLoNw5ToLqOCFYwILD417E";
const doc = new GoogleSpreadsheet(docId, jwt);



await doc.loadInfo();
console.log(doc.title); 
const sheet = doc.sheetsByIndex[0]; 
const rows = await sheet.getRows();
