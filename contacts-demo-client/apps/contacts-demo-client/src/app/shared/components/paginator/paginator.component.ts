import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Page, PageRequest } from '../../../api/cont-demo-api/page';


const range = (start: number, end: number) => {
  if (start < 0 || end < 0) {
    throw new Error('Start and end values must be positive integers');
  }
  return Array(end - start + 1).fill(0).map((v, idx) => start + idx);
};

@Component({
  selector: 'contd-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input() page: Page | undefined;
  @Output() pageEvent = new EventEmitter<PageRequest>();

  private readonly MAX_VIEW_PAGES = 5;

  isFirst = false;
  isLast = false;
  hasNext = false;
  hasPrevious = false;
  pageIndexes: number[] = [];

  ngOnChanges(): void {
    this.updateDetails();
  }

  next() {
    const index = this.page?.number || 0;
    this.open(index + 1);
  }

  previous() {
    const index = this.page?.number || 0;
    const prev = index - 1;
    if (prev > -1) {
      this.open(prev);
    }
  }

  first() {
    this.open(0);
  }

  last() {
    const total = this.page?.totalPages || 0;
    this.open(total - 1);
  }

  open(page: number) {
    this.pageEvent.next({
      page
    });
  }

  private updateDetails() {
    if (!this.page) {
      return;
    }
    const current = this.page.number;
    const last = (this.page.totalPages - 1);
    this.isFirst = current === 0;
    this.isLast = current === last;
    this.hasNext = current < last;
    this.hasPrevious = current > 0;

    const half = Math.floor(this.MAX_VIEW_PAGES / 2);
    const doubleHalf = half * 2;

    this.pageIndexes = current < half
      ? range(0, doubleHalf)
      : current >= (last - half)
        ? range(current - doubleHalf, last)
        : range(current - half, current + half);
  }
}
