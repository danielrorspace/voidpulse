import { relations, sql } from "drizzle-orm";
import { date, integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { boards } from "./boards";
import { users } from "./users";
import { boardCharts } from "./board-charts";
import { z } from "zod";
import { chartDataSchema } from "src/routes/charts/chartDataSchema";
import {
  ChartTimeRangeType,
  ChartType,
  LineChartGroupByTimeType,
  ReportType,
  RetentionNumFormat,
} from "../app-router-type";
import {
  InputMetric,
  MetricFilter,
} from "../routes/charts/insight/eventFilterSchema";
import { messages } from "./messages";

export const charts = pgTable("charts", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  title: text("title"),
  description: text("description"),
  chartType: integer("chart_type").notNull().$type<ChartType>(),
  reportType: integer("report_type").$type<ReportType>().notNull(),
  visibleDataMap: jsonb("visible_data_map").$type<Record<
    string,
    boolean
  > | null>(),
  lineChartGroupByTimeType: integer(
    "line_chart_group_by_time_type"
  ).$type<LineChartGroupByTimeType>(),
  retentionNumFormat: integer(
    "retention_num_format"
  ).$type<RetentionNumFormat>(),
  timeRangeType: integer("time_range_type")
    .notNull()
    .$type<ChartTimeRangeType>(),
  from: date("from"),
  to: date("to"),
  metrics: jsonb("metrics").notNull().$type<InputMetric[]>(),
  breakdowns: jsonb("breakdowns").$type<MetricFilter[]>(),
  globalFilters: jsonb("global_filters").$type<MetricFilter[]>(),
  data: jsonb("data").notNull().$type<z.infer<typeof chartDataSchema>>(),
  boardId: uuid("board_id"),
  dataUpdatedAt: date("data_updated_at")
    .notNull()
    .default(sql`now()`),
  creatorId: uuid("creator_id").notNull(),
});

export const chartRelations = relations(charts, ({ one, many }) => ({
  boardCharts: many(boardCharts),
  messages: many(messages),
  creator: one(users, {
    fields: [charts.creatorId],
    references: [users.id],
  }),
}));
