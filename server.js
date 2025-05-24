import path from 'path';
import { fileURLToPath } from 'url';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, 'dist'),
  prefix: '/',
});

app.get('/', async (req, reply) => {
  return reply.sendFile('index.html');
});

app.get('/starwars', async (req, reply) => {
  return reply.sendFile('starwars.html');
});

app.get('/curriculum', async (req, reply) => {
  return reply.sendFile('curriculum.html');
});

app.get('/restaurante', async (req, reply) => {
  return reply.sendFile('restaurante.html');
});

app.get('/usuarios', async (req, reply) => {
  return reply.sendFile('usuarios.html');
});

app.get('/pizzeria', async (req, reply) => {
  return reply.sendFile('pizzeria.html');
});


app.get('/dist/actividad2/data/curriculum.json', async (req, reply) => {
  return reply.sendFile('actividad2/data/curriculum.json');
});


app.get('/api/swapi/*', async (req, reply) => {
  const swapiPath = req.url.replace('/api/swapi', '');
  const swapiUrl = `https://swapi.info/api${swapiPath}`;
  
  try {
    const response = await fetch(swapiUrl);
    const data = await response.json();
    
    reply
      .header('Access-Control-Allow-Origin', '*')
      .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      .send(data);
  } catch (error) {
    console.error('Error en proxy SWAPI:', error);
    reply.status(500).send({ error: 'Error al conectar con la API de Star Wars' });
  }
});

const puerto = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen({ port: puerto, host: '0.0.0.0' });
    app.log.info('Servidor corriendo en http://localhost:3000');
    app.log.info('Rutas disponibles:');
    app.log.info('- http://localhost:3000/starwars (Actividad 1: Star Wars API)');
    app.log.info('- http://localhost:3000/curriculum (Actividad 2: Currículum dinámico)');
    app.log.info('- http://localhost:3000/restaurante (Actividad 3: Restaurante italiano)');
    app.log.info('- http://localhost:3000/usuarios (Actividad 4: Gestión de usuarios)');
    app.log.info('- http://localhost:3000/pizzeria (Actividad 5: Simulador pizzería)');
    app.log.info('- Proxy Star Wars API: /api/swapi/* -> https://swapi.info/api/*');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();