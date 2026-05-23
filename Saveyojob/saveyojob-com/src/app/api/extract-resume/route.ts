import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

// PDF extraction is handled client-side (pdfjs-dist in browser).
// This endpoint only handles DOCX and TXT uploads.

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum size is 5 MB.' }, { status: 400 });
  }

  const ext    = file.name.split('.').pop()?.toLowerCase();
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    if (ext === 'docx' || ext === 'doc') {
      const result = await mammoth.extractRawText({ buffer });
      return NextResponse.json({ text: result.value });
    }

    if (ext === 'txt') {
      return NextResponse.json({ text: buffer.toString('utf-8') });
    }

    return NextResponse.json(
      { error: 'Unsupported file type. Upload a DOCX or TXT file.' },
      { status: 400 },
    );
  } catch (err) {
    console.error('[extract-resume]', err);
    return NextResponse.json(
      { error: 'Could not read this file. Try pasting your resume text instead.' },
      { status: 422 },
    );
  }
}
