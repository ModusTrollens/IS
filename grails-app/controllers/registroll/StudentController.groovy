package registroll

import static org.springframework.http.HttpStatus.*
import grails.plugin.mail.MailMessageContentRenderer
import grails.transaction.Transactional

import org.xhtmlrenderer.pdf.ITextRenderer
import com.itextpdf.text.pdf.*

import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.parsers.DocumentBuilder

import org.codehaus.groovy.grails.plugins.web.taglib.ApplicationTagLib
import org.junit.After;
import org.w3c.dom.*

@Transactional(readOnly = true)
class StudentController {

	static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

	    def index(Integer max) {
	        params.max = Math.min(max ?: 10, 100)
	        respond Student.list(params), model:[studentInstanceCount: Student.count()]
	    }

	@Transactional
	def save() {
		if (params == null ||
			params.name == null ||
			params.email == null ||
			params.password == null ||
			params.phone == null ||
			params.course == null) {
			redirect(controller:"error", action:"notFound")
			return
		}
		Student student = new Student(name: params.name,
								email: params.email,
								password: params.password,
								phone: params.phone)
		
		Course course = Course.get(params.course)
		if(!course) {
			response.setContentType("application/json")
			render '{"error":true,"message": "curso no econtrado"}'
			return
		}
		if(course.finish) {
			response.setContentType("application/json")
			render '{"error":true,"message": "El curso ha terminado"}'
			return
		}
		if (student.hasErrors()) {
			StringBuilder sb = new StringBuilder();
			student.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		course.addToStudents(student);
		if (!course.save()) {
			StringBuilder sb = new StringBuilder();
			course.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		sendMail {
			async true
			to course?.professor?.email
			from 'admin@registroll.com'
			subject 'Un alumno desea inscribirse en curso'
			html """<p>
						El siguiente alumno desea inscribirte al curso de ingles nivel ${getStringLevel(course.level)}<br/>
						favor de comunicarse con el a la brevedad posible para dar inicio al curso.
					</p>
					<p>
						Alumno: <b>${student.name}</b><br/>
						Email:  <b>${student.email}</b>
					</p>
					<p style=\"font-size:10pt;\"> Para dar inicio al curso debe entrar en la cuenta y dar click en \"iniciar curos\"</p>
					<p style=\"font-size:6pt;\"> Si usted esta leyendo las letra pequeñas tiene buena vista</p>
					<p style=\"font-size:6pt;\"> Registroll 5000 es una marca registrada, lease los terminos y condicines de uso</p>"""
		 }
		response.setContentType("application/json")
		render '{"success":true,"message":"El alumno se ha incripto al curso"}'
	}

    def edit() {
		if(!session.user || !(session.user instanceof Student)) {
			redirect(controller:"session", action:"login")
			return
		}
		def student = Student.get(session.user.id)
		[studentInstance:student]
    }

    @Transactional
    def update(Student studentInstance) {
		if(!session.user || !(session.user instanceof Student)) {
			response.setContentType("application/json")
			render '{"error":true,"message":"Sesion de alumno no iniciada"}'
			return
		}
		Student student = Student.get(session.user.id)
		student.setName(params.name)
		student.setPhone(params.phone)
		if(params.password) {
			student.setPassword(params.password)
		}
		if (!student.save(flush:true)) {
			StringBuilder sb = new StringBuilder();
			student.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		response.setContentType("application/json")
		render '{"success":true,"message":"El alumno se ha modificado satisfactoriamente"}'
    }

    @Transactional
    def delete(Student studentInstance) {
		if(!session.user || !(session.user instanceof Student)) {
			response.setContentType("application/json")
			render '{"error":true,"message":"Sesion de studento no iniciada"}'
			return
		}
		Student student = Student.get(session.user.id)
		Course course = student.course;
		course.removeFromStudents(student)
		if (!course.save(fluse:true)) {
			StringBuilder sb = new StringBuilder();
			course.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		session.user = null
		response.setContentType("application/json")
		render '{"success":true,"message":"El alumno se ha borrado satisfactoriamente"}'
    }

	def protected constancy(Student student){
		StringBuffer buffer = new StringBuffer();
		buffer.append("""\
						<html xmlns="http://www.w3.org/1999/xhtml">
							<head>
								<style type="text/css">
									body {
										font-family: Verdana, Arial, Helvetica, sans-serif;
										width: 100%;
										margin: 0% 0% 10%;
										background: whitesmoke;
									}
									#container {
										width: 80%;
										margin: auto;
										text-align: center;
										box-shadow:
												0 2px 2px rgba(0,0,0,0.2),
												0 1px 5px rgba(0,0,0,0.2); 
										background-color: white;
										border-radius: 5px;
									}
									#cons_title {
										font-size:25pt;
										font-weight:bold;
										padding:20px;
									}
									#cons_subtitle {
										font-size:15pt;
									}
									#cons_const {
										padding:50px;
										font-size:50pt;
										text-shadow:1px 1px gray;
										font-weight:bold;
									}
									#cons_a_name {
										margin-left:-53%;
									}
									#cons_name {
										margin:-5%;
										padding-bottom:20%;
										font-size:30pt;
										font-weight:bold;
										color:gray;
										text-decoration:underline;
									}
									#cons_course {
										font-size:15pt;
									}
									#cons_course b {
										color:orange;
									}
								</style>
							</head>
							<body>
								<div id="cons_image"></div>
								<div id="container">
									<div id="cons_title">Modus Trollens </div>
									<div id="cons_subtitle">A traves de su sitio web Registroll<br/> otorga la presente:</div>
									<div id="cons_const">CONSTANCIA</div>
									<div id="cons_a_name">a:</div>
									<div id="cons_name">${student.name}</div>
									<div id="cons_course">por haber asistido al Curso de</div>
									<div>Ingles nivel: <b>${getStringLevel(student.course.level)}</b></div>
								</div>
	 						</body>
						</html>""")
		return buffer.toString()
	}

	def protected getStringLevel(int numberOfLevel) {
		switch(numberOfLevel) {
			case 0:
				return "Principiante"
			case 1:
				return "Intermedio"
			case 2:
				return "Avanzado"
			case 3:
				return "Conversación"
			default:
				return null
		}
	}

	def renderCons() {
		if(!session.user || !(session.user instanceof Student)) {
			redirect(controller:"session", action:"login")
			return
		}
		Student student = Student.get(session.user.id)
		if(student.rating <= 5) {
			redirect(controller:"session", action:"login")
			return
		}
		DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder()
		Document doc = builder.parse(new StringBufferInputStream(constancy(student)))
		ITextRenderer renderer = new ITextRenderer()
		renderer.setDocument(doc, null)
		 ByteArrayOutputStream os = new ByteArrayOutputStream()
		renderer.layout()
		renderer.createPDF(os)
		response.setContentType("application/pdf")
		response.outputStream << os.toByteArray()
	}
}
