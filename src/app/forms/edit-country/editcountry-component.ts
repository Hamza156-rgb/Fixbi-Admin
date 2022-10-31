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
	selector: 'ms-editcountry',
	templateUrl: './editcountry-component.html',
	styleUrls: ['./editcountry-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EditCountryComponent implements OnInit {

	public form: FormGroup;
	filedata: any;
	article: any;
	image: any;
	oldImage: any;
	id: any;
	fileEvent(e: any) {
		this.filedata = e.target.files[0];
	}
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Edit Country");
		}, 0);
		this.route.queryParams
			.subscribe(params => {
				this.id = this.route.snapshot.params['id'];
				this.form = this.fb.group({
					name: params.name,
				})
			}
			);
		let param = new HttpParams().set('id', this.id)
		this.config.getHttp('country/getCountryId', { params: param }).then((data: any) => {
			this.form = this.fb.group({
				name: data.data.name,
			})
			
		})
	}

	onSubmit() {

		if (this.form.status == 'VALID') {
			var myFormData = new FormData();
			myFormData.append('name', this.form.value.name);
			myFormData.append('id', this.id);
			this.config.postHttp('country/updateCountry', myFormData).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Country Updated Successfully!');
					this.router.navigate(['tables/countries']);
				}
			})

		}
	}
}



