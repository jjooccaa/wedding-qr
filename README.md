# Wedding Site

Welcome to Our Wedding Site! This project is a web application built to share our journey and to allow our guests to upload photos, review them, and leave their contact information for future updates.

## Technologies Used

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.io/) for database and s3 bucket
- **Build Tool**: Vite for faster development and build processes

## Features

- **Photo Upload**: Guests can upload photos to share moments from the wedding.
- **Photo Review**: Photos can be reviewed and approved to ensure they meet quality standards.
- **Email Subscription**: Visitors can leave their email addresses to receive future updates and notifications.
- **Life Timelines**: Learn more about us through our life timelines, highlighting significant milestones and memories.

## Live Demo
Check out our live site: https://jovanijovana.netlify.app

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing.

### Prerequisites

- Node.js and npm (or Yarn)
- Supabase account for backend services
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:jjooccaa/wedding-qr.git
   cd wedding-qr
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Configure Supabase**

   - Create an account and project in Supabase.
   - Set up authentication and a database for handling photo uploads and email subscriptions.
   - Create an `.env` file and add your Supabase keys and configuration settings:

     ```
     REACT_APP_SUPABASE_URL=your_supabase_url
     REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### Running the App

- **Development server**

  To start the development server:

  ```bash
  npm run dev
  ```

  Or with Yarn:

  ```bash
  yarn dev
  ```

  Open your browser and go to `http://localhost:5173` to see the app in action.

### Building for Production

To build the app for production:

```bash
npm run build
```

Or with Yarn:

```bash
yarn build
```

The build outputs a `build` directory with all static files ready for deployment.

## Usage

- **Upload Photos**: Navigate to the photo upload section to add your photos.
- **Review Photos**: Admins can review uploaded photos to ensure they meet quality standards.
- **Subscribe for Updates**: Enter your email in the subscription form to receive updates about our journey.

## Life Timelines

- **About Us**: Discover major events and milestones in our lives, from how we met to the present day.

## Contributing

If you wish to contribute, feel free to fork the repository and submit a pull request. 

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to our friends and family who helped make this project a reality.
- Icons and images courtesy of various contributors.
