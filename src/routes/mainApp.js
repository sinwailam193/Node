import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    const arr = { one: 1, two: 2 };
    res.render("index", { title: "HandleBars", condition: true, arr });
});

module.exports = router;
