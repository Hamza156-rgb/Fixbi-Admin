import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { WidgetComponentModule } from '../widget-component/widget-component.module';
import { UserRoutes } from './users.routing';

@NgModule({
declarations: 
	[
   ],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule.forChild(UserRoutes),
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatPaginatorModule,
		MatDividerModule,
		MatCheckboxModule,
		MatTableModule,
		MatTabsModule,
		MatChipsModule,
		MatSelectModule,
		WidgetComponentModule,
		TranslateModule
	]
})
export class UsersModule { }
