package registroll


import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class UserController {

	def existUser() {
		if(! params.email) {
			response.setContentType("application/json")
			render '{"error":"email is null"}'
			return
		}
		User user = User.findByEmail(params.email)
		if(user == null) {
			response.setContentType("application/json")
			render '{"exist":false}'
			return
		}
		response.setContentType("application/json")
		render '{"exist":true}'
	}
}
