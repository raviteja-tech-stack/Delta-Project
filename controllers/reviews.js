const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.updateReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.review.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review created!");

  res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async (req, res, next) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`);
};
