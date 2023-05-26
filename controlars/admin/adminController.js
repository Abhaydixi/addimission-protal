const CourseModel = require("../../model/Course")



class adminController {
    static dashboard = async (req, res) => {
        try {
            const { name, email, id, image, mob } = req.user
            const tranformname = name.toUpperCase()
            const course = await CourseModel.find()
            //console.log(course)
            res.render('admin/dashboard', { n: tranformname, i: image.url, c: course })
            //console.log("first")

        } catch (error) {
            console.log(error)
        }

    }

}



module.exports = adminController