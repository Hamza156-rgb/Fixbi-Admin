import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
	selector: 'ms-addcategory',
	templateUrl: './editsubcategory-component.html',
	styleUrls: ['./editsubcategory-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EditSubCategoryComponent implements OnInit {

	public form: FormGroup;
	upload: any = '';
	filedata: any;
	categories: any;
	id: any;
	oldImage: any;
	image: any;
	fileEvent(e: any) {
		this.filedata = e.target.files[0];
	}
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Edit Sub Category");
		}, 0);

		this.route.queryParams
			.subscribe(params => {
				this.id = this.route.snapshot.params['id'];
				this.form = this.fb.group({
					name: params.name,
					category: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
					cate_id: [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],


				})
				this.oldImage = params.category_icon;
				this.image = params.category_icon;
			}
			);
		this.config.getHttp('category/getAllCategories', '').then((data: any) => {
			this.categories = data.data;
		});
		let param = new HttpParams().set('id', this.id)
		this.config.getHttp('sub_categories/getSubCategoryById', { params: param }).then((data: any) => {
			this.oldImage = data.data[0].sub_category_icon;
			this.id = data.data[0].id;
			this.image = this.config.imgUrl + data.data[0].sub_category_icon;
			this.form = this.fb.group({
				name: data.data[0].name,
				category: [data.data[0].category_id,  Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
				cate_name: data.data[0].cate_name,
				cate_id : [data.data[0].category_id,  Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
			})
		})
	}

	onSubmit() {

		if (this.form.status == 'VALID') {
			var myFormData = new FormData();
			myFormData.append('id', this.id);
			myFormData.append('sub_category_icon', this.filedata);
			myFormData.append('name', this.form.value.name);
			myFormData.append('category_id', this.form.value.category);
			myFormData.append('oldImage', this.oldImage);
			this.config.postHttp('sub_categories/updateCategory', myFormData).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Sub Category Updated Successfully!');
					this.router.navigate(['tables/sub-categories']);
				}
			})

		}
	}
}



