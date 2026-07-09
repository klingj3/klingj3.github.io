// `image` (optional) is a filename under public/blog/<slug>/, used for link-preview cards.
// Newest-first: the index renders in this order, so keep posts sorted by date descending.
export const posts = [
  {
    slug: 'fortune-arcs',
    title: "Feeding the Shapes of 11,027 Stories Into a Computer",
    date: '2026-07-09',
    description:
      'A recommendation engine dies on contact with a long-dead API, and a Kurt Vonnegut essay picks up the pieces. ' +
        '11,027 novels charted by an LLM: the shapes stories make, the fingerprints of genre, and a century of ' +
        'darkening first chapters.',
    image: 'og-card.png',
    heroGif: '/blog/fortune-arcs/hero-shapes.svg',
  },
  {
    slug: 'squabble',
    title: 'Building a Scrabble Agent, and What It Teaches About the Game',
    date: '2026-06-03',
    description:
      'How a terminal Scrabble engine navigates millions of candidate moves per turn, and what ten thousand games of AI ' +
        'self-play reveal about the words worth knowing, and the power of Q.',
    image: 'demo.gif',
    showcaseGif: '/blog/squabble/playing-the-trumpet-q-star-trek.gif',
    heroGif: '/images/squabble.gif',
  },
].sort((a, b) => b.date.localeCompare(a.date))

const rawModules = import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: true })

export const markdowns = Object.fromEntries(
  Object.entries(rawModules).map(([p, md]) => [p.replace('./', '').replace('.md', ''), md])
)
