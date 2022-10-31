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
	templateUrl: './add-slider-image-component.html',
	styleUrls: ['./add-slider-image-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class AddArticlesSliderComponent implements OnInit {

	public form: FormGroup;
	upload:any ='';
	filedata: any;
	fileEvent(e: any) {
	  this.filedata = e.target.files[0];
	}
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Add New Article Slider");
		}, 0);

		this.form = this.fb.group({
			image_text: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(200)])],
			image: ['']
		});
	}

	onSubmit() {
		
		if (this.form.status == 'VALID') {
			var myFormData = new FormData();
			myFormData.append('image', this.filedata);
			myFormData.append('image_text', this.form.value.image_text);
			this.config.postHttp('article/createArticlePageSlider ', myFormData).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Article Slider Created Successfully!');
					this.router.navigate(['tables/articles-slider']);
				}
			})

		}
	}
}



