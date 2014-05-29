package registroll

class Professor extends User {
	
	/**
	 * Constancia de acreditación
	 */
	byte[] pdf

	/*
	 * Si esta validado como profesor
	 */
	boolean isValidated

	/**
	 * Relacion un profesor por un curso
	 */
	static belongsTo = [course:Course]

	/**
	 * Definición de tipo de datos para video y pdf
	 */
	static mapping = {
		pdf sqlType: 'longblob'
	}

	/**
	 * Las restricciones de tamaño tanto para video como para profesor
	 */
	static constraints = {
		pdf nullable: true, maxSize:(10 * 1024 * 1024)
		course nullable:true
	}
}
