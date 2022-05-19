import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NewlineBreakPipe } from './newline-break.pipe';
import { PlaneTextPipe } from './plane-text';
import { NewlinePipe } from './innerHtml';
@NgModule({
    declarations: [NewlineBreakPipe,PlaneTextPipe,NewlinePipe],
    imports: [IonicModule],
    exports: [NewlineBreakPipe,PlaneTextPipe,NewlinePipe]
})
export class PipesModule { }
