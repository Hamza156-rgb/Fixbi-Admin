import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { CoreService } from '../../service/core/core.service';
import { MenuItems } from '../../core/menu/menu-items/menu-items';

@Component({
	selector: 'ms-side-bar',
	templateUrl: './side-bar.component.html',
	styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

	@Input() menuList : any;
  @Input() verticalMenuStatus : boolean;
   name:any ='';
	constructor( public translate: TranslateService, 
                private router: Router,
                public coreService: CoreService,
                public menuItems: MenuItems) { }

	ngOnInit() {
      this.name = localStorage.getItem("name");
	}

	//render to the crm page
	onClick(){
		// var first = location.pathname.split('/')[1];
      // if(first == 'horizontal'){
      //    this.router.navigate(['/horizontal/dashboard/crm']);
      // }else {
         this.router.navigate(['/tables/customers']);
      // }
	}

	/**
     * addMenuItem is used to add a new menu into menu list.
     */


}
