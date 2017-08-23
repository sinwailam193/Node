import { Router } from "express";
import hello from "./helloworld";

const router = Router();

router.use("/", hello);

module.exports = router;
