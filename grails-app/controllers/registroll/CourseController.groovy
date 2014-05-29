package registroll



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class CourseController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
		params.max = max ?: 10 //por defecto 10
		params.offset = params.offset ?: 0
		def levelstring = ""
		if(params.level) {
			levelstring = getStringLevel(Integer.parseInt(params.level))
			def courseList = Course.executeQuery("""FROM Course AS course WHERE
												course.professor.isValidated = 1 
												AND course.finish = 0
												AND course.level=?""",
												[Integer.parseInt(params.level)] ,
												[max:params.max, offset:params.offset])
			def courseCountList = Course.executeQuery("""SELECT COUNT(*) FROM Course as course WHERE
												course.professor.isValidated = 1 AND course.finish = 0 AND course.level=?""",
												[Integer.parseInt(params.level)])
			[courseInstanceList:courseList, courseInstanceCount: courseCountList[0], level:levelstring, levelId:params.level]
		}
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

    def new_course() {
        respond new Course(params)
    }

	def course_request() {
		def course = Course.get(Integer.parseInt(params.id))
		[courseInstance:course]
	}

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'courseInstance.label', default: 'Course'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }

	def renderVideo() {
		if(!params.id) {
			return
		}
		params.id = params.id ?: ""
		def courseInstance = Course.get(Integer.parseInt(params.id))
		response.setContentType('video/ogg')
		byte[] oggVideo = courseInstance?.video
		response.outputStream << oggVideo
	}
}
