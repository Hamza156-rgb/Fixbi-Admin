import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { VideoPlayerRoutes } from './video-player.routing';

import { VgCoreModule} from '@videogular/ngx-videogular/core';
import { VgControlsModule} from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forChild(VideoPlayerRoutes),
		VgCoreModule,
		VgControlsModule,
		VgOverlayPlayModule,
		VgBufferingModule,
		VgStreamingModule,
		MatCardModule
	]
})
export class VideoPlayerModule { }
