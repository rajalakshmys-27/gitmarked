import { createBrowserRouter } from 'react-router';
import Layout from '../App';
import HomePage from '../pages/HomePage';
import Bookmarks from '../pages/BookmarksPage';

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: "/",
        Component: HomePage,
      },
      { path: 'bookmarks', Component: Bookmarks },
    ],
  },
]);

export default router;
