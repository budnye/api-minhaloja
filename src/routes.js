import { Router } from 'express';
import ClientController from './app/controllers/ClientController';
import Handler from './middlewares/handler';

const routes = new Router();
//Handler to permit outside connections
routes.use(Handler);
// Clients
// Get
routes.get('/clients', ClientController.index);
// Get clients by id
routes.get('/clients/:clientId', ClientController.get);
// Post Clients
routes.post('/clients', ClientController.store);
// Update Clients

//Delete Clients
routes.delete('/clients/:clientId', ClientController.delete);
// Suppliers

// Products

// Orders

// Deliveries

export default routes;