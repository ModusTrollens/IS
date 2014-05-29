package registroll



import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class SessionController {

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]


    def login() {
		params
    }

	def authenticate() {
		def user = User.findByEmailAndPassword(params.email, params.password)
		if(user){
			session.user = user
			if(user instanceof Admin) {
				response.setContentType("application/json")
				render '{"success":true, "redirect":"professor/professor_validation/?access=' + user.name + '"}'
				return
			}
			if(user instanceof Professor) {
				response.setContentType("application/json")
				render '{"success":true, "redirect":"professor/edit?access=' + user.name + '"}'
			}
			if(user instanceof Student) {
				response.setContentType("application/json")
				render '{"success":true, "redirect":"student/edit?access=' + user.name + '"}'
			}
			
		}else{
			response.setContentType("application/json")
			render '{"error":true, "message":"usuario o contraseña incorrectos"}'
		  	//redirect(controller:"session", action:"login")
		}
	}

    def logout() {
		session.user = null
		redirect(controller:"session", action:"login", params:[logout:"true"])
    }
}
