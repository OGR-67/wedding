const app = require("../index.js").app;
const {
    addNewGuest,
    getAllGuests,
    getGuestByID,
    updateGuestByID,
    deleteGuestByID,
} = require("../controllers/guestController.js");
const { getHotels } = require("../controllers/hotelsController.js");
const { Router } = require("express");

const router = Router();

// Routes
router.get("/", (req, res) => {
    const context = { something: 12 };
    res.render("pages/index.ejs", context);
});

router.get("/infos", (req, res) => {
    res.render("pages/informations.ejs");
});

router.get("/about", (req, res) => {
    res.render("pages/about.ejs");
});

router.get("/hotels", async (req, res) => {
    await getHotels(req, res);
});

router.post("/register", addNewGuest);
router.get("/register", (req, res) => {
    res.render("pages/form.ejs");
});

router.get("/guests", getAllGuests);
router.get("/guest/:guestID", getGuestByID);
router.put("/guest/:guestID", updateGuestByID);
router.delete("/guest/:guestID", deleteGuestByID);

module.exports = router;