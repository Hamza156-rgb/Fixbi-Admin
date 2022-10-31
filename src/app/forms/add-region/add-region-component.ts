import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'providers/config/config.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
	selector: 'ms-addregion',
	templateUrl: './add-region-component.html',
	styleUrls: ['./add-region-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class AddRegionComponent implements OnInit {

	public form: FormGroup;
	upload:any ='';
	filedata: any;
	pcountries = [];
	pregion = [];
	pconfig3 = {
		displayKey: "name", // if objects array passed which key to be displayed defaults to description
		search: true,
		placeholder: 'City',
		height: '300px',
	};
	get g() { return this.form.controls; }
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Add New Region");
		}, 0);
		this.getCountry();
		this.form = this.fb.group({
			name: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
			city: ['', Validators.required],
		});
	}

	onSubmit() {
		
		if (this.form.status == 'VALID') {
			console.log(this.form.value);
			this.config.postHttp('region/createRegion',this.form.value).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				} 
				else {
					this.toastr.success('Region Created Successfully!');
					this.router.navigate(['tables/regions']);
				}
			})

		}
	}

	getCountry() {
		this.config.getHttp('city/getAll', '').then((data: any) => {

			this.pcountries = data.data;
			console.log(this.pcountries)
		})
	}
}



