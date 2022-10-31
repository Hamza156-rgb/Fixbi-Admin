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
	selector: 'ms-editwhatpeoplesay',
	templateUrl: './edit-what-people-say-component.html',
	styleUrls: ['./edit-what-people-say-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class EditWhatPeopleSayComponent implements OnInit {

	public form: FormGroup;
	upload:any ='';
	filedata: any;
	image: any;
	oldImage: any;
	id: any;
	fileEvent(e: any) {
	  this.filedata = e.target.files[0];
	}
	constructor(private fb: FormBuilder, private pageTitleService: PageTitleService, private translate: TranslateService, public config: ConfigService, private toastr: ToastrService, private router: Router,private route: ActivatedRoute) { }

	ngOnInit() {
		setTimeout(() => {
			this.pageTitleService.setTitle("Edit Review");
		}, 0);

		this.route.queryParams
			.subscribe(params => {
				this.id = this.route.snapshot.params['id'];
				this.form = this.fb.group({
					name: params.name,
					description:params.review,

				})
				this.oldImage = params.category_icon;
				this.image = params.category_icon;
			}
			);
		let param = new HttpParams().set('id', this.id)
		this.config.getHttp('whatPeopleSay/getWhatPeopleSayById', { params: param }).then((data: any) => {
			this.oldImage = data.data[0].image;
			this.image = this.config.imgUrl + data.data[0].image;
			this.form = this.fb.group({
				description:data.data[0].review
			})
			
		})
	}

	onSubmit() {
		
		if (this.form.status == 'VALID') {
			var myFormData = new FormData();
			myFormData.append('id', this.id);
			myFormData.append('review', this.form.value.description);
			this.config.postHttp('whatPeopleSay/updateWhatPeopleSay', myFormData).then((data: any) => {
				if (data.success == 0) {
					this.toastr.error(data.message);
					return;
				} 
				else {
					this.toastr.success('Review Updated Successfully!');
					this.router.navigate(['tables/what-people-say']);
				}
			})

		}
	}
}



