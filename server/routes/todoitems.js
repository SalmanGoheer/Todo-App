const router = require("express").Router();
// importing todo model
const todoItemModel = require("../models/todoitems");



router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemModel({
      item: req.body.item,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// route to get data from database
router.get("/api/item", async (req, res) => {
  try {
        const allTodoItems = await todoItemModel.find({});
        res.status(200).json(allTodoItems)
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// route to update items
router.put("/api/item/:id", async (req, res) => {
    try {
      const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json("item Updated successfully");
    } catch (err) {
      console.error(err); // Log the error
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // route to Delete items
router.delete("/api/item/:id", async (req, res) => {
  try {
    const deletedItem = await todoItemModel.findOneAndDelete({ _id: req.params.id });
    if (deletedItem) {
      res.status(200).json("Item Deleted successfully");
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = router;


