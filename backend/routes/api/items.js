import express from "express";
const router = express.Router();

// Load Item Model
import Item from "../../models/Item.js";

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
router.get("/", (req, res) => {
  Item.find().then((items) => {
    return res.json(items);
  });
});

/*
 * @route   POST api/items
 * @desc    Create a new item
 * @access  Public
 */
router.post("/", (req, res) => {
  const payload = req.body;
  const errors = { success: false };

  Item.findOne({ slug: payload.slug }).then((item) => {
    // Avoid creating duplicating slugs
    if (item) {
      errors.message = "Item with the same slug already exists";
      return res.status(403).json(errors);
    }

    const newItem = new Item({
      item_type: payload.item_type,
      slug: payload.slug,
      locale: payload.locale,
      creator: payload.creator,
      media: payload.media,
      content: payload.content,
      categories: payload.categories,
    });

    newItem
      .save()
      .then((item) => {
        res.status(201).json({
          success: true,
          data: item,
          message: "Item created",
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
