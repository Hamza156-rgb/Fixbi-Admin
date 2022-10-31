import { Component, ViewChild, OnInit ,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../service/core/core.service';
import { ConfigService } from 'providers/config/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'ms-customers-table',
	templateUrl:'./customers-component.html',
	styleUrls: ['./customers-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class CustomersTableComponent implements OnInit {

	CustomersTable : any;
	
	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,
					
					) {  }
					

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("Customers");
			},0);
		this.config.getHttp('auth/getAllCustomers', '').then((data: any) => {
							this.CustomersTable = data.user;
							for (let i = 0; i < this.CustomersTable.length; i++) {
								if (this.CustomersTable[i].profile_picture) {
									this.CustomersTable[i].profile_picture = this.config.imgUrl + this.CustomersTable[i].profile_picture;
								}
							}
						 })
	}
	
	addNewCustomer(){
		this.router.navigate(['/forms/add-customer']);
	}
	deleteCustomer(id){
		this.config.postHttp('auth/deleteCustomer', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Customer Deleted Successfully!');
				window.location.reload();
				
			}
		})
	}
	editCustomer(customer){
		this.router.navigate(['/forms/edit-customer'], {queryParams: customer});
	}

	changeStatus(id, status){
		let change;
		if(status == 1){
			change = '0'
		}
		else if (status == 0){
			change = '1'
		}
		this.config.postHttp('auth/changeStatus?id=+'+id+'&is_active='+change,'').then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success(data.data);
				window.location.reload();	
			}
		})
	}
}



