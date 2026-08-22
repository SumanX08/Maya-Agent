import { z } from "zod";

export const MemoryEntitySchema = z.object({
  id: z.string(),
  type: z.enum([
    "person",
    "project",
    "technology",
    "topic",
    "preference",
    "fact"
  ]),
  name: z.string()
});

export const MemoryRelationshipSchema = z.object({
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
  to: z.string()
});

export const MemoryExtractionSchema = z.object({
  entities: z.array(
    MemoryEntitySchema
  ),

  relationships: z.array(
    MemoryRelationshipSchema
  )
});