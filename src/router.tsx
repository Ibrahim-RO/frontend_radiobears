import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { IndexView } from './views/IndexView'
import { LivesView } from './views/LivesView'
import { EventsView } from './views/EventsView'
import { HostsView } from './views/HostsView'
import { StoreView } from './views/StoreView'
import { SocialMediasView } from './views/SocialMediasView'
import { Associates } from './views/Associates'
import { SignUpView } from './views/SignUpView'
import { LoginView } from './views/LoginView'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route element={<Layout />}>
          <Route path='/' element={<IndexView />} index/>
          <Route path='/lives' element={<LivesView />} />
          <Route path='/hosts' element={<HostsView />} />
          <Route path='/events' element={<EventsView />} />
          <Route path='/store' element={<StoreView />} />
          <Route path='/social-medias' element={<SocialMediasView />} />
          <Route path='/associates' element={<Associates />} />
          <Route path='/sign-up' element={<SignUpView />} />
          <Route path='/login' element={<LoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
