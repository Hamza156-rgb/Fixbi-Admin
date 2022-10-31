import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'providers/config/config.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
	selector: 'ms-addcustomer',
	templateUrl: './addcustomer-component.html',
	styleUrls: ['./addcustomer-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class AddCustomerComponent implements OnInit {

	public form: FormGroup;

	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Add New Customer");
		}, 0);

		this.form = this.fb.group({
			first_name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
			last_name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
			email: [null, Validators.compose([Validators.required, CustomValidators.email])],
			// range: [null, Validators.compose([Validators.required, CustomValidators.range([5, 9])])],
			// url: [null, Validators.compose([Validators.required, CustomValidators.url])],
			// date: [null, Validators.compose([Validators.required, CustomValidators.date])],
			// creditCard: [null, Validators.compose([Validators.required, CustomValidators.creditCard])],
			phone: [null, Validators.compose([Validators.required])],
			// gender: ['male', Validators.required],
			password: password,
			confirmPassword: confirmPassword,
			user_type: '2'
		});
	}

	onSubmit() {
		if (this.form.status == 'VALID') {
			this.config.postHttp('auth/registerCustomer', this.form.value).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Customer Created Successfully!');
					this.router.navigate(['tables/customers']);
				}
			})

		}
	}
}



