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
	selector: 'ms-addcategory',
	templateUrl: './add-partner-component.html',
	styleUrls: ['./add-partner-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class AddPartnerComponent implements OnInit {

	public form: FormGroup;
	upload:any ='';
	filedata: any;
	fileEvent(e: any) {
	  this.filedata = e.target.files[0];
	}
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Add New Partner");
		}, 0);

		this.form = this.fb.group({
			title: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200)])],
			image: ['']
		});
	}

	onSubmit() {
		if (this.form.status == 'VALID') {
			var myFormData = new FormData();
			myFormData.append('image', this.filedata);
			myFormData.append('title', this.form.value.title);
			this.config.postHttp('partner/createPartners', myFormData).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				} 
				else {
					this.toastr.success('Partner Created Successfully!');
					this.router.navigate(['tables/partners']);
				}
			})
		}
	}
}



