import express from "express";
const router = express.Router();

// Load Category Model
import Category from "../../models/Category.js";

// Load Utilities to help with managing Locale
import { addNewLocale, updateLocale } from "../../utils/utilities.js";

// Load helpers
import { isEmpty, slugIdGenerator } from "../../utils/helpers.js";

/*
 * @route   GET api/categories/test
 * @desc    Tests categories route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({ success: true, message: "Category route works" })
);

/*
 * @route   GET api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("locale")
      .populate("parent")
      .populate("ancestors");

    // Successful response
    return res.status(200).json({
      success: true,
      data: categories,
      message: "Category created",
    });
  } catch (errorDetails) {
    // Error response
    errors.message = "Request failed";
    errors.details = errorDetails;
    errors.status_code = 500;
    return errors;
  }
});

/*
 * @route   POST api/categories
 * @desc    Create a new category
 * @access  Public
 */
router.post("/", async (req, res) => {
  const payload = req.body;
  const errors = { success: false };

  const locale = await addNewLocale(payload);

  if (!locale.success) {
    return res.status(locale.status_code).json(locale);
  }

  const newCategory = new Category({
    path: payload.path,
  });

  newCategory.locale = locale.data._id;

  // Generate slug from title, and limit only to 7 words
  const slugPrefix = payload.title.toLowerCase().split(" ").slice(0, 7);

  // Make slugs unique by generating a random 7 characters Id
  const slugId = slugIdGenerator();
  newCategory.slug = slugPrefix.join("-") + `-${slugId}`;

  // Validate Parent ID and update ancestors
  if (!isEmpty(payload.parent_id)) {
    const parentCategory = await Category.findById(payload.parent_id);

    if (!isEmpty(parentCategory)) {
      newCategory.parent_id = parentCategory._id;
      newCategory.ancestor_ids = [];
      // If parent has a parent, then make that an ancestor of the child
      if (!isEmpty(parentCategory.parent_id)) {
        newCategory.ancestor_ids.push(parentCategory.parent_id);
        // If parent has ancestors, then include them to the child's ancestry
        if (!isEmpty(parentCategory.ancestor_ids)) {
          newCategory.ancestor_ids.push(...parentCategory.ancestor_ids);
        }
      }
    }
  }

  try {
    // Add category to database
    const toAdd = await newCategory.save();

    // Query added category and populate locale, parent, and ancestors
    const category = await Category.findById(toAdd._id)
      .populate("locale")
      .populate("parent")
      .populate("ancestors");

    // Successful response
    return res.status(201).json({
      success: true,
      data: category,
      message: "Category created",
    });
  } catch (errorDetails) {
    // Error response
    errors.message = "Request failed";
    errors.details = errorDetails;
    errors.status_code = 500;
    return errors;
  }
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

export default router;
