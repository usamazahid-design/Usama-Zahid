export interface LegalSection {
  id: string;
  number: string;
  title: string;
  body: string[];
  list?: string[];
  footnote?: string;
}

export interface LegalDocument {
  slug: string;
  code: string;
  number: string;
  title: string;
  shortTitle: string;
  intro: string;
  jurisdiction: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  sections: LegalSection[];
}

export function getLegalTableOfContents(sections: LegalSection[]) {
  return sections.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
  }));
}
