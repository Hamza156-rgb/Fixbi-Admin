import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../service/core/core.service';
import { ConfigService } from 'providers/config/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'ms-regions-table',
	templateUrl:'./regions-component.html',
	styleUrls: ['./regions-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class RegionsComponent implements OnInit {

	reviews : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("Regions");
			},0);
		this.config.getHttp('region/getAll', '').then((data: any) => {
			this.reviews =  data.data;
			console.log(this.reviews);
		 })
						
	}
	addRegion(){
		this.router.navigate(['/forms/add-region']);
	}
	deleteRegion(id){
		this.config.postHttp('region/deleteRegion', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Region Deleted Successfully!');
				window.location.reload();	
			}
		})
	}
	editRegion(id){
		this.router.navigate(['/forms/edit-region', id]);
	}

}



