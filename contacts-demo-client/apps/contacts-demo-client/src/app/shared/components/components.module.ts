import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ErrorMessageComponent } from './error-message/error-message.component';


const exported = [ErrorMessageComponent, PageHeaderComponent, PaginatorComponent];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule
  ],
  declarations: exported,
  exports: exported,
})
export class ComponentsModule {
}
