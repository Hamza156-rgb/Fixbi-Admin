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
const is_active = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));
const category = new FormControl('', Validators.required);

@Component({
	selector: 'ms-addcustomer',
	templateUrl: './addprovider-component.html',
	styleUrls: ['./addprovider-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class AddProviderComponent implements OnInit {

	public form: FormGroup;
	//professional Arrays//
	pcategories = [];
	psub_categories = [];
	pcountries = [];
	pcity = [];
	pregion = [];
	//professional End

	//professional config//
	pconfig1 = {
		displayKey: "name",
		search: true,
		placeholder: 'Category',
		height: '300px',
	};

	pconfig2 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'Sub Category',
		height: '300px',
	};
	pconfig3 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'Country',
		height: '300px',
	};
	pconfig4 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'City',
		height: '300px',
	};


	pconfig5 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'Region',
		height: '300px',
	};

	//compan options//
	categories = [];
	sub_categories = [];
	countries = [];
	city = [];
	region = [];
	//company End options //

	get g() { return this.form.controls; }

	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Add New Provider");
		}, 0);

		this.form = this.fb.group({
			first_name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
			last_name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
			email: [null, Validators.compose([Validators.required, CustomValidators.email])],
			phone: [null, Validators.compose([Validators.required])],
			category: ['', Validators.required],
			sub_category: ['', Validators.required],
			country: ['', Validators.required],
			city: ['', Validators.required],
			region: ['', Validators.required],
			jobs: ['', Validators.required],
			tax_number: '',
			password: password,
			confirmPassword: confirmPassword,
			user_type: '3',
			provider: 'admin',
		});
		this.getCategory();
		this.getCountry();
		this.getCity();
		this.getRegion();
	}

	onSubmit() {
		if (this.form.status == 'VALID') {
			this.config.postHttp('auth/registerProfessional', this.form.value).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Provider Created Successfully!');
					this.router.navigate(['tables/providers']);
				}
			})
		}
	}

	//Professional

	PsearchChange(event: any) {
		this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
			this.psub_categories = data.data;
		})
	}
	psearchChange1(event: any) {
	}
	psearchCountry(event: any) {
		this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
			this.pcity = data.data;
		})
	}
	psearchcity(event: any) {
		var dummy: any = this.form.value.city;
		if (dummy.length == 0) {
			this.pregion = [];
			return;
		}
		var a = []
		for (var i = 0; i < dummy.length; i++) {
			a.push(dummy[i].id);
		}
		this.config.getHttp('region/getRegionsByCity?city_id=' + a.toString(), '').then((data: any) => {
			this.pregion = data.data;
		})
	}

	getCategory() {
		this.config.getHttp('category/getAllCategories', '').then((data: any) => {
			this.categories = data.data;
			this.pcategories = data.data;
		})
	}

	getCountry() {
		this.config.getHttp('country/getAllCountries', '').then((data: any) => {
			this.countries = data.data;
			this.pcountries = data.data;
		})
	}
	getCity() {
		this.config.getHttp('city/getAll', '').then((data: any) => {
		})
	}

	getRegion() {
		this.config.getHttp('region/getAll', '').then((data: any) => {
		})
	}
}



