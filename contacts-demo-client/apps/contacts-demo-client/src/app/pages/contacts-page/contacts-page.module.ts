import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from './contacts-page.component';
import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ComponentsModule } from '../../shared/components/components.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    ContactsPageComponent,
    ContactsEditorComponent
  ],
  imports: [
    CommonModule,
    ContactsPageRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ComponentsModule,
    MatSortModule,
  ]
})
export class ContactsPageModule {
}
