import { Poppins } from 'next/font/google';
import '~/styles/globals.css';

const poppins = Poppins({
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin-ext'],
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body className={poppins.className}>{children}</body>
  </html>
);

export default RootLayout;
