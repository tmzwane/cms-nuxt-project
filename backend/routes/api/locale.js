import express from "express";
const router = express.Router();

// Load Locale Model
import Locale from "../../models/Locale.js";

/*
 * @route   GET api/locale/test
 * @desc    Tests locale route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({ success: true, message: "Locale route works" })
);

/*
 * @route   GET api/locale
 * @desc    Get all locales
 * @access  Public
 */
router.get("/", (req, res) => {
  Locale.find().then((locales) => {
    return res.json(locales);
  });
});

/*
 * @route   POST api/locale
 * @desc    Create a new locale
 * @access  Public
 */
router.post("/", (req, res) => {
  const payload = req.body;
  const errors = { success: false };

  Locale.findOne({ title: payload.title }).then((locale) => {
    // Avoid creating duplicating titles
    if (locale) {
      errors.message = "Locale with the same title already exists";
      return res.status(403).json(errors);
    }

    const newLocale = new Locale({
      title: payload.title,
      description: payload.description,
      summary: payload.summary,
      seo_title: payload.seo_title,
      seo_description: payload.seo_description,
      seo_summary: payload.seo_summary,
      use_seo_values: payload.use_seo_values,
    });

    newLocale
      .save()
      .then((locale) => {
        res.status(201).json({
          success: true,
          data: locale,
          message: "Locale created",
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
 * @route   PUT api/locale/:locale_id
 * @desc    Update a locale using Id
 * @access  Public
 */
router.put("/", (req, res) => {
  const localeId = req.params.locale_id;
  const payload = req.body;
  const errors = { success: false };

  Locale.findById(localeId).then((locale) => {
    if (!locale) {
      errors.message = "Locale doesn't exist";
      return res.status(404).json(errors);
    }

    // TODO: Check if the title don't already exist

    const localeUpdate = {};
    localeUpdate.title = payload.title || locale.title;
    localeUpdate.description = payload.description || locale.description;
    localeUpdate.summary = payload.summary || locale.summary;
    localeUpdate.seo_title = payload.seo_title || locale.seo_title;
    localeUpdate.seo_description =
      payload.seo_description || locale.seo_description;
    localeUpdate.seo_summary = payload.seo_summary || locale.seo_summary;
    localeUpdate.use_seo_values =
      payload.use_seo_values || locale.use_seo_values;

    Locale.findByIdAndUpdate(localeId, { $set: localeUpdate }, { new: true })
      .then((locale) => {
        res.json({
          success: true,
          data: locale,
          message: "Locale updated",
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
 * @route   DELETE api/locale/:locale_id
 * @desc    Remove locale using Id
 * @access  Public
 */
router.delete("/:locale_id", (req, res) => {
  const localeId = req.params.locale_id;
  const errors = { success: false };
  Locale.findOneAndRemove({ _id: localeId })
    .then((locale) => {
      res.json({ success: true, data: locale, message: "Locale deleted" });
    })
    .catch((errorDetails) => {
      errors.message = "Request failed";
      errors.details = errorDetails;
      res.status(500).json({ errors });
    });
});

export default router;
