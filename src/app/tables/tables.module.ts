import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TablesRoutes } from './tables.routing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { FullscreenTableComponent}  from './table-fullscreen/table-fullscreen.component';
import { EditingTableComponent}  from './table-editing/table-editing.component';
import { FilterTableComponent}  from './table-filter/table-filter.component';
import { PagingTableComponent}  from './table-paging/table-paging.component';
import { SortingTableComponent}  from './table-sorting/table-sorting.component';
import { PinningTableComponent}  from './table-pinning/table-pinning.component';
import { SelectionTableComponent}  from './table-selection/table-selection.component';
import { ResponsiveTableComponent}  from './table-responsive/table-responsive.component';
import { CustomersTableComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/subcategories.component'
import { ProvidersTableComponent} from './providers/providers.component'
import { ArticlesSliderComponent } from  './articles slider/articlesslider.component'
import { ArticlesComponent} from './articles/articles.component'
import {TermsAndConditionsComponent} from './terms-and-conditions/termsandconditionscomponent'
import {CompaniesTableComponent} from './companies/companies.component'
import { WhatPeopleSayComponent } from './what-people-say/whatpeoplesaycomponent'
import { PDFComponent } from './pdf/pdfcomponent'
import { FeaturedProvidersTableComponent } from './featured-providers/featured-providers.component';
import {JobsTableComponent} from './jobs/jobs.component'
import {PartnersComponent} from './partners/partners.component'
import { CountriesComponent } from './countries/countries-component'
import { CitiesComponent } from './cities/cities-component';
import { RegionsComponent } from './regions/regions-component'
@NgModule({
	declarations: [
		FullscreenTableComponent,
		EditingTableComponent,
		FilterTableComponent,
		PagingTableComponent,
		SortingTableComponent,
		PinningTableComponent,
		SelectionTableComponent,
		ResponsiveTableComponent,
		CustomersTableComponent,
		CategoriesComponent,
		SubCategoriesComponent,
		ProvidersTableComponent,
		ArticlesSliderComponent,
		ArticlesComponent,
		TermsAndConditionsComponent,
		CompaniesTableComponent,
		WhatPeopleSayComponent,
		PDFComponent,
		FeaturedProvidersTableComponent,
		JobsTableComponent,
		PartnersComponent,
		CountriesComponent,
		CitiesComponent,
		RegionsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(TablesRoutes),
		NgxDatatableModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		FlexLayoutModule,
		TranslateModule
	]
})
export class TablesModule { }
