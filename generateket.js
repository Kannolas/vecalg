// Создайте файл generate-secret.js:
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex'); // Генерирует 64-символьную шестнадцатеричную строку
console.log(secret);
