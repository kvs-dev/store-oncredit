import jsonServer from 'json-server';
import auth from 'json-server-auth';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.db = router.db;
const rules = auth.rewriter({
  users: 600,
  products: 664,
  categories: 444
});

server.use(rules);
server.use(auth);
server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`API is available at http://localhost:${port}`);
  console.log('Available resources:');
  console.log('/users');
  console.log('/products');
  console.log('/categories');
  console.log('Auth endpoints:');
  console.log('POST /login');
}); 