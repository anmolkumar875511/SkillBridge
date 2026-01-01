import express from "express";

const app = express();

app.use(express.json({ limit: '32kb' }));



export { app };