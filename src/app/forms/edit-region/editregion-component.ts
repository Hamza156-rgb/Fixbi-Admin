import { Component, ComponentFactoryResolver, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'providers/config/config.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';



@Component({
	selector: 'ms-editregion',
	templateUrl: './editregioncomponent.html',
	styleUrls: ['./editregion-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EditRegionComponent implements OnInit {

	public form: FormGroup;
	filedata: any;
	article: any;
	image: any;
	oldImage: any;
	id: any;
	countries = [];
	pcountries = [];
	pconfig3 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'City',
		height: '300px',
	};
	get g() { return this.form.controls; }
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Edit Region");
		}, 0);
		this.getCountry();
		this.route.queryParams
			.subscribe(params => {
				this.id = this.route.snapshot.params['id'];
				this.form = this.fb.group({
					name: params.name,
				})
			}
			);
		let param = new HttpParams().set('id', this.id)
		this.config.getHttp('region/getRegionById', { params: param }).then((data: any) => {
			console.log(data.data)
			this.form = this.fb.group({
				id: this.id,
				name: [data.data[0].data.name, Validators.required],
				city: [data.data[0].city, Validators.required],
			})
			
		})
	}

	onSubmit() {

		if (this.form.status == 'VALID') {
			console.log(this.form.value);
			this.config.postHttp('region/updateRegion',this.form.value).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Region Updated Successfully!');
					this.router.navigate(['tables/regions']);
				}
			})

		}
	}
	getCountry() {
		this.config.getHttp('city/getAll', '').then((data: any) => {
			this.countries = data.data;
			this.pcountries = data.data;
		})
	}
}



