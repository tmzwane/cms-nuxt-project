const express = require("express");
const router = express.Router();

// Load Media Model
const Media = require("../../models/Media");

/*
 * @route   GET api/media/test
 * @desc    Tests media route
 * @access  Public
 */
router.get("/test", (req, res) => res.json({ success: "Media route works" }));

/*
 * @route   GET api/media
 * @desc    Get all media
 * @access  Public
 */
router.get("/", (req, res) => {
  Media.find().then((allMedia) => {
    return res.json(allMedia);
  });
});

/*
 * @route   POST api/media
 * @desc    Create a new media
 * @access  Public
 */
router.post("/", (req, res) => {
  const payload = req.body;
  const errors = { success: false };

  Media.findOne({
    $or: [{ type: payload.type }, { src: payload.src }],
  }).then((media) => {
    // Avoid creating duplicating types and srcs
    if (media) {
      errors.message = "Media with the same type or src already exists";
      return res.status(403).json(errors);
    }

    const newMedia = new Media({
      type: payload.type,
      src: payload.src,
    });

    newMedia
      .save()
      .then((media) => {
        res.status(201).json({
          success: true,
          data: media,
          message: "Media created",
        });
      })
      .catch((errorDetails) => {
        errors.message = "Request failed";
        errors.details = errorDetails;
        res.status(500).json({ errors });
      });
  });
});

/*
 * @route   PUT api/media/:media_id
 * @desc    Update a media using Id
 * @access  Public
 */
router.put("/", (req, res) => {
  const mediaId = req.params.media_id;
  const payload = req.body;
  const errors = { success: false };

  Media.findById(mediaId).then((media) => {
    if (!media) {
      errors.message = "Media doesn't exist";
      return res.status(404).json(errors);
    }

    // TODO: Check if the new type and src don't already exist

    const mediaUpdate = {};
    mediaUpdate.type = payload.type || media.type;
    mediaUpdate.src = payload.src || media.src;

    Media.findByIdAndUpdate(mediaId, { $set: mediaUpdate }, { new: true })
      .then((media) => {
        res.json({
          success: true,
          data: media,
          message: "Media updated",
        });
      })
      .catch((errorDetails) => {
        errors.message = "Request failed";
        errors.details = errorDetails;
        res.status(500).json({ errors });
      });
  });
});

/*
 * @route   DELETE api/media/:media_id
 * @desc    Remove media using Id
 * @access  Public
 */
router.delete("/:media_id", (req, res) => {
  const mediaId = req.params.media_id;
  const errors = { success: false };
  Media.findOneAndRemove({ _id: mediaId })
    .then((media) => {
      res.json({ success: true, data: media, message: "Media deleted" });
    })
    .catch((errorDetails) => {
      errors.message = "Request failed";
      errors.details = errorDetails;
      res.status(500).json({ errors });
    });
});

module.exports = router;
