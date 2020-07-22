import UserAuthController from '../../../src/controller/UserAuth.Controller';
import {
  validateObjectMiddleware,
} from '../../../src/middleware/ObjectValidation.Middleware';
import { UserLoginValidator } from '../../../src/validation/ObjectsTo.Validate';

const login = (router: any) => {
  const userAuthController = new UserAuthController();
  const path = "/login";

  /* login route to return JWT Token */
  router.post(
    path,
    validateObjectMiddleware(UserLoginValidator),
    userAuthController.login
  );
};
export default login;
