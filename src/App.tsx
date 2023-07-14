import isPropValid from '@emotion/is-prop-valid';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { StyleSheetManager } from 'styled-components';

import RootRoutes from './routes';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // StyleSheetManager is needed when using styled-components version 6
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RootRoutes />
      </QueryClientProvider>
    </StyleSheetManager>
  );
}

export default App;
