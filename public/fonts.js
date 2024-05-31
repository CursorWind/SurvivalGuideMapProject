import { Space_Grotesk } from '@next/font/google';

const spaceGrotesk = Space_Grotesk({
  family: 'Space Grotesk',
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
  display: 'swap', // Controls font loading behavior
  subset: ['latin'], // Specify character subsets if needed
});

export default spaceGrotesk;