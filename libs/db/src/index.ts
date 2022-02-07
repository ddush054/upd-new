export * from './lib/db.module';
export * from './lib/db.connection';
export * from './lib/db.schemas';

import mongoose, { Model } from 'mongoose';
import {
  Overall,
  OverallSchema,
  Page,
  PageMetrics,
  PageMetricsSchema,
  PageSchema,
} from './lib/db.schemas';

export function getOverallModel(): Model<mongoose.Document<Overall>> {
  return mongoose.model(Overall.name, OverallSchema);
}

export function getPageModel(): Model<mongoose.Document<Page>> {
  return mongoose.model(Page.name, PageSchema);
}

export function getPageMetricsModel(): Model<mongoose.Document<PageMetrics>> {
  return mongoose.model(PageMetrics.name, PageMetricsSchema);
}