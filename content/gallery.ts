/**
 * The photo strip on the home page. Client-supplied images; each one reveals
 * a word about how the work actually gets done when you hover it.
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
    rel: 'gallery/01.jpg',
    alt: 'A laptop at night running a code editor, keyboard lit purple',
    word: 'SHIP',
    caption: 'Most of it gets built after everyone else logs off.',
    rotate: -2.5,
  },
  {
    rel: 'gallery/02.jpg',
    alt: 'A purple and pink sunset seen through an open window',
    word: 'PATIENCE',
    caption: 'Good software is mostly the hours nobody sees.',
    rotate: 1.8,
  },
  {
    rel: 'gallery/03.jpg',
    alt: 'An illustration of a cloaked figure walking forward with the words become better',
    word: 'IMPROVE',
    caption: 'Every project has to beat the one before it.',
    rotate: -1.6,
  },
  {
    rel: 'gallery/04.jpg',
    alt: 'A cat resting on a backlit keyboard beside a monitor',
    word: 'PATIENCE',
    caption: 'Debugging is the job. The rest is typing.',
    rotate: 2.4,
  },
  {
    rel: 'gallery/05.jpg',
    alt: 'A person working at a desk at night lit by a monitor',
    word: 'FOCUS',
    caption: 'One project at a time, until it actually works.',
    rotate: -2,
  },
];
