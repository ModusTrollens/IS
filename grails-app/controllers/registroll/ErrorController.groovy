package registroll

class ErrorController {

	def acessDenied() {}

	def notFound() {}

	def notAllowed() {}

	def internalError() {
		def pcontroller = params.pcontroller ?: false
		def paction = params.paction ?: false
		["pcontroller": pcontroller, "paction": paction]
	}
}
