import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase.js';
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const dictionary = {};
    for (let i = 0; i < 10; i++) {
      const key = uuidv4(); 
      const value = generateRandomString();
      dictionary[key] = value;
    }
    if (req.method === 'POST' || req.query.save === 'true') {
      const { error } = await supabase
        .from('dictionaries')
        .insert([{ data: dictionary, created_at: new Date().toISOString() }]);
      
      if (error) {
        console.error('Ошибка Supabase:', error);
      }
    }
    return res.status(200).json({
      success: true,
      data: dictionary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Ошибка:', error);
    return res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
}
function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
