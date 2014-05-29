package registroll

class AdminController {

    def acceptWannabie() {
		if(!session.user || !(session.user instanceof Admin)) {
			redirect(controller:"session", action:"login")
			return
		}
		if(params == null || !params.accept || !params.professor) {
			response.setContentType("application/json")
			render '{"error":true,"message": "No estan definidos los parametros necesarios"}'
			return
		}
		def professor = Professor.get(Integer.parseInt(params.professor))
		if(!professor) {
			response.setContentType("application/json")
			render '{"error":true,"message": "El professor no existe"}'
			return
		}
		professor.setIsValidated(true)
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
		render '{"success":true}'
	}

}
