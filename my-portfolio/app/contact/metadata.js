export const metadata = {
  title: 'Contact Me | Ahamed Usman - Full Stack Developer',
  description: 'Get in touch with Ahamed Usman, a Full Stack Developer specializing in React, Node.js, and modern web technologies.',
  keywords: ['contact', 'hire developer', 'web development', 'react', 'next.js', 'portfolio'],
  openGraph: {
    title: 'Contact Me | Ahamed Usman - Full Stack Developer',
    description: 'Get in touch with Ahamed Usman, a Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    siteName: 'Ahamed Usman Portfolio',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ahamed Usman - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Me | Ahamed Usman - Full Stack Developer',
    description: 'Get in touch with Ahamed Usman, a Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
};