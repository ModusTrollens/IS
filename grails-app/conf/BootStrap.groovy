import registroll.Admin
import registroll.User


class BootStrap {

    def init = { servletContext ->
		def admin = new Admin(password:"C6FB460F35264384E9745CF8A7EEB16A34C5E5B60FE86C8AB56663AF9F12BE5C93E917B750A7931AF3A2669BA21CF833B40320CFD00A1569B4F127548E453F83",//registroll
			name:"admin",
			email:"admin@registroll.com")
		admin.save()
    }

    def destroy = {
    }
}
