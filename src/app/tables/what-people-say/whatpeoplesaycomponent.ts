import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../service/core/core.service';
import { ConfigService } from 'providers/config/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'ms-whatpeoplesay-table',
	templateUrl:'./whatpeoplesay-component.html',
	styleUrls: ['./whatpeoplesay-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class WhatPeopleSayComponent implements OnInit {

	reviews : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("What People Say");
			},0);
		this.config.getHttp('whatPeopleSay/getWhatPeopleSay', '').then((data: any) => {
			this.reviews =  data.data;
		 })
						
	}
	addWhatPeopleSay(){
		this.router.navigate(['/forms/add-what-people-say']);
	}
	deleteWhatPeopleSay(id){
		this.config.postHttp('whatPeopleSay/deleteWhatPeopleSay', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Review Deleted Successfully!');
				window.location.reload();	
			}
		})
	}
	editWhatPeopleSay(id){
		this.router.navigate(['/forms/edit-what-people-say', id]);
	}

}



