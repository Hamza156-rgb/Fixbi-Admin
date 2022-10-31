import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'providers/config/config.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


const password = new FormControl('', Validators.required);
const is_active = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
	selector: 'ms-addcustomer',
	templateUrl: './edit-customer-component.html',
	styleUrls: ['./edit-customer-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EditCustomerComponent implements OnInit {

	public form: FormGroup;
	customer: any;
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }
	
	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Edit Customer");
		}, 0);
		this.route.queryParams
			.subscribe(params => {
				this.customer = params;
				this.form = this.fb.group({
					first_name: params.first_name,
					last_name: params.last_name,
					email: params.email,
					phone: params.phone,
					is_active: params.is_active,
					password: params.password,
					user_type: params.user_type
				})
			}
			);
		this.form = this.fb.group({
			first_name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
			last_name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
			email: [null, Validators.compose([Validators.required, CustomValidators.email])],
			phone: [null, Validators.compose([Validators.required])],
			is_active: is_active,
			password: password,
			confirmPassword: confirmPassword,
			user_type: '2',
			id:this.customer.user_id
		});
	}

	onSubmit() {
			this.config.postHttp('auth/updateCustomer', this.form.value).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Customer Updated Successfully!');
					this.router.navigate(['tables/customers']);
				}
			})
	}
}



