const userController = require("./userController");
const organizationController = require("./organizationController");
const membershipController = require("./membershipController");
const eventController = require("./eventController");
const rsvpController = require("./rsvpController");
const postController = require("./postController");
const notificationController = require("./notificationController");
const socialMediaLinkController = require("./mediaLinkController");
const authController = require("./authController");



module.exports = {
    userController,
    organizationController,
    membershipController,
    eventController,
    rsvpController,
    postController,
    notificationController,
    socialMediaLinkController,
    authController
}