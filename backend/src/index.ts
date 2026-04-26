import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Wedding API is running! 🚀');
});

app.listen(PORT, () => {
    console.log(`Server is driving on http://localhost:${PORT}`);
});
