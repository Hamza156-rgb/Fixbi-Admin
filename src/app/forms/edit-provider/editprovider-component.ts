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
	selector: 'ms-editprovider',
	templateUrl: './editprovider-component.html',
	styleUrls: ['./editprovider-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EditProviderComponent implements OnInit {
	
	public form: FormGroup;
	id: '';
	tempCat_id = 0;
  	tempSubCat = [];
	tempCountry_id = 0;
	tempCity = [];
	tempRegion = [];
	//professional Arrays//
	pcategories = [];
	psub_categories = [];
	pcountries = [];
	pcity = [];
	pregion = [];
	//professional End

	//professional config//
	config1 = {
		displayKey: "name",
		search: true,
		placeholder: 'Category',
	  };
	  config2 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'Sub Category',
	  };
	  config3 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'Country',
	  };
	
	  config4 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'City',
	  };
	
	
	  config5 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'Region',
	  };

	//compan options//
	categories = [];
	sub_categories = [];
	countries = [];
	city = [];
	region = [];
	//company End options //
	get g() { return this.form.controls; }

	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Edit Provider");
		}, 0);
		this.route.queryParams
			.subscribe(params => {
				this.id = this.route.snapshot.params['id'];
			});
		setTimeout(() => {
			this.getUser(this.id);
		}, 300);
		this.getCategory();
		this.getCountry();
		this.getCity();
		this.getRegion();
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
	loadSubCat(id: any) {
		this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + id, '').then((data: any) => {
			this.sub_categories = data.data;
		})
	}
	loadCity(id: any) {
		this.config.getHttp('city/getCitiesByCountry?country_id=' + id, '').then((data: any) => {
			this.city = data.data;
		})
	}
	loadRegion() {
		var dummy: any = this.form.value.city;
		if (dummy.length == 0) {
			this.region = [];
			return;
		}
		var a = []
		for (var i = 0; i < dummy.length; i++) {
			a.push(dummy[i].id);
		}
		this.config.getHttp('region/getRegionsByCity?city_id=' + a.toString(), '').then((data: any) => {
			this.region = data.data;
		})
	}
	searchChange(event: any) {
		if (event.value.id == this.tempCat_id) {
		  this.form.value.sub_category = this.tempSubCat;
		} else {
		  this.form.value.sub_category = []
		}
	
		this.config.getHttp('sub_categories/getAllSubCategories?cat_id=' + event.value.id, '').then((data: any) => {
		  this.sub_categories = data.data;
		})
	  }
	  searchCountry(event: any) {
		if (event.value.id == this.tempCountry_id) {
		  this.form.value.city = this.tempCity;
		  this.loadRegion();
		  this.form.value.region = this.tempRegion;
		} else {
		  this.form.value.city = [];
		  this.form.value.region = [];
		  this.region = []
		}
		this.config.getHttp('city/getCitiesByCountry?country_id=' + event.value.id, '').then((data: any) => {
		  this.city = data.data;
		})
	  }
	  searchcity(event: any) {
		var dummy: any = this.form.value.city;
		if (dummy.length == 0) {
		  this.region = [];
		  return;
		}
		var a = []
		for (var i = 0; i < dummy.length; i++) {
		  a.push(dummy[i].id);
		}
		this.config.getHttp('region/getRegionsByCity?city_id=' + a.toString(), '').then((data: any) => {
		  this.region = data.data;
		})
	  }
	getUser(id: any) {
		this.config.getHttp('auth/getSingleProfessionalById?id=' + id, { id: id }).then((data: any) => {
			this.form = this.fb.group({
				id : this.id,
				first_name: [data.data[0].user_data[0].first_name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
				last_name: [data.data[0].user_data[0].last_name, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
				email: [data.data[0].user_data[0].email, Validators.compose([Validators.required, CustomValidators.email])],
				phone: [data.data[0].user_data[0].phone, Validators.compose([Validators.required])],
				category: [data.data[0].category, Validators.required],
				sub_category: [data.data[0].sub_category, Validators.required],
				country: [data.data[0].country, Validators.required],
				city: [data.data[0].city, Validators.required],
				region: [ data.data[0].region, Validators.required],
				jobs: [data.data[0].user_data[0].jobs],
				tax_number: data.data[0].user_data[0].tax_number,
				is_active: data.data[0].user_data[0].is_active,
				date:  [ data.data[0].user_data[0].date, Validators.required],
				profile_picture : [data.data[0].user_data[0].profile_picture],
				portfolio: [data.data[0].user_data[0].portfolio],
				opening_time:[data.data[0].user_data[0].opening_time],
				closing_time :[data.data[0].user_data[0].closing_time],
				long: [data.data[0].user_data[0].long],
				lat: [data.data[0].user_data[0].lat]
			});
			this.loadSubCat(data.data[0].category[0].id);
			this.tempCat_id = data.data[0].category[0].id;
			this.tempSubCat = this.form.value.sub_category;
			this.loadCity(data.data[0].country[0].id);
			this.tempCountry_id = data.data[0].country[0].id;
			this.tempCity = this.form.value.city;
      		this.loadRegion();
			this.tempRegion = this.form.value.region;
		})
	}

	onSubmit() {
	var myFormData = new FormData();
	myFormData.append('first_name', this.form.value.first_name);
    myFormData.append('last_name', this.form.value.last_name)
    myFormData.append('phone', this.form.value.phone)
    myFormData.append('email', this.form.value.email)
    myFormData.append('category', JSON.stringify(this.form.value.category))
    myFormData.append('sub_category', JSON.stringify(this.form.value.sub_category))
    myFormData.append('city', JSON.stringify(this.form.value.city))
    myFormData.append('region', JSON.stringify(this.form.value.region))
    myFormData.append('description', this.form.value.description)
    myFormData.append('id', this.id)
    myFormData.append('company_name', this.form.value.company_name)
    myFormData.append('country', JSON.stringify(this.form.value.country))
    myFormData.append('portfolio', this.form.value.portfolio)
    myFormData.append('openingTime', this.form.value.openingTime)
    myFormData.append('closingTime', this.form.value.closingTime)
    myFormData.append('profile_pic', this.form.value.profile_pic);
    myFormData.append('longitude', this.form.value.long);
    myFormData.append('latitude', this.form.value.lat);
	myFormData.append('is_active', this.form.value.is_active);
	this.config.postHttp('auth/updateProfessional', myFormData).then((data: any) => {
	if (data.success == 0) {
		this.toastr.error(data.message);
		return;
	}
	else {
		this.toastr.success('Provider Updated Successfully!');
		this.router.navigate(['tables/providers']);
	}
	});
	}
}



