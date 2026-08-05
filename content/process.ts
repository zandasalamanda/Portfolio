/**
 * How working together actually goes. Every promise here is one already made
 * elsewhere on the site — see content/services.ts `preferences` — so the page
 * reads as a commitment rather than a sales page. Change a step here and it
 * changes everywhere.
 */
export interface Step {
  n: string;
  title: string;
  when: string;
  line: string;
  detail: string[];
  /** id of the drawn vignette in components/ProcessArt */
  art: string;
}

export const steps: Step[] = [
  {
    n: '01',
    art: 'talk',
    title: 'You tell me what you need',
    when: 'free, no obligation',
    line: 'A short conversation — email or a call, whichever you prefer. You describe the problem in your own words. No technical vocabulary required.',
    detail: [
      'What your business does, and who you want to reach',
      'What the site or tool you have now gets wrong',
      'Roughly when you need it',
    ],
  },
  {
    n: '02',
    art: 'quote',
    title: 'I send a fixed quote',
    when: 'within 24 hours',
    line: 'One written scope and one price, before any work starts. If I am not the right person for the job, I tell you that instead of taking the project.',
    detail: [
      'Exactly what gets built, listed line by line',
      'One price — no hourly billing, no change-order games',
      'A delivery date you can hold me to',
    ],
  },
  {
    n: '03',
    art: 'preview',
    title: 'You watch it get built',
    when: 'live link from day one',
    line: 'You get a preview link the day work starts and it updates as I go. There is no reveal at the end, because you have been looking at it the whole time.',
    detail: [
      'See real progress whenever you want, from your phone',
      'Say something early, when changing it is cheap',
      'The person writing the code is the person you talk to',
    ],
  },
  {
    n: '04',
    art: 'keys',
    title: 'You own everything',
    when: 'from the start, not the end',
    line: 'The domain, the code, the hosting and the logins are in your name throughout. If I disappeared tomorrow, any other developer could pick it up cleanly.',
    detail: [
      'Domain and hosting registered to you',
      'Repository and credentials handed over',
      'Cancel any month — no lock-in, no ransom',
    ],
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What does it cost?',
    a: 'Every project is quoted individually, because a five-page site for a trade and a product with accounts and payments are not the same job. You get one fixed price in writing before anything starts, and it does not move unless you ask for something new.',
  },
  {
    q: 'How long does it take?',
    a: 'A website is usually one to two weeks. An app with accounts and payments is three to six. An AI tool wired into what you already use is one to three. The date is in the quote.',
  },
  {
    q: 'What do you need from me?',
    a: 'Three things: your words and pictures — text, photos, prices, rough versions are fine; your logo if you have one, and it is fine if you do not; and answers when I ask questions, so nothing stalls waiting on a decision. No account managers, no lock-in.',
  },
  {
    q: 'I am not technical. Is that a problem?',
    a: 'No — most of the people I build for are not. You describe the problem in plain words and I handle the rest. Nothing I hand back requires you to write code or manage a server.',
  },
  {
    q: 'What happens after it goes live?',
    a: 'Every build comes with 30 days of fixes, whatever else you decide. After that you can look after the site yourself — it is yours, and it is built so another developer could pick it up cleanly — or put it on the Care Plan at $75 a month and text me when something needs changing. First month is free with any build, and you can cancel any month without losing anything.',
  },
  {
    q: 'What if I do not like it?',
    a: 'You will have seen it long before it is finished. The preview link goes live on day one, so problems get caught while they are still cheap to fix instead of arriving as a surprise at the end.',
  },
  {
    q: 'Do I actually own it?',
    a: 'Yes. Domain, code, hosting and credentials are yours from the beginning, not handed over as a favour at the end. You can take the whole thing to another developer at any point.',
  },
  {
    q: 'Who does the work?',
    a: 'I do. There is no team behind me and no account manager in the middle. The person who writes the quote is the person who writes the code.',
  },
];
