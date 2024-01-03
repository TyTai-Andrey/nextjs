import '../styles/styles.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-notifications-component/dist/theme.css';
import { ProvidersWrapper } from '../compositions/ProvidersWrapper';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <ProvidersWrapper>
      <Component {...pageProps} />
    </ProvidersWrapper>
  );
}
