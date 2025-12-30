import { Router } from 'express';
import { upgradeSubscription } from '../controller/subscriptionController.js';
import { Userauth } from "../middleware/userAuth.js";
const SubscriptionRouter = Router();
SubscriptionRouter.post('/upgrade', Userauth, upgradeSubscription);
export { SubscriptionRouter };
