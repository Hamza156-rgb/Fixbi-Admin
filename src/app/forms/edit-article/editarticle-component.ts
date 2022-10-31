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
	selector: 'ms-addcategory',
	templateUrl: './editarticle-component.html',
	styleUrls: ['./editarticle-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EditArticleComponent implements OnInit {

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
			this.pageTitleService.setTitle("Edit Article");
		}, 0);
		this.route.queryParams
			.subscribe(params => {
				this.id = this.route.snapshot.params['id'];
				this.form = this.fb.group({
					name: params.name,
					description:params.description,

				})
				this.oldImage = params.category_icon;
				this.image = params.category_icon;
			}
			);
		let param = new HttpParams().set('id', this.id)
		this.config.getHttp('article/getArticleById', { params: param }).then((data: any) => {
			this.oldImage = data.data[0].image;
			this.image = this.config.imgUrl + data.data[0].image;
			this.form = this.fb.group({
				name: data.data[0].title,
				description:data.data[0].description
			})
			
		})
	}

	onSubmit() {

		if (this.form.status == 'VALID') {
			var myFormData = new FormData();
			myFormData.append('image', this.filedata);
			myFormData.append('title', this.form.value.name);
			myFormData.append('description', this.form.value.description);
			myFormData.append('oldImage', this.oldImage);
			myFormData.append('id', this.id);
			this.config.postHttp('article/updateArticle', myFormData).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				}
				else {
					this.toastr.success('Article Updated Successfully!');
					this.router.navigate(['tables/articles']);
				}
			})

		}
	}
}



