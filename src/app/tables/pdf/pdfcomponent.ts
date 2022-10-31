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
	templateUrl:'./pdf-component.html',
	styleUrls: ['./pdf-component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [ fadeInAnimation ]
})

export class PDFComponent implements OnInit {

	pdf : any;

	constructor(private pageTitleService: PageTitleService,
					private translate : TranslateService,
					public service : CoreService,
					public config: ConfigService, 
					private router :Router,
					private toastr: ToastrService,) {  }

	ngOnInit() {

		setTimeout(() =>{
			this.pageTitleService.setTitle("PDF FIle");
			},0);
		this.config.getHttp('pdf/getAllPdfFiles', '').then((data: any) => {
			this.pdf = data.data;
			for(var i=0; i<this.pdf.length; i++){
				this.pdf[i].file_path = this.config.imgUrl + this.pdf[i].file_path;
			}
		 })
						
	}
	addPdfFile(){
		this.router.navigate(['/forms/add-pdf']);
	}
	deletePdfFile(id){
		this.config.postHttp('pdf/deletePdfFile', { id: id }).then((data: any) => {
			if (data.success == 0) {
				this.toastr.error(data.message);
				return;
			}
			else {
				this.toastr.success('PDF File Deleted Successfully!');
				window.location.reload();
				
			}
		})
	}
	viewPdf(pdf){
		window.open(pdf, '_blank');	
	}

}



