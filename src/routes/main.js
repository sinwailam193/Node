import { Router } from "express";
import mainApp from "./mainApp";

const router = Router();

router.use("/", mainApp);

module.exports = router;
