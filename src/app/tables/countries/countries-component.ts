import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../service/core/core.service';
import { ConfigService } from 'providers/config/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'ms-countries-table',
	templateUrl:'./countries-component.html',
	styleUrls: ['./countries-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class CountriesComponent implements OnInit {

	reviews : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("Countries");
			},0);
		this.config.getHttp('country/getAllCountries', '').then((data: any) => {
			this.reviews =  data.data;
		 })
						
	}
	addCountry(){
		this.router.navigate(['/forms/add-country']);
	}
	deleteCountry(id){
		this.config.postHttp('country/deleteCountry', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Country Deleted Successfully!');
				window.location.reload();
			}
		})
	}
	editCountry(id){
		this.router.navigate(['/forms/edit-country', id]);
	}

}



