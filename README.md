# Express + MongoDB CRUD API

## API Маршруты

### ➕ Добавление
- **POST** `/items` – Добавить один элемент
- **POST** `/items/batch` – Добавить несколько элементов

### 📖 Чтение
- **GET** `/items` – Получить список всех элементов

### 📝 Обновление
- **PUT** `/items/:id` – Обновить один элемент
- **PUT** `/items` – Обновить несколько элементов
- **PUT** `/items/replace/:id` – Полная замена элемента

### ❌ Удаление
- **DELETE** `/items/:id` – Удалить один элемент
- **DELETE** `/items` – Удалить несколько элементов  
