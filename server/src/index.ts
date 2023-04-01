import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/file';

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

app.use(cors());
app.use(express.json());
app.use('/file', fileRoutes);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

