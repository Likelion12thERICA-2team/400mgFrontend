/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile' : '280px'
    },
    fontFamily: {
      'AppleBold' : ['AppleBold'],
      'AppleExBold' : ['AppleExBold'],
      'AppleSemiBold' : ['AppleSemiBold'],
      'AppleReBold' : ['AppleReBold'],
      'AppleMedium' : ['AppleMedium']
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    },
    colors: {
      'main1' : '#536FF4',
      'main2' : '#789AF4',
      'main3' : '#88BFFE',
      'main4' : '#EDF4FC',
      'homework1' : '#E24E4A',
      'homework2' : '#DE6A57',
      'homework3' : '#DB8D5C',
      'notification1' : '#8DDB76',
      'notification2' : '#B7DB76',
      'notification3' : '#DCDA77',
      'management1' : '#5E80DB',
      'management2' : '#5EA6DB',
      'management3' : '#AAAAAA',
      'success' : '#63C714',
      'information' : '#2D9AFF',
      'warning' : '#F5A020',
      'error' : '#F6403F',
      'black' : '#212121',
      'grayDark' : '#4C4C4E',
      'gray' : '#969699',
      'grayLight' : '#D1D1D6',
      'border' : '#F1F1F5',
      'white' : '#F9F9FC',
      'whiteTotal' : '#FFFFFF',
      'lightPurple' : '#8478F7'
    },
  },
  plugins: [],
}