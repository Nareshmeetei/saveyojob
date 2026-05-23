// Tool dispatcher — packages arguments into structured context that the
// follow-up Gemini call will use to generate the actual output.
// No external API calls happen here; Gemini does all generation in the second call.

export interface ToolResult {
  task: string;
  data: Record<string, unknown>;
  instructions: string;
}

export function dispatchTool(
  name: string,
  args: Record<string, unknown>,
): ToolResult {
  switch (name) {
    case 'analyze_resume':
      return {
        task: 'resume_analysis',
        data: {
          resumeText: args.resumeText ?? '',
          jobDescription: args.jobDescription ?? null,
        },
        instructions: args.jobDescription
          ? 'Analyze this resume for the target job. Score it out of 10. List 3 strengths, 3 specific improvements, and identify keyword gaps vs the job description. Be direct and specific — no generic advice.'
          : 'Analyze this resume. Score it out of 10. List 3 strengths and 4 specific, actionable improvements with examples. Focus on impact and measurable results. No generic advice.',
      };

    case 'match_resume_to_job':
      return {
        task: 'ats_match',
        data: {
          resumeText: args.resumeText ?? '',
          jobDescription: args.jobDescription ?? '',
        },
        instructions:
          'Calculate an ATS match score (0-100). List which required keywords are present, which are missing, and give 3 specific edits to close the gap. Format: Score, Present Keywords, Missing Keywords, Top 3 Fixes.',
      };

    case 'generate_cover_letter': {
      const tone = (args.tone as string) || 'professional';
      const toneGuide: Record<string, string> = {
        professional: 'formal and polished — clear, direct, competent',
        conversational: 'warm but professional — personable, shows genuine interest',
        confident: 'assertive and results-focused — leads with measurable impact',
      };
      return {
        task: 'cover_letter',
        data: {
          resumeText: args.resumeText ?? '',
          jobDescription: args.jobDescription ?? '',
          tone,
        },
        instructions: `Write a cover letter. Tone: ${toneGuide[tone] ?? toneGuide.professional}. Rules: 3 paragraphs, under 250 words. Opening: hook + why this role. Middle: 2 specific achievements that match the job. Closing: clear call to action. No "I am writing to apply" openers. No clichés. Output only the letter — no intro line.`,
      };
    }

    case 'generate_interview_questions': {
      const level = (args.experienceLevel as string) || 'mid';
      return {
        task: 'interview_prep',
        data: {
          jobTitle: args.jobTitle ?? '',
          jobDescription: args.jobDescription ?? null,
          experienceLevel: level,
        },
        instructions: `Generate interview prep for a ${level}-level ${args.jobTitle ?? 'professional'} role. Provide: 5 likely questions they will ask (with a 2-sentence answer approach for each), 3 smart questions the candidate should ask the interviewer, and 2 mistakes to avoid. Be specific to the role — no generic interview advice.`,
      };
    }

    case 'analyze_job_description':
      return {
        task: 'job_analysis',
        data: { jobDescription: args.jobDescription ?? '' },
        instructions:
          'Analyze this job description as an experienced recruiter would. Provide: Must-Have requirements (5-6 items), Nice-to-Have (3-4), Red Flags (any unrealistic expectations or warning signs — be honest), Culture Signals (what the company is probably like), and a Salary Estimate if not listed. Be direct.',
      };

    case 'suggest_resume_improvements':
      return {
        task: 'resume_rewrite',
        data: { resumeText: args.resumeText ?? '' },
        instructions:
          'Rewrite the 4-5 weakest parts of this resume to be more impactful. For each: show BEFORE (original), AFTER (improved), and WHY (one sentence). Focus on: weak bullet verbs, missing metrics, vague summaries. Remove "responsible for", "helped with", "assisted in". Show only the improvements — no preamble.',
      };

    default:
      return {
        task: 'unknown',
        data: {},
        instructions: 'Answer the user\'s career question directly based on the conversation.',
      };
  }
}

// Human-readable label for tool names shown in the UI
export function toolLabel(name: string): string {
  const labels: Record<string, string> = {
    analyze_resume: 'Analyzing resume',
    match_resume_to_job: 'Checking ATS match',
    generate_cover_letter: 'Writing cover letter',
    generate_interview_questions: 'Building interview prep',
    analyze_job_description: 'Analyzing job posting',
    suggest_resume_improvements: 'Rewriting resume bullets',
  };
  return labels[name] ?? 'Running tool';
}
