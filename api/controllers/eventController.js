const fs = require('fs');
const ApiService = require('../services/apiServices');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Event = require('../models/eventModel');


exports.getAllEvents = catchAsync(async (req, res, next) => {
    // construct query object
    const searchFields = ['name', 'description'];
    const apiService = new ApiService(Event.find(), req.query, searchFields)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    // execute query
    const allEvents = await apiService.query;
    // send response
    res.status(200).json(
        {
            status: "success",
            results: allEvents.length,
            data: allEvents
        }
    );
});

exports.getEventBySlug = catchAsync(async (req, res, next) => {
    // get event by slug
    const event = await Event.findOne({ slug: req.params.slug });

    // check if event exists
    if (!event) {
        return next(new AppError(404, "No event found with that ID"));
    };

    // send response
    res.status(200).json({ status: "success", data: event });
});

exports.getEventById = catchAsync(async (req, res, next) => {
    // get event by id
    const event = await Event.findById(req.params.id);

    // check if event exists
    if (!event) {
        return next(new AppError(404, "No event found with that ID"));
    };

    // send response
    res.status(200).json({ status: "success", data: event });
});

exports.createEvent = catchAsync(async (req, res, next) => {
    // extract json data from form data and assign to body by parsing
    req.body = JSON.parse(req.body.jsonData)
    // create base url
    const url = req.protocol + '://' + req.get('host');

    // create the image url and add it to the req.body
    req.body.image = req.file ? url + "/" + req.file.filename : null

    const newEvent = await Event.create(req.body);

    res.status(201).json({ status: "success", data: newEvent });
});

exports.updateEventById = catchAsync(async (req, res, next) => {
    // extract json data from form data and assign to body by parsing
    req.body = JSON.parse(req.body.jsonData)
    // create base url
    if (req.file) {
        // find image to delete
        const evt = await Event.findById(req.params.id);

        // find image location and name
        let domainName = req.protocol + '://' + req.get('host');
        let path = `./${process.env.IMAGES_DIR}/${evt.image.slice(domainName.length + 1)}`;

        // delete image and send response
        fs.unlink(path, (err) => {
            if (err) {
                return next(new AppError(500, err.message));
            }
        })

        // create the image url and add it to the req.body
        req.body.image = domainName + "/" + req.file.filename;
    } else {
        delete req.body['image'];
    };

    // find and update event
    const updatedEvent = await Event.updateOne({ _id: req.params.id }, req.body);

    // check if event exists
    if (!updatedEvent) {
        return next(new AppError(404, "No event found with that ID"));
    };

    // send response
    res.status(200).json({ status: "success", data: updatedEvent });
});

exports.deleteEventById = catchAsync(async (req, res, next) => {
    // find image to delete
    const evt = await Event.findById(req.params.id);

    //find and delete event
    const event = await Event.deleteOne({ _id: req.params.id });

    // check if event exists
    if (!event) {
        return next(new AppError(404, "No event found with that ID"));
    };

    // find image location and name
    let domainName = req.protocol + '://' + req.get('host');
    let path = `./${process.env.IMAGES_DIR}/${evt.image.slice(domainName.length + 1)}`;

    // delete image and send response
    fs.unlink(path, (err) => {
        if (err) {
            return next(new AppError(500, err.message));
        }
        // send response
        res.status(204).json({ status: "success", data: "" });
    })
});