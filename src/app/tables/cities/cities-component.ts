import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../service/core/core.service';
import { ConfigService } from 'providers/config/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'ms-cities-table',
	templateUrl:'./cities-component.html',
	styleUrls: ['./cities-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class CitiesComponent implements OnInit {

	reviews : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("Cities");
			},0);
		this.config.getHttp('city/getAll', '').then((data: any) => {
			this.reviews =  data.data;
		 })
						
	}
	addCity(){
		this.router.navigate(['/forms/add-city']);
	}
	deleteCity(id){
		this.config.postHttp('city/deleteCity', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('City Deleted Successfully!');
				window.location.reload();	
			}
		})
	}
	editCity(id){
		this.router.navigate(['/forms/edit-city', id]);
	}

}



