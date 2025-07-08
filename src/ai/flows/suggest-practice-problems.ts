'use server';

/**
 * @fileOverview A flow that suggests LeetCode-style coding problems based on studied topics.
 *
 * - suggestPracticeProblems - A function that suggests practice problems.
 * - SuggestPracticeProblemsInput - The input type for the suggestPracticeProblems function.
 * - SuggestPracticeProblemsOutput - The return type for the suggestPracticeProblems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPracticeProblemsInputSchema = z.object({
  studiedTopics: z
    .array(z.string())
    .describe('A list of topics the user has studied.'),
});
export type SuggestPracticeProblemsInput = z.infer<typeof SuggestPracticeProblemsInputSchema>;

const SuggestedProblemSchema = z.object({
  title: z.string().describe('The title of the coding problem.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the problem.'),
  link: z.string().url().describe('A link to the problem on LeetCode or a similar platform.'),
  topic: z.string().describe('The topic which this problem reinforces'),
});

const SuggestPracticeProblemsOutputSchema = z.object({
  problems: z.array(SuggestedProblemSchema).describe('A list of suggested practice problems.'),
});
export type SuggestPracticeProblemsOutput = z.infer<typeof SuggestPracticeProblemsOutputSchema>;

export async function suggestPracticeProblems(input: SuggestPracticeProblemsInput): Promise<SuggestPracticeProblemsOutput> {
  return suggestPracticeProblemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPracticeProblemsPrompt',
  input: {schema: SuggestPracticeProblemsInputSchema},
  output: {schema: SuggestPracticeProblemsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant LeetCode-style coding problems based on the topics a user has studied.

  The user has studied the following topics:
  {{#each studiedTopics}}- {{this}}\n{{/each}}

  Suggest coding problems that are relevant to these topics. Each problem should have a title, difficulty (easy, medium, hard), a link to the problem, and the topic which the problem reinforces.
  Return the problems in JSON format.
  `,
});

const suggestPracticeProblemsFlow = ai.defineFlow(
  {
    name: 'suggestPracticeProblemsFlow',
    inputSchema: SuggestPracticeProblemsInputSchema,
    outputSchema: SuggestPracticeProblemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
