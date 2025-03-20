const router = require("express").Router();

const {
  userController,
  organizationController,
  membershipController,
  eventController,
  rsvpController,
  postController,
  notificationController,
  socialMediaLinkController,
  authController
} = require('../controllers/controller.js');




// Register
router.post('/register', authController.register);

// User
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById); // userInfo大接口
// router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser); // update userInfo
router.delete('/users/:userId', userController.deleteUser);

// Organization
router.get('/organizations', organizationController.getAllOrganizations);
router.get('/organizations/:id', organizationController.getOrganizationById);
router.post('/organizations', organizationController.createOrganization);
router.put('/organizations', organizationController.updateOrganization);
router.delete('/organizations/:organizationId', organizationController.deleteOrganization);

// Membership
// router.get('/memberships', membershipController.getAllMemberships);
router.get('/user/organizations/:userId', membershipController.getUserOrganizations);
router.get('/memberships/:organizationId', membershipController.getMembershipById); // get all member of the organization
router.post('/memberships', membershipController.createMembership); // user join organization
// router.put('/memberships/:id', membershipController.updateMembership);
// router.delete('/memberships/:id', membershipController.deleteMembership);

// Event
// router.get('/events', eventController.getAllEvents);
router.get('/events/:organizationId', eventController.getEventById); //通过organizationId拿到某个俱乐部的所有event
router.post('/events', eventController.createEvent);
router.put('/events', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent);

// RSVP
// router.get('/rsvps', rsvpController.getAllRSVPs);
router.get('/rsvps/users/:eventId', rsvpController.getAllRSVPUsers); // 通过eventId拿到所有rsvp过的User
router.get('/rsvps/:userId', rsvpController.getRSVPByUserId); // get the user all rsvp status
router.post('/rsvps', rsvpController.createRSVP); // reply rsvp
// router.put('/rsvps/:id', rsvpController.updateRSVP);
// router.delete('/rsvps/:id', rsvpController.deleteRSVP);

// Posts
// router.get('/posts', postController.getAllPosts);
router.get('/posts/:organizationId', postController.getPostById); //get all posts of the organization
router.post('/posts', postController.createPost); // create a new post
router.put('/posts', postController.updatePost); // update a post
router.delete('/posts/:postId', postController.deletePost); // delete a post

// Notification
// router.get('/notifications', notificationController.getAllNotifications);
// router.get('/notifications/:id', notificationController.getNotificationById);
// router.post('/notifications', notificationController.createNotification);
// router.put('/notifications/:id', notificationController.updateNotification);
// router.delete('/notifications/:id', notificationController.deleteNotification);

// Medialinks
// router.get('/social-links', socialMediaLinkController.getAllSocialMediaLinks);
// router.get('/social-links/:id', socialMediaLinkController.getSocialMediaLinkById);
// router.post('/social-links', socialMediaLinkController.createSocialMediaLink);
// router.put('/social-links/:id', socialMediaLinkController.updateSocialMediaLink);
// router.delete('/social-links/:id', socialMediaLinkController.deleteSocialMediaLink);

module.exports = router;
