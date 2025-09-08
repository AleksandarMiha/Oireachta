import z from "zod";

const BillStatusSchema = z.enum([
  "Current",
  "Withdrawn",
  "Enacted",
  "Rejected",
  "Defeated",
  "Lapsed",
]);
const BillSourceSchema = z.enum(["Government", "Private", "Private Member"]);
const BillTypeSchema = z.enum(["Public", "Private"]);
const DocTypeSchema = z.enum([
  "digest",
  "gluais",
  "memo",
  "act",
  "bill",
  "errata",
]);
const LangSchema = z.enum(["eng", "gle", "mul"]);

/** head */
export const HeadSchema = z.object({
  counts: z.object({
    billCount: z.number(),
    resultCount: z.number(),
  }),
});

const ShowUri = z.object({
  showAs: z.string().nullable().optional(),
  uri: z.url().nullable().optional(),
});

/** act */
export const ActSchema = z.object({
  actNo: z.string(),
  actYear: z.string(),
  dateSigned: z.string(),
  longTitleEn: z.string().nullable(),
  longTitleGa: z.string().nullable(),
  shortTitleEn: z.string(),
  shortTitleGa: z.string(),
  statutebookURI: z.url(),
  uri: z.url(),
});

/** amendment formats */
const AmendmentFormatsSchema = z.object({
  pdf: z.object({ uri: z.url() }).nullable().optional(),
  xml: z.url().nullable().or(z.null()).optional(),
});

const AmendmentListItemSchema = z.object({
  amendmentList: z.object({
    amendmentTypeUri: z.object({ uri: z.url() }),
    chamber: ShowUri,
    date: z.string(),
    formats: AmendmentFormatsSchema,
    showAs: z.string(),
    stage: ShowUri,
    stageNo: z.string(),
  }),
});

/** debates */
const DebateSchema = z.object({
  chamber: ShowUri,
  date: z.string(),
  debateSectionId: z.string(),
  showAs: z.string(),
  uri: z.url(),
});

/** events */
const ChamberSchema = z
  .object({
    chamberCode: z.string().nullable().optional(),
    showAs: z.string(),
    uri: z.url(),
  })
  .nullable();

const EventSchema = z.object({
  event: z.object({
    chamber: ChamberSchema,
    dates: z.array(z.object({ date: z.string() })),
    eventURI: z.url().optional(),
    showAs: z.string(),
    uri: z.url(),
  }),
});

/** versions */
const VersionFormatsSchema = z.object({
  pdf: z.object({ uri: z.url() }).nullable().optional(),
  xml: z.url().nullable().or(z.null()).optional(),
});

const VersionSchema = z.object({
  version: z.object({
    date: z.string(),
    docType: DocTypeSchema,
    formats: VersionFormatsSchema,
    lang: LangSchema,
    showAs: z.string(),
    uri: z.url(),
  }),
});

const HouseSchema = z
  .object({
    chamberCode: z.string(),
    chamberType: z.string(),
    houseCode: z.string(),
    houseNo: z.string(),
    showAs: z.string(),
    uri: z.url(),
  })
  .nullable();

/** stages */
const StageEventSchema = z.object({
  chamber: ChamberSchema,
  dates: z.array(z.object({ date: z.string().nullable() })),
  house: HouseSchema.optional(),
  progressStage: z.number().optional(),
  showAs: z.string(),
  stageCompleted: z.boolean(),
  stageOutcome: z.string().nullable().optional(),
  stageURI: z.url(),
  uri: z.url(),
});

const StageSchema = z.object({ event: StageEventSchema });

/** relatedDocs */
const RelatedDocSchema = z.object({
  relatedDoc: z.object({
    date: z.string(),
    docType: DocTypeSchema,
    formats: VersionFormatsSchema,
    lang: LangSchema,
    showAs: z.string(),
    uri: z.url(),
  }),
});

/** sponsors */
const SponsorSchema = z.object({
  sponsor: z.object({
    as: ShowUri,
    by: ShowUri.optional(),
    isPrimary: z.boolean().optional(), // api issue, sometimes return undefined, should always be only boolean
  }),
});

/** bill */
export const BillSchema = z.object({
  act: ActSchema.nullable().optional(),
  amendmentLists: z.array(AmendmentListItemSchema).optional(),
  billNo: z.string(),
  billType: BillTypeSchema,
  billTypeURI: z.url(),
  billYear: z.string(),
  debates: z.array(DebateSchema).optional(),
  events: z.array(EventSchema).optional(),
  lastUpdated: z.string(),
  longTitleEn: z.string().nullable(),
  longTitleGa: z.string().nullable(),
  method: z.string(),
  methodURI: z.url(),
  mostRecentStage: z.object({ event: StageEventSchema }).optional(),
  originHouse: ShowUri.optional(),
  originHouseURI: z.url().optional(),
  relatedDocs: z.array(RelatedDocSchema).optional(),
  shortTitleEn: z.string(),
  shortTitleGa: z.string(),
  source: BillSourceSchema,
  sourceURI: z.url(),
  sponsors: z.array(SponsorSchema),
  stages: z.array(StageSchema).optional(),
  status: BillStatusSchema,
  statusURI: z.url(),
  uri: z.url(),
  versions: z.array(VersionSchema).optional(),
});

/** billSort */
const BillSortSchema = z.object({
  actNoSort: z.number().nullable().optional(),
  actShortTitleEnSort: z.string().nullable().optional(),
  actShortTitleGaSort: z.string().nullable().optional(),
  actYearSort: z.number().nullable().optional(),
  billNoSort: z.number(),
  billShortTitleEnSort: z.string(),
  billShortTitleGaSort: z.string(),
  billYearSort: z.number(),
});

/** results */
export const LegislationResultBillSchema = z.object({
  bill: BillSchema,
  billSort: BillSortSchema,
  contextDate: z.string(),
});

export const OireachtasLegislationResponseSchema = z.object({
  head: HeadSchema,
  results: z.array(LegislationResultBillSchema),
});

export type OireachtasLegislationResponse = z.infer<
  typeof OireachtasLegislationResponseSchema
>;
export type LegislationResultBill = z.infer<typeof LegislationResultBillSchema>;
export type Bill = z.infer<typeof BillSchema>;
export type BillType = z.infer<typeof BillTypeSchema>;
export type BillTypeFilter = "All" | BillType;
export type LegislationQueryParams = {
  limit?: number;
  skip?: number;
};
