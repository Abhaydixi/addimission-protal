const CourseModel = require("../model/Course")

class CourseControler {

    static course_insert = async (req, res) => {
        try {
            //console.log(req.body)
            const result = new CourseModel({
                name: req.body.name,
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                gender: req.body.gender,
                qualification: req.body.qualification,
                course: req.body.course,
                user_id: req.user._id
            })
            // console.log(result)
            await result.save()
            res.redirect('/course_display')


        } catch (error) {
            console.log(error)
        }
    }

    static Course_display = async (req, res) => {
        try {
            const { name, email, id, image } = req.user
            const tranformname = name.toUpperCase()

            const data = await CourseModel.find({ user_id: req.user._id })
            //console.log(data);
            res.render('coures/display', { d: data, n: tranformname, i: image.url })

        } catch (error) {
            console.log(error)
        }
    }

    static Course_view = async (req, res) => {
        try {
            const { name, email, id, image } = req.user
            const tranformname = name.toUpperCase()
            //console.log(req.params.id)

            const data = await CourseModel.findById(req.params.id)
            //console.log(data);
            res.render('coures/view', { d: data, n: tranformname, i: image.url })

        } catch (error) {
            console.log(error)
        }
    }

    static Course_edit = async (req, res) => {
        try {
            const { name, email, id, image } = req.user
            const tranformname = name.toUpperCase()
            //console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            //console.log(data);
            res.render('coures/edit', { d: data, n: tranformname, i: image.url })

        } catch (error) {
            console.log(error)
        }
    }

    static Course_update = async (req, res) => {
        try {
            //console.log(req.body);
            //console.log(req.params.id);
            const update = await CourseModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                gender: req.body.gender,
                qualification: req.body.qualification,
                course: req.body.course

            })
            await update.save()
            res.redirect('/course_display')

        } catch (error) {
            console.log(error)
        }
    }


    // static Course_delete = async(req,res)=>{
    //     try{
    //        //console.log(req.body);
    //         //console.log(req.params.id);
    //         const update = await CourseModel.findByIdAndDelete(req.params.id)

    //         res.redirect('/course_display')

    //     } catch(error){
    //         console.log(error)
    //     }
    // }



}

module.exports = CourseControler