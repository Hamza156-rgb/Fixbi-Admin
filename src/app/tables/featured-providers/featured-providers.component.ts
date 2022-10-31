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
	templateUrl: './featured-providers-component.html',
	styleUrls: ['./featured-providers-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class FeaturedProvidersTableComponent implements OnInit {

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
			this.pageTitleService.setTitle("Featured Providers");
		}, 0);
		this.config.getHttp('auth/getFeaturedProviders', '').then((data: any) => {
			this.providersTable = data.data;
			for (let i = 0; i < this.providersTable.length; i++) {
				if (this.providersTable[i].profile_picture) {
					this.providersTable[i].profile_picture = this.config.imgUrl + this.providersTable[i].profile_picture;
				}
			}
		})
	}

	deleteFeaturedProvider(id){
		this.config.postHttp('auth/deleteFeaturedProvider?user_id='+id,'').then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('Featured Provider Deleted Successfully!');
				window.location.reload();
			}
		})
	}
}



