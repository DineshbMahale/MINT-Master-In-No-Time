export type Topic = {
  id: string;
  title: string;
  category: 'Data Structures' | 'Algorithms' | 'Web Dev' | 'System Design';
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
};

export type StudyPlan = Topic[];

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
