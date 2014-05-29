package registroll

class Student extends User{
	/**
	 * Teléfono del usuario
	 */
	String phone

	/**
	 * Calificación del curso al que se inscribio
	 */
	int rating

	/**
	 * Comentarios de la razón por la cual el alumno no aprobó
	 */
	String comment

	/**
	 * Relación muchos alumnos en un curso
	 */
	static belongsTo = [course:Course]

	/**
	 * Restricciones
	 */
	static constraints = {
		phone size: 3..18, blank: false  // restricción el numero telefonico es de máximo 18 dígitos
		rating nullable:true
		comment nullable:true
	}
}
