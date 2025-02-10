const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// ➕ Додавання одного елемента
router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Item created', item: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➕ Додавання багатьох елементів
router.post('/batch', async (req, res) => {
    try {
        const items = await Item.insertMany(req.body);
        res.status(201).json({ message: 'Items created', items });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📖 Отримання всіх елементів (з проекцією)
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({}, 'name description');
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📝 Оновлення одного елемента
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item updated', item: updatedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📝 Оновлення багатьох елементів
router.put('/', async (req, res) => {
    try {
        const result = await Item.updateMany(req.body.filter, req.body.update);
        res.json({ message: 'Items updated', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📝 Повна заміна документа
router.put('/replace/:id', async (req, res) => {
    try {
        const replacedItem = await Item.findOneAndReplace({ _id: req.params.id }, req.body, { new: true });
        if (!replacedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item replaced', item: replacedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ❌ Видалення одного елемента
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted', item: deletedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ❌ Видалення багатьох елементів
router.delete('/', async (req, res) => {
    try {
        const result = await Item.deleteMany(req.body);
        res.json({ message: 'Items deleted', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
