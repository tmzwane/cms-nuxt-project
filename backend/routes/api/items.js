import express from "express";
const router = express.Router();

// Load Item Model
import Item from "../../models/Item.js";

// Load Utils
import { isEmpty, slugIdGenerator } from "../../utils/helpers.js";
import {
  addNewLocale,
  updateLocale,
  deleteLocale,
} from "../../utils/utilities.js";

/*
 * @route   GET api/items/test
 * @desc    Tests item route
 * @access  Public
 */
router.get("/test", (req, res) =>
  res.json({ success: true, message: "Item route works" })
);

/*
 * @route   GET api/items
 * @desc    Get all items
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().populate("locale").populate("categories");

    // Successful response
    return res.status(200).json({
      success: true,
      data: items,
      message: "Item created",
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
 * @route   POST api/items
 * @desc    Create a new item
 * @access  Public
 */
router.post("/", async (req, res) => {
  const payload = req.body;
  const errors = { success: false };

  // Create a local first for the item
  const locale = await addNewLocale(payload);

  if (!locale.success) {
    return res.status(locale.status_code).json(locale);
  }

  const text = payload.text || payload.description;

  // Prepare new Item
  const newItem = new Item({
    item_type: payload.item_type,
    locale: locale.data._id,
    creator: payload.creator,
    categories: payload.categories,
    media: {
      src: payload.src,
      type: payload.type,
    },
    content: {
      src: payload.src,
      extension: payload.extension,
      text,
      quality: payload.quality,
      size: payload.size,
      size_unit: payload.size_unit,
    },
  });

  // Generate slug from title, and limit only to 7 words
  const slugPrefix = payload.title.toLowerCase().split(" ").slice(0, 7);

  // Make slugs unique by generating a random 7 characters Id
  const slugId = slugIdGenerator();
  newItem.slug = slugPrefix.join("-") + `-${slugId}`;

  try {
    // Add item to database
    const toAdd = await newItem.save();

    // Query added category and populate locale, parent, and ancestors
    const item = await Item.findById(toAdd._id)
      .populate("locale")
      .populate("categories");

    // Successful response
    return res.status(201).json({
      success: true,
      data: item,
      message: "Item created",
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
 * @route   PUT api/items/:item_id
 * @desc    Update a item using Id
 * @access  Public
 */
router.put("/:item_id", async (req, res) => {
  const itemId = req.params.item_id;
  const payload = req.body;
  const errors = { success: false };

  const item = await Item.findById(categoryId);

  if (isEmpty(item)) {
    errors.message = "Item doesn't exist";
    return res.status(404).json(errors);
  }

  // Create a local first for the category
  const localUpdate = await updateLocale(item.locale, payload);

  if (!localUpdate.success) {
    return res.status(localUpdate.status_code).json(localUpdate);
  }

  // Prepare item update
  const toUpdate = {};

  // Update slug if title has changed
  let slug;
  if (category.locale.title !== payload.title) {
    const slugPrefix = payload.title.toLowerCase().split(" ").slice(0, 7);
    const slugId = slugIdGenerator();
    slug = slugPrefix.join("-") + `-${slugId}`;
  } else {
    slug = category.slug;
  }

  toUpdate.slug = slug;
  toUpdate.item_type = payload.item_type || item.item_type;
  toUpdate.locale = payload.locale || item.locale;
  toUpdate.creator = payload.creator || item.creator;
  toUpdate.media = payload.media || item.media;
  toUpdate.content = payload.content || item.content;
  toUpdate.categories = payload.categories || item.categories;

  try {
    const itemUpdate = await Item.findByIdAndUpdate(itemId, toUpdate);

    return res.json({
      success: true,
      data: itemUpdate,
      message: "Item updated",
    });
  } catch (errorDetails) {
    errors.message = "Request failed";
    errors.details = errorDetails;
    return res.status(500).json({ errors });
  }
});

/*
 * @route   DELETE api/items/:item_id
 * @desc    Remove item using Id
 * @access  Public
 */
router.delete("/:item_id", async (req, res) => {
  const itemId = req.params.item_id;
  const errors = { success: false };

  try {
    // Delete Item
    const toDelete = await Item.findById(itemId);
    await Item.findOneAndRemove({
      _id: itemId,
    });

    const deletedLocale = await deleteLocale(toDelete.locale);

    // Delete Locale
    if (deletedLocale.success) {
      return res.statusCode(204);
    } else {
      return res.status(deletedLocale.status_code).json(deletedLocale);
    }
  } catch (errorDetails) {
    errors.message = "Request failed";
    errors.details = errorDetails;
    return res.status(500).json({ errors });
  }
});

export default router;
