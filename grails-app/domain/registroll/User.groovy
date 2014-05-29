package registroll

class User {
	/**
	 * Contraseña del usuario.
	 */
	String password
	/**
	 * Correo electrónico del usuario, este es unico.
	 */
	String email
	/**
	 * Nombre del usuario.
	 */
	String name

	static constraints = {
		password size: 1..300, blank: false
		email size: 3..100, blank: false, email: true, unique: true
		name size: 1..100, blank: false
	}

	/**
	 * La forma de cadena de un usuario es simplemente su nombre
	 */
	String toString() {
		"${name}"
	}
}
