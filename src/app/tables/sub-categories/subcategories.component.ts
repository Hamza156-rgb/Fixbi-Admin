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
	templateUrl:'./subcategories-component.html',
	styleUrls: ['./subcategories-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class SubCategoriesComponent implements OnInit {

	categories : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("Sub Categories");
			},0);
		this.config.getHttp('sub_categories/getAll', '').then((data: any) => {
			this.categories = data.data;
			for(var i=0; i<this.categories.length; i++){
				if (this.categories[i].sub_category_icon) {
				this.categories[i].sub_category_icon = this.config.imgUrl + this.categories[i].sub_category_icon;
				}
			}
		 })
						
	}
	addNewSubCategory(){
		this.router.navigate(['/forms/add-subcategory']);
	}
	deleteCategory(id){
		this.config.postHttp('sub_categories/deleteSubCategory', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Sub Category Deleted Successfully!');
				window.location.reload();
				
			}
		})
	}
	editCategory(id){
		this.router.navigate(['/forms/edit-sub-category', id]);
	}

}



