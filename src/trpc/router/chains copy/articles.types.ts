import { z } from 'zod';

import { articleSchema, articlesSchema, blockSchema, vectorSchema } from './articles.schema';

export type Article = z.infer<typeof articleSchema>;
export type Block = z.infer<typeof blockSchema>;
export type Vector = z.infer<typeof vectorSchema>;
export type Articles = z.infer<typeof articlesSchema>;
export type SVGData = z.infer<typeof vectorSchema>;
