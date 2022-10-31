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
	templateUrl: './addsubcategory-component.html',
	styleUrls: ['./addsubcategory-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class AddSubCategoryComponent implements OnInit {

	public form: FormGroup;
	upload:any ='';
	filedata: any;
	categories:any;
	fileEvent(e: any) {
	  this.filedata = e.target.files[0];
	}
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Add Sub New Category");
		}, 0);

		this.form = this.fb.group({
			name: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])],
			category: [null, Validators.required],
			category_icon: ['']
		});
		this.config.getHttp('category/getAllCategories','').then((data: any) => {
			this.categories = data.data;
			});
	}

	onSubmit() {
		
		if (this.form.status == 'VALID') {
			var myFormData = new FormData();
			myFormData.append('sub_category_icon', this.filedata);
			myFormData.append('name', this.form.value.name);
			myFormData.append('category_id',this.form.value.category)
			this.config.postHttp('sub_categories/createSubCategory', myFormData).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Sub Category Created Successfully!');
					this.router.navigate(['tables/sub-categories']);
				}
			})

		}
	}
}



