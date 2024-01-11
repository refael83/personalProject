import Home from './page/Home';
import Airports from './page/Airports';
import { useState } from 'react';
import Users from './page/Users';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './connectToServer';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/',
        }),
      ],
    })
  );

  return (
    <div>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/airports" element={<Airports />}></Route>
              <Route path="/users" element={<Users />}></Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
}
