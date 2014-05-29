class UrlMappings {

	static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

		"/"(controller: 'home', action: 'index')
		"403"(controller: "error", action: "accessDenied")
		"404"(controller: "error", action: "notFound")
		"405"(controller: "error", action: "notAllowed")
		"500"(controller: "error", action: "internalError")
	}
}
