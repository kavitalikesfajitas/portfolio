import { z } from "zod";

const greenhouseLocationSchema = z
  .object({
    name: z.string(),
  })
  .passthrough();

export const greenhouseDepartmentReferenceSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    parent_id: z.number().nullable().optional(),
    child_ids: z.array(z.number()).optional(),
  })
  .passthrough();

export const greenhouseOfficeReferenceSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    location: z.string().nullable().optional(),
    parent_id: z.number().nullable().optional(),
    child_ids: z.array(z.number()).optional(),
  })
  .passthrough();

export const greenhouseJobSchema = z
  .object({
    id: z.number(),
    internal_job_id: z.number().nullable(),
    title: z.string(),
    updated_at: z.string(),
    requisition_id: z.string().nullable().optional(),
    location: greenhouseLocationSchema.nullable().optional(),
    absolute_url: z.url(),
    language: z.string().nullable().optional(),
    company_name: z.string().optional(),
    first_published: z.string().nullable().optional(),
    departments: z.array(greenhouseDepartmentReferenceSchema).optional(),
    offices: z.array(greenhouseOfficeReferenceSchema).optional(),
    metadata: z.unknown().optional(),
  })
  .passthrough();

export const greenhouseDepartmentSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    jobs: z.array(greenhouseJobSchema),
    parent_id: z.number().nullable().optional(),
    child_ids: z.array(z.number()).optional(),
  })
  .passthrough();

export const greenhouseDepartmentsResponseSchema = z.object({
  departments: z.array(greenhouseDepartmentSchema),
});

export const greenhouseJobsResponseSchema = z.object({
  jobs: z.array(greenhouseJobSchema),
  meta: z
    .object({
      total: z.number(),
    })
    .passthrough(),
});

export type GreenhouseJob = z.infer<typeof greenhouseJobSchema>;
export type GreenhouseDepartment = z.infer<typeof greenhouseDepartmentSchema>;
export type GreenhouseDepartmentsResponse = z.infer<
  typeof greenhouseDepartmentsResponseSchema
>;
export type GreenhouseJobsResponse = z.infer<
  typeof greenhouseJobsResponseSchema
>;
