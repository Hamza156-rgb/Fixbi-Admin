import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../service/core/core.service';
import { ConfigService } from 'providers/config/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'ms-categories-table',
	templateUrl:'./categories-component.html',
	styleUrls: ['./categories-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class CategoriesComponent implements OnInit {

	categories : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("Categories");
			},0);
		this.config.getHttp('category/getAllCategories', '').then((data: any) => {
			this.categories = data.data;
			for(var i=0; i<this.categories.length; i++){
				if (this.categories[i].category_icon) {
				this.categories[i].category_icon = this.config.imgUrl + this.categories[i].category_icon;
				}
			}
		 })
						
	}
	addNewCategory(){
		this.router.navigate(['/forms/add-category']);
	}
	deleteCategory(id){
		this.config.postHttp('category/deleteCategory', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Category Deleted Successfully!');
				window.location.reload();
				
			}
		})
	}
	editCategory(id){
		this.router.navigate(['/forms/edit-category', id]);
	}

}



