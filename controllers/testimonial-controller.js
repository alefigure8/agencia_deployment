import {Testimonial} from '../models/testimoniales.js'

const guardarTestimoniales = async (req, res) => {

    //Validar
    const { nombre, correo, mensaje } = req.body

    const errores = []

    if (nombre.trim() === '') {
        errores.push({mensaje : 'El nombre está vacío'})
    }

    if (correo.trim() === '') {
        errores.push({mensaje : 'El Correo está vacío'})
    }

    if (mensaje.trim() === '') {
        errores.push({mensaje : 'El Mensaje está vacío'})
    }

    if(errores.length > 0){
        //Consultar testimoniales
        const testimoniales = await Testimonial.findAll()

        //Mostrar vista con errores

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else{
        //almacenar en al base de datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }

}

export {
    guardarTestimoniales
}