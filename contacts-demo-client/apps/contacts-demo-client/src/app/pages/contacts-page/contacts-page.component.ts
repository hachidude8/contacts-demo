import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import { Contact, ContactService } from '../../api/cont-demo-api/modules/contact';
import { Page, PageRequest, ResourceQuery, Response } from '../../api/cont-demo-api';
import { Sort } from '@angular/material/sort';
import { States } from '../../shared/state';


@Component({
  selector: 'contd-contact-page',
  templateUrl: './contacts-page.component.html',
})
export class ContactsPageComponent implements OnInit {

  readonly query: Partial<ResourceQuery> = { page: 0 };
  readonly States = States;
  state = States.IDLE;
  displayedColumns: string[] = ['name', 'nickname', 'role', 'actions'];
  dataSource = new MatTableDataSource<Contact>([]);

  page: Page | undefined;

  constructor(
    private crudService: ContactService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.state = States.LOADING;
    this.loadData();
  }

  loadData(): void {
    this.fetchData().subscribe({
      next: result => this.afterDataFetched(result),
      error: e => this.afterFetchError(e),
    });
  }

  edit(source?: Contact, index?: number) {
    const dialogRef = this.dialog.open(
      ContactsEditorComponent,
      {
        data: source || {}
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const copy = [...this.dataSource.data];
      index != null
        ? copy.splice(index, 1, result)
        : copy.push(result);
      this.dataSource.data = copy;
    });
  }

  remove(source: Contact, index: number) {
    this.crudService.deleteOne(source).subscribe(() => {
      const copy = [...this.dataSource.data];
      copy.splice(index, 1);
      this.dataSource.data = copy;
    });
  }

  sortColumn(sort: Sort): void {
    if (sort.direction) {
      this.query.sort = `${ sort.active },${ sort.direction }`;
    } else {
      delete this.query.sort;
    }
    this.loadData();
  }

  pageList(page: PageRequest): void {
    this.query.page = page.page;
    this.loadData();
  }

  private fetchData() {
    return this.crudService.getBy(this.query);
  }

  private afterDataFetched(result: Response<Contact[]>) {
    this.dataSource.data = result._embedded.contacts;
    this.page = result.page;
    this.state = States.IDLE;
  }

  private afterFetchError(e?: unknown) {
    this.state = States.ERROR;
  }
}
