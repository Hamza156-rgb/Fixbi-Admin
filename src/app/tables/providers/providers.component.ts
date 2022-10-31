import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from '../../service/core/core.service';
import { ConfigService } from 'providers/config/config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'ms-providers-table',
	templateUrl: './providers-component.html',
	styleUrls: ['./providers-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class ProvidersTableComponent implements OnInit {

	providersTable: any;
	showbtn = true;
	constructor(private pageTitleService: PageTitleService,
		private translate: TranslateService,
		public service: CoreService,
		public config: ConfigService,
		private router: Router,
		private toastr: ToastrService,

	) { }


	ngOnInit() {

		setTimeout(() => {
			this.pageTitleService.setTitle("Providers");
		}, 0);
		this.config.getHttp('auth/getAllProfessionalsAdmin?user_type=3', '').then((data: any) => {
			this.providersTable = data.data;
			for (let i = 0; i < this.providersTable.length; i++) {
				if (this.providersTable[i].profile_picture) {
					this.providersTable[i].profile_picture = this.config.imgUrl + this.providersTable[i].profile_picture;
				}
				if (this.providersTable[i].portfolio) {
					this.providersTable[i].portfolio = this.config.imgUrl + this.providersTable[i].portfolio;
				}
			}
		})
	}

	addNewProvider() {
		this.router.navigate(['/forms/add-provider']);
	}
	deleteProvider(id) {
		this.config.postHttp('auth/deleteProfessional', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Provider Deleted Successfully!');
				window.location.reload();

			}
		})
	}
	editProvider(id) {
		this.router.navigate(['/forms/edit-provider', id]);
	}

	viewPdf(pdf){
		window.open(pdf, '_blank');	
	}
	addFeaturedProvider(id){
		this.config.postHttp('auth/addFeaturedProvider?user_id='+id,'').then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success(data.data);
				this.router.navigate(['tables/featured-providers']);
			}
		})
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



