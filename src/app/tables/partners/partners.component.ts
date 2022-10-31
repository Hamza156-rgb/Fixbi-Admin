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
	templateUrl:'./partners-component.html',
	styleUrls: ['./partners-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class PartnersComponent implements OnInit {

	slider : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("Partners");
			},0);
		this.config.getHttp('partner/getAllPartners', '').then((data: any) => {
			console.log(data.data)
			this.slider = data.data;
			for(var i=0; i<this.slider.length; i++){
				this.slider[i].image = this.config.imgUrl + this.slider[i].image;
			}
		 })
						
	}
	addNewPartner(){
		this.router.navigate(['/forms/add-partner']);
	}
	deletePartner(id){
		this.config.postHttp('partner/deletePartners', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Partner Deleted Successfully!');
				window.location.reload();
			}
		})
	}
	editPartner(id){
		this.router.navigate(['/forms/edit-partner', id]);
	}

}



