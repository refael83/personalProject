import Home from './page/Home';
import Airports from './page/Airports';
import Flights from './page/flights';
import SignIn from './page/SignIn';
import { useState } from 'react';
import Users from './page/Users';
import Navbar from './components/Navbar';
import { Routes, BrowserRouter, Route, } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './connectToServer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/',
          headers: () => {
            return {
              Authorization: String(localStorage.getItem('token')),
            };
          },
        }),
      ],
    })
  );

  return (
    <div>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
          <Navbar />
            <Routes>    
              <Route>
               <Route path="/" element={<Home />}></Route>
               <Route path="users" element={<Users />}></Route>
                <Route path="airports" element={<Airports />}></Route>
                  <Route path="flights" element={<Flights />}></Route>
                <Route path="signIn" element={<SignIn />}></Route>
                </Route>          
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
}
