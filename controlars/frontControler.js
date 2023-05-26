const UserModel = require('../model/user')
const CourseModel = require('../model/Course')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

cloudinary.config({
    cloud_name: 'di61xlmoy',
    api_key: '365262784934562',
    api_secret: 'BhgYhnemhXBA_VcD5e5nZdH5gt8',
    //secure: true
});

class frontController {

    static registration = (req, res) => {
        try {
            res.render('registration', { message: req.flash('error') })
        } catch {
            console.log(error)
        }
    }


    static dasboard = async (req, res) => {

        try {
            const { name, email, id, image, mob } = req.user
            const tranformname = name.toUpperCase()
            const btech = await CourseModel.findOne({ user_id: id, course: 'btech' })
            const bca = await CourseModel.findOne({ user_id: id, course: 'BCA' })
            const mca = await CourseModel.findOne({ user_id: id, course: 'MCA' })
            res.render('dasboard', { n: tranformname, e: email, i: image.url, b: btech, bca: bca, mc: mca })
        } catch (error) {
            console.log(error)
        }
    }

    static about = (req, res) => {
        try {
            const { name, email, id, image } = req.user
            const tranformname = name.toUpperCase()
            res.render('about', { n: tranformname, i: image.url });

        } catch (error) {
            console.log(error)
        }
    }

    static contact = (req, res) => {
        try {
            const { name, email, id, image } = req.user
            const tranformname = name.toUpperCase()
            res.render('contact', { n: tranformname, i: image.url });

        } catch (error) {
            console.log(error)
        }
    }

    static profile = (req, res) => {
        try {
            const { name, email, id, image, mob } = req.user
            const tranformname = name.toUpperCase()

            res.render('profile', { n: tranformname, i: image.url, m: mob, e: email, message: req.flash('success'), error: req.flash('error') });


        } catch (error) {
            console.log(error)
        }
    }

    static change_password = async (req, res) => {
        try {
            const { name, email, id, image } = req.user
            const tranformname = name.toUpperCase()
            //console.log(req.body)
            const { oldpassword, newpassword, cpassword } = req.body
            if (oldpassword && newpassword && cpassword) {
                const user = await UserModel.findById(id)
                const ismatched = await bcrypt.compare(oldpassword, user.password)
                if (!ismatched) {
                    req.flash('error', 'old password is  incorrect')
                    res.redirect('/profile')
                } else {
                    if (newpassword !== cpassword) {
                        req.flash('error', 'Password does not match')
                        res.redirect('/profile')

                    } else {
                        const newHashpassword = await bcrypt.hash(newpassword, 10)
                        await UserModel.findByIdAndUpdate(id, {
                            $set: { password: newHashpassword }
                        })
                        req.flash('message', 'Password changed successfully')
                        res.redirect('/logout')
                    }
                }

            } else {
                req.flash('error', 'All fields are required')
                res.redirect('/profile')
            }

        } catch (error) {
            console.log(error)
        }
    }
    static profile_update = async (req, res) => {
        try {
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModel.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);

                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "Admissionabhay",

                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,

                }
            }
            const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }







    static login = (req, res) => {
        try {
            res.render('login', { message: req.flash('error') })
        } catch {
            console.log(error)
        }
    }

    static insertregister = async (req, res) => {
        try {
            // console.log("nice one")
            // console.log(req.files.image)
            // console.log(req.body)
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'Admissionabhay'
            })
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            // console.log(myimage)
            // console.log('hello')
            const insert = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                mob: req.body.mob,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
            })
            await insert.save()
            this.sendEmail(req.body.name, req.body.email)
            res.redirect('/')
            // console.log(insert)
        } catch (error) {

            console.log(error)
        }
    }

    static verifylogin = async (req, res) => {
        try {
            //console.log(req.body)
            const { email, password } = req.body
            if (email && password) {

                const user = await UserModel.findOne({ email: email })

                if (user) {
                    const ismatched = await bcrypt.compare(password, user.password)

                    if (ismatched) {
                        //multiple login
                        if (user.role == 'student') {
                            //genrate jwt token
                            const token = jwt.sign({ id: user._id }, 'abhaydixit12323')
                            //console.log(token)
                            res.cookie('token', token)
                            res.redirect('/dasboard')

                        }
                        if (user.role == 'admin') {
                            //genrate jwt token
                            const token = jwt.sign({ id: user._id }, 'abhaydixit12323')
                            //console.log(token)
                            res.cookie('token', token)
                            res.redirect('/admin/dashboard')
                        }


                    } else {
                        req.flash('error', 'Email or password is incorrect')
                        res.redirect('/')
                    }

                } else {
                    req.flash('error', 'you are not register user')
                    res.redirect('/')
                }

            } else {
                req.flash('error', 'All fields are required')
                res.redirect('/')
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    static logout = async (req, res) => {
        try {
            res.clearCookie('token')
            res.redirect('/')

        } catch (error) {
            console.log(error)
        }
    }

    static sendEmail = async (name, email) => {
        // console.log("email sending")
        //consollog("propertyName")
        // console.log(email)

        //connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "dixitabhay633@gmail.com",
                pass: "wdwgrltwxxbxvekv",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Create  Registration Succesfully", // Subject line
            text: "heelo", // plain text body
            html: `<b>${name}</b> Registration is successful! please login.. `, // html body
        });
        //console.log("Messge sent: %s", info.messageId);
    };


}


module.exports = frontController