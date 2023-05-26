const express = require('express')
const CourseControler = require('../controlars/CourseControler')
const frontController = require('../controlars/frontControler')
const auth = require('../middleware/auth')
const islogin = require('../middleware/islogin')
const adminController = require('../controlars/admin/adminController')
const router = express.Router()

// route path front controler
router.get("/", islogin, frontController.login)
router.get('/about', auth, frontController.about)
router.get('/contact', auth, frontController.contact)
router.get('/profile', auth, frontController.profile)
router.get("/dasboard", auth, frontController.dasboard)
router.get("/registration", frontController.registration)
router.post('/register', frontController.insertregister)
router.post('/verifylogin', frontController.verifylogin)
router.get('/logout', frontController.logout)
router.post('/change_password', auth, frontController.change_password)
router.post('/profile_update', auth, frontController.profile_update)

// course controler
router.post('/course_insert', auth, CourseControler.course_insert);
router.get('/course_display', auth, CourseControler.Course_display);
router.get('/course_view/:id', auth, CourseControler.Course_view);
router.get('/course_edit/:id', auth, CourseControler.Course_edit);
router.post('/course_update/:id', auth, CourseControler.Course_update);
//router.get('/course_delete/:id',CourseControler.Course_delete);


//admin controller
router.get('/admin/dashboard', auth, adminController.dashboard)


module.exports = router