// `image` (optional) is a filename under public/blog/<slug>/, used for link-preview cards.
// Newest-first: the index renders in this order, so keep posts sorted by date descending.
export const posts = [
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
