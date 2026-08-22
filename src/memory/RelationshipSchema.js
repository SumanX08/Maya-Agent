import { z } from "zod";

export const RelationshipCandidateSchema = z.object({
  from: z.string(),
  relation: z.enum([
    "WORKS_ON",
    "USES",
    "PREFERS",
    "KNOWS",
    "INTERESTED_IN",
    "MENTIONS",
    "RELATED_TO"
  ]),
  to: z.string(),
  confidence: z.number().min(0).max(1),
  reason: z.string()
});

export const RelationshipBuilderSchema = z.object({
  relationships: z.array(
    RelationshipCandidateSchema
  )
});