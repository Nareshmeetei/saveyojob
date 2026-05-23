import { SchemaType } from '@google/generative-ai';
import type { FunctionDeclaration } from '@google/generative-ai';

export const TOOL_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: 'analyze_resume',
    description:
      'Analyze a resume and give specific, actionable feedback on content, structure, and impact. Call this when the user shares resume text or asks for resume feedback or review.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        resumeText: {
          type: SchemaType.STRING,
          description: 'The full text content of the resume',
        },
        jobDescription: {
          type: SchemaType.STRING,
          description: 'Optional job description to tailor feedback to a specific role',
        },
      },
      required: ['resumeText'],
    },
  },
  {
    name: 'match_resume_to_job',
    description:
      'Calculate an ATS match score and find keyword gaps between a resume and a job description. Use when the user wants to know how well their resume fits a specific job.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        resumeText:      { type: SchemaType.STRING, description: 'The resume text' },
        jobDescription:  { type: SchemaType.STRING, description: 'The job description text' },
      },
      required: ['resumeText', 'jobDescription'],
    },
  },
  {
    name: 'generate_cover_letter',
    description:
      'Write a professional cover letter based on the resume and job description. Use when the user asks for a cover letter.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        resumeText:      { type: SchemaType.STRING, description: 'The resume text' },
        jobDescription:  { type: SchemaType.STRING, description: 'The job description' },
        tone: {
          type: SchemaType.STRING,
          description: 'Tone: professional, conversational, or confident. Default: professional',
        },
      },
      required: ['resumeText', 'jobDescription'],
    },
  },
  {
    name: 'generate_interview_questions',
    description:
      'Generate likely interview questions with answer guidance for a specific job. Use when the user asks for interview prep or practice questions.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        jobTitle: {
          type: SchemaType.STRING,
          description: 'The job title being interviewed for',
        },
        jobDescription: {
          type: SchemaType.STRING,
          description: 'Optional job description for targeted questions',
        },
        experienceLevel: {
          type: SchemaType.STRING,
          description: 'Experience level: entry, mid, senior, or executive',
        },
      },
      required: ['jobTitle'],
    },
  },
  {
    name: 'analyze_job_description',
    description:
      'Break down a job description into must-have skills, nice-to-haves, red flags, and culture signals. Use when the user shares a job posting for analysis.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        jobDescription: {
          type: SchemaType.STRING,
          description: 'The full job description text',
        },
      },
      required: ['jobDescription'],
    },
  },
  {
    name: 'suggest_resume_improvements',
    description:
      'Rewrite weak resume bullets and sections to be more impactful. Show before/after examples. Use when the user asks to improve or rewrite their resume.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        resumeText: {
          type: SchemaType.STRING,
          description: 'The resume text to improve',
        },
      },
      required: ['resumeText'],
    },
  },
];
