import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact, ContactService } from '../../../api/cont-demo-api/modules/contact';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiException } from '../../../api/cont-demo-api';
import { States } from '../../../shared/state';

@Component({
  selector: 'contd-contact-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.scss']
})
export class ContactsEditorComponent implements OnInit {

  readonly States = States;
  state = States.IDLE;
  form: FormGroup | undefined;
  error: ApiException | undefined;

  constructor(
    private crudService: ContactService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContactsEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Contact,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  save() {
    if (!this.form?.valid) {
      return;
    }
    const payload = { ...this.form.value };
    this.state = States.LOADING;
    this.saveData(payload).subscribe({
      next: result => this.afterSave(result),
      error: e => this.afterSaveError(e)
    });
  }

  closeDialog(payload?: Contact) {
    this.dialogRef.close(payload);
  }

  private buildForm() {
    const source: Partial<Contact> = this.data || {};
    this.form = this.createForm(source);
  }

  private createForm(source: Partial<Contact>) {
    return this.fb.group({
      uuid: this.fb.control(source.uuid),
      name: this.fb.control(source.name, [Validators.required]),
      nickname: this.fb.control(source.nickname, [Validators.required]),
      role: this.fb.control(source.role, [Validators.required])
    });
  }

  private saveData(payload: Contact): Observable<Contact> {
    return this.crudService.save(payload);
  }

  private afterSave(result: Contact) {
    this.closeDialog(result);
    this.state = States.IDLE;
  }

  private afterSaveError(e: HttpErrorResponse) {
    this.state = States.ERROR;
    this.error = e.error;
  }
}
