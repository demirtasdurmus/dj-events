const router = require('express').Router();
//const aliasEvents = require('../middleware/aliasEvents');
const uploadSingleFile = require('../middleware/uploadSingleFile');
const resizeSingleImage = require('../middleware/resizeSingleImage');

const authorizeOnly = require('../middleware/authorizeOnly');
const eventController = require('../controllers/eventController');


router
    .get("/", eventController.getAllEvents)
    //.get("/top-5-cheapest", aliasEvents.TopFiveCheapest, eventController.getAllEvents)
    .get("/:slug", eventController.getEventBySlug)
    .get("/getById/:id", eventController.getEventById)
    .post("/",
        uploadSingleFile("image", { storage: "memory" }),
        resizeSingleImage({ width: 600, height: 400, quality: 90, format: "jpeg" }),
        eventController.createEvent
    )
    .post("/:id",
        uploadSingleFile("image", { storage: "memory" }),
        resizeSingleImage({ width: 600, height: 400, quality: 90, format: "jpeg" }),
        eventController.updateEventById
    )
    .delete("/:id", eventController.deleteEventById)


module.exports = router;