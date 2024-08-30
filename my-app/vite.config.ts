import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        splash: resolve(__dirname, 'src/index.html'),
        main: resolve(__dirname, 'src/homepage.html'),
        signin: resolve(__dirname, 'src/sign-in.html'),
        signup: resolve(__dirname, 'src/sign-up.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        save: resolve(__dirname, 'src/saved.html'),
        password_security: resolve(__dirname, 'src/password-security.html'),
        food_stall: resolve(__dirname, 'src/stalls.html'),
        guide: resolve(__dirname, 'src/guide.html'),
        faq: resolve(__dirname, 'src/faq.html'),
        developers: resolve(__dirname, 'src/developers.html'),
        map: resolve(__dirname, 'src/finalMap.html'),
        route1: resolve(__dirname, 'src/ajj.html'),
        route2: resolve(__dirname, 'src/bentelog.html'),
        route3: resolve(__dirname, 'src/blyths.html'),
        route4: resolve(__dirname, 'src/boffo.html'),
        route5: resolve(__dirname, 'src/brewcorp.html'),
        route6: resolve(__dirname, 'src/bryans.html'),
        route7: resolve(__dirname, 'src/cedcanteen.html'),
        route8: resolve(__dirname, 'src/chirpy.html'),
        route9: resolve(__dirname, 'src/chirpyh.html'),
        route10: resolve(__dirname, 'src/grazzias.html'),
        route11: resolve(__dirname, 'src/honesty.html'),
        route12: resolve(__dirname, 'src/khoys.html'),
        route13: resolve(__dirname, 'src/kofes.html'),
        route14: resolve(__dirname, 'src/legendary.html'),
        route15: resolve(__dirname, 'src/lils.html'),
        route16: resolve(__dirname, 'src/seths.html'),
        route17: resolve(__dirname, 'src/sgsg.html'),
        route18: resolve(__dirname, 'src/teakoyaken.html'),
        route19: resolve(__dirname, 'src/toilys.html'),
        route20: resolve(__dirname, 'src/zinnia.html')
      },
    },
  },
});
