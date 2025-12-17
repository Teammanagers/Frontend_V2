import { z } from 'zod';
import { PROFILE_FORM_KEYS } from '../profile.constants';

export const profileSchema = z.object({
  [PROFILE_FORM_KEYS.USERNAME]: z.string().max(10),
  [PROFILE_FORM_KEYS.PHONE]: z.string().max(11),
  [PROFILE_FORM_KEYS.ORGANIZATION]: z.string(),
  [PROFILE_FORM_KEYS.IMG_URL]: z
    .union([z.string().url(), z.instanceof(File)])
    .optional(),
  // [PROFILE_FORM_KEYS.ROLE_TAG]: z.array(z.string()).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
