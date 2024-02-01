module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--jakartaSans-font)'],
        sora: ['var(--soraSans-font)'],
        code: ['var(--firaCode-font)'],
        emoji: ['Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
      colors: {
        darkText: '#E4E6EB',
        dark: '#121212',
        light: '#fafafa',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        flying: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(0.5rem)' },
          '100%': { transform: 'translateY(0)' },
        },
        badge: {
          '100%': {
            transform: 'scaleY(1.7) scaleX(1.25)',
            opacity: '0',
          },
        },
        loop: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'waving-hand': 'wave 2s linear infinite',
        'flying-card': 'flying 3s infinite normal',
        'badge-pulse': 'badge 1.5s ease-out infinite',
        'looping-tag': 'loop 100s linear infinite',
      },
      boxShadow: {
        popover:
          '-0.0625rem 0 1.25rem rgba(23, 24, 24, 0.05), 0 0.0625rem 0.3125rem rgba(0, 0, 0, 0.15)',
        'popover-dark':
          '0.0625rem 0 1.25rem rgba(242, 242, 242, 0.05), 0 -0.0625rem 0.3125rem rgba(255, 255, 255, 0.15)',
        // intense: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
        intense: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
        'intense-dark': 'rgba(255, 255, 255, 0.1) 0px 0px 16px',
        subtle: 'rgba(0, 0, 0, 0.2) 0px 20px 40px -7px',
        'subtle-dark': 'rgba(255, 255, 255, 0.1) 0px 20px 40px -7px',
        nextjs: '0 8px 30px rgb(0,0,0,0.12)',
        'nextjs-dark': '0 8px 30px rgb(255,255,255,0.12)',
        demure: 'rgba(0, 0, 0, 0.3) 0 35px 60px -15px',
        mondegreen:
          '5px 5px rgba(0, 98, 90, 0.4), 10px 10px rgba(0, 98, 90, 0.3), 15px 15px rgba(0, 98, 90, 0.2), 20px 20px rgba(0, 98, 90, 0.1), 25px 25px rgba(0, 98, 90, 0.05)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
