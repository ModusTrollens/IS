package registroll

class HomeController {

    def index() {
		if(session.user) {
			def action = (session.user instanceof Student || session.user instanceof Professor) ? "edit" : "professor_validation"
			def controller = (session.user instanceof Student) ? "student" : "professor"
			[userInstance:true, uaction:action, ucontroller:controller]
		} else {
			params
		}
	}
}
