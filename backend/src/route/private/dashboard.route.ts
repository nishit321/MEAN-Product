
import DasboardController from '../../../src/controller/Dashboard.Controller';

const dashboard = (router: any) => {
  const dasboardController = new DasboardController();
  const path = '/dashboard';

  /* Dashboard private route */
  router.get(path, dasboardController.dashboard);

};
export default dashboard;