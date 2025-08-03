
const { Book } = require("../model/book.model");

async function handleBookStoreController(req, res) {
  try {
    const { BookName, BookTitle, Author, SellingPrice, PublishDate } = req.body;
    if (!BookName || !BookTitle || !SellingPrice) {
      return res.status(400).json({ Message: "Name, Title & Price are required", Success: false });
    }
    const payload = { BookName, BookTitle, Author, SellingPrice };
    if (PublishDate) payload.PublishDate = new Date(PublishDate);

    const newBook = await Book.create(payload);
    return res.status(201).json({ Message: "Created successfully", Success: true, Book: newBook });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
}

async function handleBookListController(req, res) {
  try {
    const list = await Book.find({});
    return res.status(200).json({
      Message: "Fetched successfully",
      Success: true,
      TotalCount: list.length,
      BookList: list
    });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
}


async function handleBookDeleteController(req, res) {
  try {
    const { Id } = req.body;
    if (!Id) return res.status(400).json({ Message: "Id required", Success: false });

    const deleted = await Book.findByIdAndDelete(Id);
    if (!deleted) return res.status(404).json({ Message: "Not found", Success: false });

    return res.json({ Message: "Deleted successfully", Success: true });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
}


async function handleBookUpdateController(req, res) {
  try {
    const { Id, ...updates } = req.body;
    if (!Id) return res.status(400).json({ Message: "Id required", Success: false });
    if (updates.PublishDate) updates.PublishDate = new Date(updates.PublishDate);

    const updated = await Book.findByIdAndUpdate(Id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ Message: "Not found", Success: false });

    return res.json({ Message: "Updated successfully", Success: true, Book: updated });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
}

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};
