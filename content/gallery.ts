/**
 * The photo strip on the home page. Client-supplied images; each one reveals
 * a word about how the work actually gets done when you hover it. Every
 * caption names something the site promises elsewhere, so the strip carries
 * an argument rather than mood alone.
 */
export interface GalleryPhoto {
  rel: string;
  alt: string;
  word: string;
  caption: string;
  rotate: number;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    rel: 'gallery/work-01.jpg',
    alt: 'A laptop at night with a purple backlit keyboard, a code editor open on the HTML of a website',
    word: 'BUILD',
    caption: 'Every site starts as an empty file and a blank page.',
    rotate: -2.5,
  },
  {
    rel: 'gallery/work-02.jpg',
    alt: 'A laptop screen running MATLAB, a data file open beside the code that plots it',
    word: 'MEASURE',
    caption: 'Before the good-looking part, the numbers have to be right.',
    rotate: 1.8,
  },
  {
    rel: 'gallery/work-03.jpg',
    alt: 'A laptop in a dark room lit by purple strip lights, a code editor open on error-handling code',
    word: 'PERSIST',
    caption: 'Most of the work is the cases nobody thinks about.',
    rotate: -1.6,
  },
  {
    rel: 'gallery/work-04.jpg',
    alt: 'A person working late at a laptop, a dashboard and the code behind it open side by side',
    word: 'FOCUS',
    caption: 'One project at a time, until it actually works.',
    rotate: 2.4,
  },
  {
    rel: 'gallery/work-05.jpg',
    alt: 'A person at a desk at night reading live market data on screen',
    word: 'FINISH',
    caption: 'Done means live and in your hands — not almost.',
    rotate: -2,
  },
];
