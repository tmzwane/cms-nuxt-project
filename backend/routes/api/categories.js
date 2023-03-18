const express = require("express");
const router = express.Router();

// Load Category Model
const Category = require("../../models/Category");

/*
 * @route   GET api/categories/test
 * @desc    Tests categories route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({ success: "Category route works" })
);

/*
 * @route   GET api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get("/", (req, res) => {
  Category.find().then((categories) => {
    return res.json(categories);
  });
});

/*
 * @route   POST api/categories
 * @desc    Create a new category
 * @access  Public
 */
router.post("/", (req, res) => {
  const payload = req.body;
  const errors = { success: false };

  Category.findOne({
    $or: [{ slug: payload.slug }, { path: payload.path }],
  }).then((category) => {
    // Avoid creating duplicating slugs and paths
    if (category) {
      errors.message = "Category with the same slug or path already exists";
      return res.status(403).json(errors);
    }

    // TODO: Validate Parent and Ancestor IDs
    // TODO: Validate Locale

    const newCategory = new Category({
      slug: payload.slug,
      path: payload.path,
      parent_id: payload.parent_id,
      ancestor_ids: payload.ancestor_ids,
      locale: payload.locale,
    });

    newCategory
      .save()
      .then((category) => {
        res.status(201).json({
          success: true,
          data: category,
          message: "Category created",
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
 * @route   PUT api/categories/:category_id
 * @desc    Update a category using Id
 * @access  Public
 */
router.put("/", (req, res) => {
  const categoryId = req.params.category_id;
  const payload = req.body;
  const errors = { success: false };

  Category.findById(categoryId).then((category) => {
    if (!category) {
      errors.message = "Category doesn't exist";
      return res.status(404).json(errors);
    }

    // TODO: Check if the new slug and path don't already exist
    // TODO: Validate Parent and Ancestor IDs
    // TODO: Validate Locale

    const categoryUpdate = {};
    categoryUpdate.slug = payload.slug || category.slug;
    categoryUpdate.path = payload.path || category.path;
    categoryUpdate.parent_id = payload.parent_id || category.parent_id;
    categoryUpdate.locale = payload.locale || category.locale;

    if (payload.ancestor_ids.length > 0) {
      categoryUpdate.ancestor_ids =
        payload.ancestor_ids || category.ancestor_ids;
    }

    Category.findByIdAndUpdate(
      categoryId,
      { $set: categoryUpdate },
      { new: true }
    )
      .then((category) => {
        res.json({
          success: true,
          data: category,
          message: "Category updated",
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
 * @route   DELETE api/categories/:category_id
 * @desc    Remove category using Id
 * @access  Public
 */
router.delete("/:category_id", (req, res) => {
  const categoryId = req.params.category_id;
  const errors = { success: false };
  Category.findOneAndRemove({ _id: categoryId })
    .then((category) => {
      res.json({ success: true, data: category, message: "Category deleted" });
    })
    .catch((errorDetails) => {
      errors.message = "Request failed";
      errors.details = errorDetails;
      res.status(500).json({ errors });
    });
});

module.exports = router;
