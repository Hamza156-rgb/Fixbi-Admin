import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth-service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'providers/config/config.service';

@Component({
	 selector: 'ms-register-session',
	 templateUrl:'./register-component.html',
	 styleUrls: ['./register-component.scss'],
	 encapsulation: ViewEncapsulation.None,
})

export class RegisterComponent {
	formData = {
		name:'',
	email:'',
	password		    : '',
	user_type : '1',
	passwordConfirm : '',
	}
	

	constructor( public authService: AuthService,
				    public translate : TranslateService,
					public config: ConfigService) { }

	//register method is used to sign up on the template.
	register() {
		console.log(this.formData);
		this.config.postHttp('auth/create_admin_account', this.formData).then((data: any) => {
			console.log(data.data)
		 })
	}
	
}



