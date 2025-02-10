const express = require('express');
const jwt = require('jsonwebtoken');
const Item = require('../models/item'); // Импорт модели
const router = express.Router();

// Главная страница
router.get('/', (req, res) => {
    res.send('<h1>Welcome to the API!</h1><p>Use /test, /items, /set-theme, /get-theme, /login</p>');
});

// Тестовый маршрут
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Установка и получение cookies
router.get('/set-theme', (req, res) => {
    res.cookie('theme', 'dark', { maxAge: 900000, httpOnly: true });
    res.send('Theme saved in cookies');
});

router.get('/get-theme', (req, res) => {
    res.json({ theme: req.cookies.theme || 'light' });
});

// Авторизация через JWT
router.post('/login', (req, res) => {
    const user = { id: 1, username: 'testuser' };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Logged in successfully', token });
});

// Проверка JWT
router.get('/protected', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json({ message: 'Access granted', user });
    });
});

// CRUD для MongoDB
// Получить все элементы
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find({});
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching items' });
    }
});

// Создать элемент
router.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Error creating item' });
    }
});

// Обновить элемент
router.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Error updating item' });
    }
});

// Удалить элемент
router.delete('/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item' });
    }
});

module.exports = router;
