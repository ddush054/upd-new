import { Component, OnInit } from '@angular/core';
import { PagesHomeFacade } from './+state/pages-home.facade';

import { ColumnConfig } from '@cra-arc/upd-components';
import { I18nFacade } from '@cra-arc/upd/state';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pages-home',
  templateUrl: './pages-home.component.html',
  styleUrls: ['./pages-home.component.css'],
})
export class PagesHomeComponent implements OnInit {
  pagesHomeData$ = this.pagesHomeService.pagesHomeTableData$;
  loading$ = this.pagesHomeService.loading$;

  currentLang$ = this.i18n.currentLang$;

  columns: ColumnConfig[] = [];

  ngOnInit() {
    combineLatest([this.currentLang$]).subscribe(([lang]) => {
      this.columns = [
        {
          field: 'title',
          header: this.i18n.service.translate('Title', lang),
          tooltip: 'Title tooltip',
        },
        {
          field: 'url',
          header: this.i18n.service.translate('URL', lang),
          type: 'link',
          typeParam: '_id',
          tooltip: 'Url tooltip',
        },
        {
          field: 'visits',
          header: this.i18n.service.translate('visits', lang),
          pipe: 'number',
        },
      ];
    });

    this.pagesHomeService.fetchData();
  }

  constructor(
    private pagesHomeService: PagesHomeFacade,
    private i18n: I18nFacade
  ) {}
}
