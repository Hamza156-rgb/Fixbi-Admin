import { Routes } from '@angular/router';

import { FullscreenTableComponent}  from './table-fullscreen/table-fullscreen.component';
import { EditingTableComponent}  from './table-editing/table-editing.component';
import { FilterTableComponent}  from './table-filter/table-filter.component';
import { PagingTableComponent}  from './table-paging/table-paging.component';
import { SortingTableComponent}  from './table-sorting/table-sorting.component';
import { PinningTableComponent}  from './table-pinning/table-pinning.component';
import { SelectionTableComponent}  from './table-selection/table-selection.component';
import { ResponsiveTableComponent}  from './table-responsive/table-responsive.component';
import { CustomersTableComponent}   from './customers/customers.component';
import {CategoriesComponent} from './categories/categories.component'
import { SubCategoriesComponent } from './sub-categories/subcategories.component';
import { ProvidersTableComponent } from './providers/providers.component';
import { ArticlesSliderComponent } from './articles slider/articlesslider.component';
import { ArticlesComponent } from './articles/articles.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/termsandconditionscomponent';
import { CompaniesTableComponent } from './companies/companies.component';
import { WhatPeopleSayComponent } from './what-people-say/whatpeoplesaycomponent';
import { PDFComponent } from './pdf/pdfcomponent';
import { FeaturedProvidersTableComponent } from './featured-providers/featured-providers.component';
import {JobsTableComponent} from './jobs/jobs.component'
import { PartnersComponent } from './partners/partners.component';
import { CountriesComponent } from './countries/countries-component';
import { CitiesComponent } from './cities/cities-component';
import { RegionsComponent } from './regions/regions-component'


export const TablesRoutes: Routes = [
   {
      path: '',
      redirectTo: 'customers',
      pathMatch: 'full'
   },

   {
      path: '',
      children: [
         {
            path: 'what-people-say',
            component: WhatPeopleSayComponent
         },
         {
            path: 'terms-conditions',
            component: TermsAndConditionsComponent
         },
         {
            path: 'fullscreen',
            component: FullscreenTableComponent
         },
         {
            path: 'editing',
            component: EditingTableComponent
         },
         {
            path: 'filter',
            component: FilterTableComponent
         },
         {
            path: 'paging',
            component: PagingTableComponent
         },
         {
            path: 'sorting',
            component: SortingTableComponent
         },
         {
            path: 'pinning',
            component: PinningTableComponent
         },
         {
            path: 'selection',
            component: SelectionTableComponent
         },
         {
            path: 'responsive',
            component: ResponsiveTableComponent
         },
         {
            path: 'customers',
            component: CustomersTableComponent
         },
         {
            path: 'categories',
            component: CategoriesComponent
         },
         {
            path: 'sub-categories',
            component: SubCategoriesComponent
         },
         {
            path: 'providers',
            component: ProvidersTableComponent
         },
         {
            path: 'articles-slider',
            component: ArticlesSliderComponent
         },
         {
            path: 'articles',
            component: ArticlesComponent
         },
         {
            path: 'companies',
            component: CompaniesTableComponent
         },
         {
            path: 'pdf',
            component: PDFComponent
         },
         {
            path: 'featured-providers',
            component: FeaturedProvidersTableComponent
         },
         {
            path: 'jobs',
            component: JobsTableComponent
         },
         {
            path: 'partners',
            component: PartnersComponent
         },
         {
            path: 'countries',
            component: CountriesComponent
         },
         {
            path: 'cities',
            component: CitiesComponent
         },
         {
            path: 'regions',
            component: RegionsComponent
         },
      ]
   }
];
