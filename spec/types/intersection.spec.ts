import { z } from 'zod';
import { expectSchema } from '../lib/helpers';

describe('intersection', () => {
  it('supports intersection types', () => {
    const Person = z.object({
      name: z.string(),
    });

    const Employee = z.object({
      role: z.string(),
    });

    expectSchema(
      [z.intersection(Person, Employee).openapi({ refId: 'Test' })],
      {
        Test: {
          allOf: [
            {
              type: 'object',
              properties: { name: { type: 'string' } },
              required: ['name'],
            },
            {
              type: 'object',
              properties: { role: { type: 'string' } },
              required: ['role'],
            },
          ],
        },
      }
    );
  });
});
