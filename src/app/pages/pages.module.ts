import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
	declarations: [

	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatCardModule,
		MatPaginatorModule,
		MatInputModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatTabsModule,
		MatChipsModule,
		MatIconModule,
		MatButtonModule,
		MatDividerModule,
		MatGridListModule,
		MatSlideToggleModule,
		MatListModule,
		MatMenuModule,
		TranslateModule
	]
})
export class PagesModule { }
