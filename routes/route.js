
import express from 'express';

import { userSignup, userLogin, userLogout, userData , userOrders, deleteUser} from '../controller/user-controller.js';
import { contactUser } from '../controller/user-contact-controller.js'
import { getProducts, getProductDetails } from '../controller/product-controller.js';
import middleware from '../middleware/authenticate.js';


const router = express.Router();

router.post('/api/signup',userSignup);

router.post('/api/login', userLogin);
// router.post('/signin',userSignin);

//Logout Page
router.get('/api/logout',userLogout);

router.get('/api/getUserData',middleware, userData);

router.post('/api/login/orders',middleware,userOrders);

router.get('/api/products',getProducts);

router.get('/api/product/:id',getProductDetails);

router.delete('/api/deregister/:id',deleteUser);

router.post('/api/contact',contactUser);

export default router