import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Spinner from './components/Spinner';

// Actions.
import { action as newUserAction } from './views/users/NewUser';
import { action as loginAction } from './views/pages/Login';
import { action as passwordResetRequestAction } from './views/pages/passwords/PasswordResetRequest';
import { action as passwordResetAction } from './views/pages/passwords/PasswordReset';
import { action as userAction } from './views/users/User';
import { action as profileAction } from './views/users/Profile';
import { action as newTestimonialAction } from './views/testimonials/NewTestimonial';
import { action as testimonialAction } from './views/testimonials/Testimonial';
import { action as newEventAction } from './views/events/NewEvent';
import { action as eventAction } from './views/events/Event';
import { action as podcastAction } from './views/podcasts/Podcast';
import { action as newPodcastAction } from './views/podcasts/NewPodcast';
import { action as galleryAction } from './views/galleries/Gallery';
import { action as newGalleryAction } from './views/galleries/NewGallery';
import { action as projectAction } from './views/projects/Project';
import { action as newProjectAction } from './views/projects/NewProject';
import { action as newBlogPostAction } from './views/blog-posts/NewBlogPost';
import { action as blogPostAction } from './views/blog-posts/BlogPost';

// Loaders
import { loader as usersLoader } from './views/users/Users';
import { loader as userLoader } from './views/users/User';
import { loader as testimonialLoader } from './views/testimonials/Testimonial';
import { loader as testimonialsLoader } from './views/testimonials/Testimonials';
import { loader as eventsLoader } from './views/events/Events';
import { loader as eventLoader } from './views/events/Event';
import { loader as podcastsLoader } from './views/podcasts/Podcasts';
import { loader as podcastLoader } from './views/podcasts/Podcast';
import { loader as galleryLoader } from './views/galleries/Gallery';
import { loader as galleriesLoader } from './views/galleries/Galleries';
import { loader as projectLoader } from './views/projects/Project';
import { loader as projectsLoader } from './views/projects/Projects';
import { loader as blogPostLoader } from './views/blog-posts/BlogPost';
import { loader as blogPostsLoader } from './views/blog-posts/BlogPosts';

import './scss/style.scss';

// Containers
const DefaultLayout = lazy(() => import('./components/DefaultLayout'));

// Pages
const Login = lazy(() => import('./views/pages/Login'));

// Internal components
const Dashboard = lazy(() => import('./views/Dashboard'));
const Users = lazy(() => import('./views/users/Users'));
const NewUser = lazy(() => import('./views/users/NewUser'));
const User = lazy(() => import('./views/users/User'));
const Profile = lazy(() => import('./views/users/Profile'));
const NewTestimonial = lazy(() =>
    import('./views/testimonials/NewTestimonial')
);
const Testimonials = lazy(() => import('./views/testimonials/Testimonials'));
const Testimonial = lazy(() => import('./views/testimonials/Testimonial'));
const NewEvent = lazy(() => import('./views/events/NewEvent'));
const Events = lazy(() => import('./views/events/Events'));
const Event = lazy(() => import('./views/events/Event'));
const NewPodcast = lazy(() => import('./views/podcasts/NewPodcast'));
const Podcasts = lazy(() => import('./views/podcasts/Podcasts'));
const Podcast = lazy(() => import('./views/podcasts/Podcast'));
const Gallery = lazy(() => import('./views/galleries/Gallery'));
const Galleries = lazy(() => import('./views/galleries/Galleries'));
const NewGallery = lazy(() => import('./views/galleries/NewGallery'));
const Project = lazy(() => import('./views/projects/Project'));
const Projects = lazy(() => import('./views/projects/Projects'));
const NewProject = lazy(() => import('./views/projects/NewProject'));
const BlogPost = lazy(() => import('./views/blog-posts/BlogPost'));
const BlogPosts = lazy(() => import('./views/blog-posts/BlogPosts'));
const NewBlogPost = lazy(() => import('./views/blog-posts/NewBlogPost'));

// Pages
const PasswordResetRequest = lazy(() =>
    import('./views/pages/passwords/PasswordResetRequest')
);
const PasswordReset = lazy(() =>
    import('./views/pages/passwords/PasswordReset')
);

// Error boundary
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/dashboard',
            element: <DefaultLayout />,
            errorElement: <ErrorBoundary />,
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                    loader: usersLoader
                },
                {
                    path: 'users',
                    element: <Users />,
                    loader: usersLoader
                },
                {
                    path: 'users/:id',
                    element: <User />,
                    loader: userLoader,
                    action: userAction
                },
                {
                    path: 'users/new',
                    element: <NewUser />,
                    action: newUserAction
                },
                {
                    path: 'users/:id/profile',
                    element: <Profile />,
                    loader: userLoader,
                    action: profileAction
                },
                {
                    path: 'testimonials',
                    element: <Testimonials />,
                    loader: testimonialsLoader
                },
                {
                    path: 'testimonials/:id',
                    element: <Testimonial />,
                    loader: testimonialLoader,
                    action: testimonialAction
                },
                {
                    path: 'testimonials/new',
                    element: <NewTestimonial />,
                    action: newTestimonialAction
                },
                {
                    path: 'events/new',
                    element: <NewEvent />,
                    action: newEventAction
                },
                {
                    path: 'events',
                    element: <Events />,
                    loader: eventsLoader
                },
                {
                    path: 'events/:id',
                    element: <Event />,
                    loader: eventLoader,
                    action: eventAction
                },
                {
                    path: 'podcasts/new',
                    element: <NewPodcast />,
                    action: newPodcastAction
                },
                {
                    path: 'podcasts',
                    element: <Podcasts />,
                    loader: podcastsLoader
                },
                {
                    path: 'podcasts/:id',
                    element: <Podcast />,
                    loader: podcastLoader,
                    action: podcastAction
                },
                {
                    path: 'galleries/new',
                    element: <NewGallery />,
                    action: newGalleryAction
                },
                {
                    path: 'galleries',
                    element: <Galleries />,
                    loader: galleriesLoader
                },
                {
                    path: 'galleries/:id',
                    element: <Gallery />,
                    loader: galleryLoader,
                    action: galleryAction
                },
                {
                    path: 'projects/new',
                    element: <NewProject />,
                    action: newProjectAction
                },
                {
                    path: 'projects',
                    element: <Projects />,
                    loader: projectsLoader
                },
                {
                    path: 'projects/:id',
                    element: <Project />,
                    loader: projectLoader,
                    action: projectAction
                },
                {
                    path: 'blog-posts/new',
                    element: <NewBlogPost />,
                    action: newBlogPostAction
                },
                {
                    path: 'blog-posts',
                    element: <BlogPosts />,
                    loader: blogPostsLoader
                },
                {
                    path: 'blog-posts/:id',
                    element: <BlogPost />,
                    loader: blogPostLoader,
                    action: blogPostAction
                }
            ]
        },
        {
            path: '/',
            errorElement: <ErrorBoundary />,
            element: <Login />,
            action: loginAction
        },
        {
            path: '/password-reset-request',
            element: <PasswordResetRequest />,
            action: passwordResetRequestAction
        },
        {
            path: '/password-reset/:password_reset_token',
            element: <PasswordReset />,
            action: passwordResetAction
        }
    ]);

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            <RouterProvider
                router={router}
                fallbackElement={<DefaultLayout />}
            />
        </Suspense>
    );
};

export default App;
