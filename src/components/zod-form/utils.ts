/* eslint-disable @typescript-eslint/no-explicit-any */
import z, { ZodTypeAny } from "zod";

export const isRequiredByFieldName = (paths: string[], schema: ZodTypeAny) => {
  let shape: z.ZodObject<any, z.UnknownKeysParam, z.ZodTypeAny, {
    [x: string]: any;
  }, {
    [x: string]: any;
  }>;

  if (isZodEffect(schema)) {
    shape = schema._def.schema;
  } else if (isZodObject(schema)) {
    shape = schema;
  } else {
    throw new Error("schema is not ZodObject or ZodEffects");
  }

  paths.forEach((path: string) => {
    if (shape) {
      shape = shape?.shape[path]
    }
  });

  // 如果是Optional类型，表示字段可为空
  return !isZodOptional(shape)
}

const isZodEffect = (schema: unknown): schema is z.ZodEffects<any> =>
  typeof schema === "object" &&
  !!schema &&
  !("shape" in schema) &&
  "_def" in schema &&
  typeof schema._def === "object" &&
  !!schema._def &&
  "schema" in schema._def;

const isZodOptional = (schema: unknown): schema is z.ZodOptional<any> =>
  typeof schema === "object" && !!schema && "unwrap" in schema;

const isZodObject = (schema: unknown): schema is z.ZodObject<any> =>
  typeof schema === "object" && !!schema && "shape" in schema;
