package registroll

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ProfessorController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def professor_validation(Integer max) {
		if(!session.user || !(session.user instanceof Admin)) {
			redirect(controller:"session", action:"login")
			return
		}
		params.max = max ?: 10 //por defecto 10
		params.offset = params.offset ?: 0
		def wannabieInstanceList = Professor.executeQuery("""FROM Professor AS professor WHERE
												professor.isValidated = 0""",
												[max:params.max, offset:params.offset])
		def wannabieInstanceListCount = Professor.executeQuery("""SELECT COUNT(*) FROM Professor AS 
													professor WHERE professor.isValidated = 0""",)
        [professorInstanceList: wannabieInstanceList, professorInstanceCount: wannabieInstanceListCount]
    }

	def candidate_review() {
		if(!params.id) {
			return;
		}
		def professor = Professor.get(Integer.parseInt(params.id))
		if(professor) {
			[professorInstance:professor]
		}
	}

	def register() {
	}

    @Transactional
    def save() {
		if (params == null || 
			params.name == null ||
			params.email == null ||
			params.password == null ||
			params.pdf == null ||
			params.courselvl == null ||
			params.coursedays == null ||
			params.coursehours == null ||
			params.coursevideo == null) {
			notFound()
			return
		}
		Professor professor = new Professor(name: params.name,
											email: params.email,
											password: params.password,
											pdf: params.pdf.bytes,
											isValidated: false
											)
		
		Course course = new Course(level: params.courselvl,
								   days: params.coursedays,
								   hours: params.coursehours,
								   start: false,
								   finish: false,
								   video: params.coursevideo.bytes,
								   professor: professor
								   )

        if (course.hasErrors()) {
			StringBuilder sb = new StringBuilder();
			course.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
            return
        }
		if (!course.save(flush:true)) {
			StringBuilder sb = new StringBuilder();
			course.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		response.setContentType("application/json")
		render '{"success":true,"message":"El professor se ha creado satisfactoriamente"}'
    }

    def edit() {
		if(!session.user || !(session.user instanceof Professor)) {
			redirect(controller:"session", action:"login")
			return
		}
		Professor professor = Professor.get(session.user.id)
		def studentList = professor?.course?.students
		[professorInstance:professor, studentInstanceList: studentList, studentInstanceCount:studentList?.size()]
    }

	@Transactional
	def update() {
		if(!session.user || !(session.user instanceof Professor)) {
			response.setContentType("application/json")
			render '{"error":true,"message":"Sesion de profesor no iniciada"}'
			return
		}
		Professor professor = Professor.get(session.user.id)
		professor.setName(params.name)
		if(params.pdf) {
			professor.setPdf(params.pdf.bytes)
		}
		if(params.password) {
			professor.setPassword(params.password)
		}
		if (!professor.save(flush:true)) {
			StringBuilder sb = new StringBuilder();
			professor.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		response.setContentType("application/json")
		render '{"success":true,"message":"El profesor se ha modificado satisfactoriamente"}'
	}

	@Transactional
	def delete() {
		if(!session.user || !(session.user instanceof Professor)) {
			response.setContentType("application/json")
			render '{"error":true,"message":"Sesion de profesor no iniciada"}'
			return
		}
		Professor professor = Professor.get(session.user.id)
		if (!professor.course.delete(flush:true)) {
			StringBuilder sb = new StringBuilder();
			professor.course.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		session.user = null
		response.setContentType("application/json")
		render '{"success":true,"message":"El profesor se ha borrado satisfactoriamente"}'
	}

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'professorInstance.label', default: 'Professor'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }

	def renderPdf() {
		if(!params.id) {
			return
		}
		def professorInstance = Professor.get(Integer.parseInt(params.id))
		response.setContentType('application/pdf')
		byte[] pdf = professorInstance?.pdf
		response.outputStream << pdf
	}

	@Transactional
	def startCourse() {
		if(!session.user || !(session.user instanceof Professor)) {
			response.setContentType("application/json")
			render '{"error":true,"message":"Sesion de profesor no iniciada"}'
			return
		}
		Professor professor = Professor.get(session.user.id)
		Course course = professor.course
		course.setStart(true)
		if (!course.save(flush:true)) {
			StringBuilder sb = new StringBuilder();
			course.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		response.setContentType("application/json")
		render '{"success":true,"message":"se ha iniciado el curso"}'
	}

	@Transactional
	def setRating() {
		if(!session.user || !(session.user instanceof Professor)) {
			response.setContentType("application/json")
			render '{"error":true,"message":"Sesion de profesor no iniciada"}'
			return
		}
		Professor professor = Professor.get(session.user.id)
		params.numberOfStudents = params.numberOfStudents ?: 0;
		def length = Integer.parseInt(params.numberOfStudents)
		for(int i = 0; i < length; i++) {
			Student student = Student.get(params[(i + '-id')])
		    if(params[(i + '-rating')]) {
				student.setRating(Integer.parseInt(params[(i + '-rating')]))
			}
			if(params[(i + '-comment')]) {
				student.setComment(params[(i + '-comment')])
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
		}
		Course course = professor.course
		course.setFinish(true)
		if (!course.save(flush:true)) {
			StringBuilder sb = new StringBuilder();
			course.errors.each {
				sb.append(it.toString() + "<br />");
			}
			response.setContentType("application/json")
			render '{"error":true,"message":"' + sb.toString() + '"}'
			return
		}
		response.setContentType("application/json")
		render '{"success":true,"message":"se ha iniciado el curso"}'
	}			
}