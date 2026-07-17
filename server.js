import { v4 as uuidv4 } from 'uuid';
import http from 'http';

function generateRandomString(length = 10) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/dictionary') {
    const dictionary = {};
    for (let i = 0; i < 10; i++) {
      const key = uuidv4();
      const value = generateRandomString();
      dictionary[key] = value;
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      data: dictionary,
      timestamp: new Date().toISOString()
    }, null, 2));
  } else {
    res.statusCode = 404;
    res.end('🚀 Сервер работает! Перейди по ссылке: /api/dictionary');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log('\n🎉 =============================');
  console.log('🎉  СЕРВЕР УСПЕШНО ЗАПУЩЕН!');
  console.log('🎉 =============================');
  console.log('\n📱 Открой браузер и перейди по ссылке:');
  console.log('   👉 http://localhost:3000/api/dictionary');
  console.log('\n📋 Ты увидишь 10 пар "ключ-значение"');
  console.log('\n⏹️ Для остановки сервера нажми Ctrl+C');
  console.log('\n====================================\n');
});