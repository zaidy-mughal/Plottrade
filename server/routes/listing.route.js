import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, getUserListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/me', verifyToken, getUserListings);
router.get('/:id', getListing);
router.get('/', getListings);

export default router;