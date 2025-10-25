import 'dotenv/config';
import http from 'http';
import app from './app';

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!PORT || !MONGO_URI) {
    console.error(`Missing required environment variables:`, { PORT, MONGO_URI });
    process.exit(1);
}

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
