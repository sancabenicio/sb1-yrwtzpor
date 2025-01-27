/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,vue,svelte,ts,tsx}'
  ],
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {
      colors: {
        'no-bindi': {
          primary: '#006B3F',
          secondary: '#FFB81C',
          accent: '#CE1126',
          success: '#059669',
          warning: '#D97706',
          error: '#DC2626',
          info: '#2563EB',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
          }
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        'xxs': '0.625rem',
        'tiny': '0.75rem',
      },
      height: {
        'screen-90': '90vh',
      },
      maxWidth: {
        'screen-xl': '1280px',
      },
      minHeight: {
        'card': '120px',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}