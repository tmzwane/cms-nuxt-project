import express from "express";
const router = express.Router();

// Load Item Model
import Item from "../../models/Item.js";

// Load Utils
import { isEmpty, slugIdGenerator } from "../../utils/helpers.js";
import { addNewLocale, updateLocale } from "../../utils/utilities.js";

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
router.put("/", (req, res) => {
  const itemId = req.params.item_id;
  const payload = req.body;
  const errors = { success: false };

  Item.findById(itemId).then((item) => {
    if (!item) {
      errors.message = "Item doesn't exist";
      return res.status(404).json(errors);
    }

    // TODO: Check if the slug don't already exist

    const itemUpdate = {};
    itemUpdate.item_type = payload.item_type || item.item_type;
    itemUpdate.slug = payload.slug || item.slug;
    itemUpdate.locale = payload.locale || item.locale;
    itemUpdate.creator = payload.creator || item.creator;
    itemUpdate.media = payload.media || item.media;
    itemUpdate.content = payload.content || item.content;
    itemUpdate.categories = payload.categories || item.categories;

    Item.findByIdAndUpdate(itemId, { $set: itemUpdate }, { new: true })
      .then((item) => {
        res.json({
          success: true,
          data: item,
          message: "Item updated",
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
 * @route   DELETE api/items/:item_id
 * @desc    Remove item using Id
 * @access  Public
 */
router.delete("/:item_id", (req, res) => {
  const itemId = req.params.item_id;
  const errors = { success: false };
  Item.findOneAndRemove({ _id: itemId })
    .then((item) => {
      res.json({ success: true, data: item, message: "Item deleted" });
    })
    .catch((errorDetails) => {
      errors.message = "Request failed";
      errors.details = errorDetails;
      res.status(500).json({ errors });
    });
});

export default router;
