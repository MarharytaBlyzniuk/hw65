require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const indexRoute = require('./routes/index');
const itemsRoute = require('./routes/items'); // Додаємо новий маршрут
const app = express();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Для обработки JSON
app.use(cookieParser()); // Для работы с cookies
app.use(express.static(path.join(__dirname, 'public'))); // Подключаем статические файлы

// Используем маршруты
app.use('/', indexRoute);
app.use('/items', itemsRoute); // Підключаємо новий маршрут
// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


