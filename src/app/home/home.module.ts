import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { TimeRemainingComponent } from '../time-remaining/time-remaining.component'
import { TimeFormatPipe } from '../time-format.pipe';


import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, TimeRemainingComponent, TimeFormatPipe]
})
export class HomePageModule {}
