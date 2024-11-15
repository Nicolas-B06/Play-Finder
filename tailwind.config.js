module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#26292d',     
        secondary: '#fefdfe',   
        accent: '#a2b55c', 
        highlight: '#3c3c3c',    
      },
      boxShadow: {
        'default': '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'lg': '12px',
      },
    },
  },
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  variants: {},
  plugins: [],
};