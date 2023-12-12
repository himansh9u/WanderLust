const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const reviewController = require("../controllers/reviews.js");

const {
    validateReview,
    isLoggedIn,
    isReviewAuthor,
} = require("../middleware.js");

//Post review route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.postReview)
);

//Delete review route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;
