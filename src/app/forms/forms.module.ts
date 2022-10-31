import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TreeModule } from '@circlon/angular-tree-component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { FormWizardComponent}  from './form-wizard/formwizard.component';
import { FormValidationComponent}  from './form-validation/formvalidation.component';
import { FormUploadComponent}  from './form-upload/formupload.component';
import { FormTreeComponent}  from './form-tree/formtree.component';
import { FormRoutes } from './forms.routing';
import {AddCustomerComponent} from './add-customer/addcustomer-component'
import {EditCustomerComponent} from './edit-customer/edit-customercomponent'
import {AddCategoryComponent} from './add-category/addcategory-component'
import { EditCategoryComponent} from './edit-category copy/editcategory-component'
import { AddSubCategoryComponent } from './add-subcategory/addsubcategory-component'
import { EditSubCategoryComponent } from  './edit-subcategory/editsubcategory-component'
import  { AddProviderComponent} from './add-provider/addprovider-component'
import { AddArticlesSliderComponent } from './add-artilesslider-image/add-slider-image-component';
import {AddArticleComponent} from './add-article/add-article-component'
import {EditArticleSliderComponent} from './edit-article-slider/editarticlesilder-component'
import {EditArticleComponent} from './edit-article/editarticle-component'
import { AddTermsConditionsComponent } from './add-terms-conditions/add-terms-conditons-component';
import { AddWhatPeopleSayComponent } from './add-what-people-say/add-what-people-say-component';
import {EditTermsConditionsComponent} from './edit-terms-conditions/edittermsconditions-component';
import { EditWhatPeopleSayComponent } from './edit-what-people-say/edit-what-people-say-component';
import { SelectDropDownModule} from 'ngx-select-dropdown';
import { AddCompanyComponent } from './add-company/addcompany-component';
import { EditProviderComponent } from './edit-provider/editprovider-component';
import { AddPDFComponent } from './add-pdf/add-pdf-component';
import { AddPartnerComponent } from './add-partner/add-partner-component';
import { EditPartnerComponent } from './edit-partner/editpartner-component';
import { AddCountryComponent } from './add-country/add-country-component';
import { EditCountryComponent } from './edit-country/editcountry-component';
import { AddCityComponent } from './add-city/add-city-component';
import { EditCityComponent } from './edit-city/editcity-component';
import { AddRegionComponent  } from './add-region/add-region-component'
import { EditRegionComponent } from './edit-region/editregion-component';
@NgModule({
	declarations: [
		FormWizardComponent,
		FormValidationComponent,
		FormUploadComponent,
		FormTreeComponent,
		AddCustomerComponent,
		EditCustomerComponent,
		AddCategoryComponent,
		EditCategoryComponent,
		AddSubCategoryComponent,
		EditSubCategoryComponent,
		AddProviderComponent,
		AddArticlesSliderComponent,
		AddArticleComponent,
		EditArticleSliderComponent,
		EditArticleComponent,
		AddTermsConditionsComponent,
		AddWhatPeopleSayComponent,
		EditTermsConditionsComponent,
		EditWhatPeopleSayComponent,
		AddCompanyComponent,
		EditProviderComponent,
		AddPDFComponent,
		AddPartnerComponent,
		EditPartnerComponent,
		AddCountryComponent,
		EditCountryComponent,
		AddCityComponent,
		EditCityComponent,
		AddRegionComponent,
		EditRegionComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(FormRoutes),
		TreeModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,
		MatTabsModule,
		MatRadioModule,
		MatProgressBarModule,
		FormsModule,
		ReactiveFormsModule,
		FileUploadModule,
		FlexLayoutModule,
		TranslateModule,
		SelectDropDownModule
	]
})
export class FormModule { }
