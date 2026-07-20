import { Router } from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  getUserListings,
} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';
import { authorize } from '../utils/authorize.js';

const router: Router = Router();

router.post('/create', verifyToken, authorize('seller'), createListing);
router.delete('/delete/:id', verifyToken, authorize('seller'), deleteListing);
router.patch('/update/:id', verifyToken, authorize('seller'), updateListing);
router.get('/me', verifyToken, authorize('seller'), getUserListings);
router.get('/:id', getListing);
router.get('/', getListings);

export default router;