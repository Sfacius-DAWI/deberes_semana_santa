import path from 'path';
import { fileURLToPath } from 'url';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = fastify({ logger: true });


app.register(fastifyStatic, {
  root: path.join(__dirname, './view/dist'),
  prefix: '/',
});


app.get('/', async (req, reply) => {
  return reply.sendFile('index.html');
});



const puerto = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen({ port: puerto, host: '0.0.0.0' });
    app.log.info('Servidor corriendo en http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();