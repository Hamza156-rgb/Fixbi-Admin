import { Routes } from '@angular/router';

import { FormWizardComponent}  from './form-wizard/formwizard.component';
import { FormValidationComponent}  from './form-validation/formvalidation.component';
import { FormUploadComponent}  from './form-upload/formupload.component';
import { FormTreeComponent}  from './form-tree/formtree.component';
import {AddCustomerComponent} from './add-customer/addcustomer-component'
import { EditCustomerComponent } from './edit-customer/edit-customercomponent';
import { AddCategoryComponent } from './add-category/addcategory-component';
import { EditCategoryComponent } from './edit-category copy/editcategory-component';
import { AddSubCategoryComponent } from './add-subcategory/addsubcategory-component';
import { EditSubCategoryComponent } from './edit-subcategory/editsubcategory-component';
import { AddProviderComponent } from './add-provider/addprovider-component';
import { AddArticlesSliderComponent } from './add-artilesslider-image/add-slider-image-component';
import { AddArticleComponent } from './add-article/add-article-component';
import { EditArticleSliderComponent } from './edit-article-slider/editarticlesilder-component';
import { EditArticleComponent } from './edit-article/editarticle-component';
import { AddTermsConditionsComponent } from './add-terms-conditions/add-terms-conditons-component';
import { AddWhatPeopleSayComponent } from './add-what-people-say/add-what-people-say-component';
import { EditTermsConditionsComponent } from './edit-terms-conditions/edittermsconditions-component';
import { EditWhatPeopleSayComponent } from './edit-what-people-say/edit-what-people-say-component';
import { AddCompanyComponent } from './add-company/addcompany-component';
import { EditProviderComponent } from './edit-provider/editprovider-component' 
import { AddPDFComponent } from './add-pdf/add-pdf-component'
import { AddPartnerComponent } from './add-partner/add-partner-component'
import { EditPartnerComponent } from './edit-partner/editpartner-component'
import { AddCountryComponent } from './add-country/add-country-component';
import { EditCountryComponent } from './edit-country/editcountry-component';
import { AddCityComponent } from './add-city/add-city-component';
import { EditCityComponent } from './edit-city/editcity-component';
import { AddRegionComponent  } from './add-region/add-region-component'
import { EditRegionComponent } from './edit-region/editregion-component';

export const FormRoutes: Routes = [
   {
      path: '',
      redirectTo: 'form-wizard',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
            path: 'form-wizard',
            component: FormWizardComponent
         },
         {
            path: 'form-validation',
            component:  FormValidationComponent
         },
         {
            path: 'form-upload',
            component: FormUploadComponent
         },
         {
            path: 'form-tree',
            component:  FormTreeComponent
         },
         {
            path: 'add-customer',
            component:  AddCustomerComponent
         },
         {
            path: 'edit-customer',
            component:  EditCustomerComponent
         },
         {
            path: 'add-category',
            component:  AddCategoryComponent
         },
         {
            path: 'edit-category/:id',
            component:  EditCategoryComponent
         },
         {
            path: 'add-subcategory',
            component:  AddSubCategoryComponent
         },
         {
            path: 'edit-sub-category/:id',
            component:  EditSubCategoryComponent
         },
         {
            path: 'add-provider',
            component:  AddProviderComponent
         },
         {
            path: 'add-articles-slider',
            component:  AddArticlesSliderComponent
         },
         {
            path: 'edit-article-slider/:id',
            component:  EditArticleSliderComponent
         },
         {
            path: 'edit-article/:id',
            component:  EditArticleComponent
         },
         {
            path: 'add-article',
            component:  AddArticleComponent
         },
         {
            path: 'add-terms-conditions',
            component:  AddTermsConditionsComponent
         },
         {
            path: 'add-what-people-say',
            component:  AddWhatPeopleSayComponent
         },
         {
            path: 'edit-terms-conditions/:id',
            component:  EditTermsConditionsComponent
         },
         {
            path: 'edit-what-people-say/:id',
            component:  EditWhatPeopleSayComponent
         },
         {
            path: 'add-company',
            component:  AddCompanyComponent
         },
         {
            path: 'edit-provider/:id',
            component:  EditProviderComponent
         },
         {
            path: 'add-pdf',
            component:  AddPDFComponent
         },
         {
            path: 'add-partner',
            component:  AddPartnerComponent
         },
         {
            path: 'edit-partner/:id',
            component:  EditPartnerComponent
         },
         {
            path: 'add-country',
            component:  AddCountryComponent
         },
         {
            path: 'edit-country/:id',
            component:  EditCountryComponent
         },
         {
            path: 'add-city',
            component:  AddCityComponent
         },
         {
            path: 'edit-city/:id',
            component:  EditCityComponent
         },
         {
            path: 'add-region',
            component:  AddRegionComponent
         },
         {
            path: 'edit-region/:id',
            component:  EditRegionComponent
         },
      ]
   }
];
