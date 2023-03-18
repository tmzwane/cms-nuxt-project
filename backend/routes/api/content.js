import express from "express";
const router = express.Router();

// Load Content Model
import Content from "../../models/Content.js";

/*
 * @route   GET api/content/test
 * @desc    Tests content route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({ success: true, message: "Content route works" })
);

/*
 * @route   GET api/content
 * @desc    Get all contents
 * @access  Public
 */
router.get("/", (req, res) => {
  Content.find().then((contents) => {
    return res.json(contents);
  });
});

/*
 * @route   POST api/content
 * @desc    Create a new content
 * @access  Public
 */
router.post("/", (req, res) => {
  const payload = req.body;
  const errors = { success: false };

  Content.findOne({ src: payload.src }).then((content) => {
    // Avoid creating duplicating srcs
    if (content) {
      errors.message = "Content with the same src already exists";
      return res.status(403).json(errors);
    }

    const newContent = new Content({
      src: payload.src,
      extension: payload.extension,
      text: payload.text,
      quality: payload.quality,
      size: payload.size,
      size_unit: payload.size_unit,
    });

    newContent
      .save()
      .then((content) => {
        res.status(201).json({
          success: true,
          data: content,
          message: "Content created",
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
 * @route   PUT api/content/:content_id
 * @desc    Update a content using Id
 * @access  Public
 */
router.put("/", (req, res) => {
  const contentId = req.params.content_id;
  const payload = req.body;
  const errors = { success: false };

  Content.findById(contentId).then((content) => {
    if (!content) {
      errors.message = "Content doesn't exist";
      return res.status(404).json(errors);
    }

    // TODO: Check if the src don't already exist

    const contentUpdate = {};
    contentUpdate.src = payload.src || content.src;
    contentUpdate.extension = payload.extension || content.extension;
    contentUpdate.text = payload.text || content.text;
    contentUpdate.quality = payload.quality || content.quality;
    contentUpdate.size = payload.size || content.size;
    contentUpdate.size_unit = payload.size_unit || content.size_unit;

    Content.findByIdAndUpdate(contentId, { $set: contentUpdate }, { new: true })
      .then((content) => {
        res.json({
          success: true,
          data: content,
          message: "Content updated",
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
 * @route   DELETE api/content/:content_id
 * @desc    Remove content using Id
 * @access  Public
 */
router.delete("/:content_id", (req, res) => {
  const contentId = req.params.content_id;
  const errors = { success: false };
  Content.findOneAndRemove({ _id: contentId })
    .then((content) => {
      res.json({ success: true, data: content, message: "Content deleted" });
    })
    .catch((errorDetails) => {
      errors.message = "Request failed";
      errors.details = errorDetails;
      res.status(500).json({ errors });
    });
});

export default router;
