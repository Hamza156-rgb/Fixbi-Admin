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
	templateUrl: './jobs-component.html',
	styleUrls: ['./jobs-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})

export class JobsTableComponent implements OnInit {

	jobsTable: any;
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
			this.pageTitleService.setTitle("Jobs");
		}, 0);
		this.config.getHttp('auth/jobs/getAllJobs', '').then((data: any) => {
			this.jobsTable = data.data;
			console.log(this.jobsTable)
			for (let i = 0; i < this.jobsTable.length; i++) {
				if (this.jobsTable[i].categories.category_icon) {
					this.jobsTable[i].categories.category_icon = this.config.imgUrl + this.jobsTable[i].categories.category_icon;
				}
			}
		})
	}
}



