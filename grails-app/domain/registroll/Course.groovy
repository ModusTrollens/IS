package registroll

class Course {
	
	/**
	 * Los niveles de curso
	 */
	int level

	/**
	 * Número de días que se imparte el curso
	 */
	String days

	/**
	 * Horas que se imparte el curso en un día
	 */
	String hours

	/**
	 * Indica si el curso se ha iniciado
	 */
	Boolean start

	/**
	 * Indica si el curso se ha terminado
	 */
	Boolean finish

	/**
	 * video con la descrición del curso
	 */
	byte[] video

	/**
	 * Profesor que imparte el curso
	 */
	Professor professor

	/**
	 * Relación muchos alumnos en un curso
	 */
	static hasMany = [students:Student]

	/**
	 * Definición de tipo de datos para video y pdf
	 */
	static mapping = {
		video sqlType: 'longblob'
		students cascade: 'all-delete-orphan'
	}

	/**
	 * Restricciones
	 */
	static constraints = {
		level min: 0, max: 3  // los cursos son de 4 niveles
		video nullable: true
	}
}
