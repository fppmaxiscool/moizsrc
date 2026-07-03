/* MOIZ — App Logic: TMDB API, Profiles, i18n, Search, Player */
(function () {
  'use strict';

  // ── CONFIG ──
  const TMDB_KEY = '91b2bd29fb6be4f66adb4570b1438439';
  const TMDB_BASE = 'https://api.themoviedb.org/3';
  const TMDB_IMG = 'https://image.tmdb.org/t/p/';
  const DEFAULT_AVATARS = [
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png', // Classic Smile
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png', // Blue
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c33850498.56ba69ac33b25.png', // Yellow
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623a33850498.56ba69ac2a6f7.png', // Red
    'https://pro2-bar-s3-cdn-cf4.myportfolio.com/dddb0c1b4ab622854dd81280840458d3/92995677ac0aab719760c33c_rw_600.png', // Purple
    'https://image.tmdb.org/t/p/w200/rweIrveL43TaxUN0akQEaAXL6x0.jpg', // Spider-man
    'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg', // Batman
    'https://image.tmdb.org/t/p/w200/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', // Joker
    'https://image.tmdb.org/t/p/w200/8BWvXn7VzK93yR7vN3BqB1mO0x5.jpg' // Iron man
  ];
  const GENRE_ROWS = [
    { key: 'trendingNow', url: '/trending/movie/week', params: '' },
    { key: 'tvShows',     url: '/trending/tv/week', params: '' },
    { key: 'action',      url: '/discover/movie', params: '&with_genres=28&sort_by=popularity.desc&page=1' },
    { key: 'comedy',      url: '/discover/movie', params: '&with_genres=35&sort_by=popularity.desc&page=1' },
    { key: 'horror',      url: '/discover/movie', params: '&with_genres=27&sort_by=popularity.desc&page=1' },
    { key: 'sciFi',       url: '/discover/movie', params: '&with_genres=878&sort_by=popularity.desc&page=1' },
    { key: 'drama',       url: '/discover/movie', params: '&with_genres=18&sort_by=popularity.desc&page=1' },
    { key: 'thriller',    url: '/discover/movie', params: '&with_genres=53&sort_by=popularity.desc&page=1' },
    { key: 'romance',     url: '/discover/movie', params: '&with_genres=10749&sort_by=popularity.desc&page=1' },
    { key: 'animationAdult', url: '/discover/movie', params: '&with_genres=16&sort_by=popularity.desc&page=1' },
    { key: 'documentary', url: '/discover/movie', params: '&with_genres=99&sort_by=popularity.desc&page=1' },
  ];

  // Kid-safe rows: ONLY Family and Animation, NO horror/thriller/crime
  const KIDS_GENRE_ROWS = [
    { key: 'trendingNow', url: '/trending/movie/week', params: '' },
    { key: 'family',      url: '/discover/movie', params: '&with_genres=10751&without_genres=27,53,80&certification_country=US&certification.lte=PG&include_adult=false&sort_by=popularity.desc&page=1' },
    { key: 'animation',   url: '/discover/movie', params: '&with_genres=16&without_genres=27,53,80&certification_country=US&certification.lte=PG&include_adult=false&sort_by=popularity.desc&page=1' },
    { key: 'comedy',      url: '/discover/movie', params: '&with_genres=35,10751&without_genres=27,53,80&certification_country=US&certification.lte=PG&include_adult=false&sort_by=popularity.desc&page=1' },
    { key: 'adventure',   url: '/discover/movie', params: '&with_genres=12,10751&without_genres=27,53,80&certification_country=US&certification.lte=PG&include_adult=false&sort_by=popularity.desc&page=1' },
  ];

  // ── i18n DICTIONARY ──
  const LANG = {
    en: {
      whoIsWatching: "Who's watching?",
      addProfile: 'Add Profile', createProfile: 'Create Profile',
      profileName: 'Profile Name', chooseAvatar: 'Choose an Avatar',
      saveProfile: 'Save Profile', deleteConfirm: 'Delete this profile?',
      navHome: 'Home', navTvShows: 'TV Shows', navMovies: 'Movies', navSports: 'Live Sports',
      navNewPopular: 'New & Popular', navMyList: 'My List',
      play: 'Play', moreInfo: 'More Info', playNow: 'Play Now',
      searchPlaceholder: 'Titles, people, genres',
      searchResultsFor: 'Search results for',
      noResults: 'No results found.',
      trendingNow: 'Trending Now', tvShows: 'TV Shows', action: 'Action', comedy: 'Comedy',
      horror: 'Horror', sciFi: 'Sci-Fi', drama: 'Drama', thriller: 'Thriller', romance: 'Romance', animationAdult: 'Animation', documentary: 'Documentaries',
      family: 'Family', animation: 'Animation', adventure: 'Adventure',
      switchProfiles: 'Switch Profiles', accountSettings: 'Account Settings', signOut: 'Sign out of Moiz', kidsProfileCheck: "Kid's Profile?",
      kids: "KIDS", recentlyWatched: "Recently Watched",
      editorsChoice: "Editor's Choice"
    },
    es: {
      whoIsWatching: '\u00bfQui\u00e9n est\u00e1 viendo?',
      addProfile: 'Agregar Perfil', createProfile: 'Crear Perfil',
      profileName: 'Nombre del Perfil', chooseAvatar: 'Elige un Avatar',
      saveProfile: 'Guardar Perfil', deleteConfirm: '\u00bfEliminar este perfil?',
      navHome: 'Inicio', navTvShows: 'Series', navMovies: 'Pel\u00edculas',
      navNewPopular: 'Nuevos y Populares', navMyList: 'Mi Lista',
      play: 'Reproducir', moreInfo: 'M\u00e1s Info', playNow: 'Reproducir Ahora',
      searchPlaceholder: 'T\u00edtulos, personas, g\u00e9neros',
      searchResultsFor: 'Resultados para',
      noResults: 'Sin resultados.',
      trendingNow: 'Tendencias', tvShows: 'Series', action: 'Acci\u00f3n', comedy: 'Comedia',
      horror: 'Terror', sciFi: 'Ciencia Ficci\u00f3n', drama: 'Drama', thriller: 'Suspense', romance: 'Romance', animationAdult: 'Animaci\u00f3n', documentary: 'Documentales',
      family: 'Familia', animation: 'Animaci\u00f3n', adventure: 'Aventura',
      switchProfiles: 'Cambiar Perfiles', accountSettings: 'Ajustes de Cuenta', signOut: 'Cerrar sesi\u00f3n', kidsProfileCheck: "\u00bfPerfil infantil?",
      kids: "NI\u00d1OS", recentlyWatched: "Vistos Recientemente",
      editorsChoice: "Selecci\u00f3n del Editor"
    },
    fr: {
      whoIsWatching: 'Qui regarde ?',
      addProfile: 'Ajouter un Profil', createProfile: 'Cr\u00e9er un Profil',
      profileName: 'Nom du Profil', chooseAvatar: 'Choisir un Avatar',
      saveProfile: 'Enregistrer', deleteConfirm: 'Supprimer ce profil ?',
      navHome: 'Accueil', navTvShows: 'S\u00e9ries', navMovies: 'Films', navSports: 'Sports en Direct',
      navNewPopular: 'Nouveaut\u00e9s', navMyList: 'Ma Liste',
      play: 'Lecture', moreInfo: 'Plus d\'Info', playNow: 'Lire Maintenant',
      searchPlaceholder: 'Titres, personnes, genres',
      searchResultsFor: 'R\u00e9sultats pour',
      noResults: 'Aucun r\u00e9sultat.',
      trendingNow: 'Tendances', tvShows: 'Séries', action: 'Action', comedy: 'Com\u00e9die',
      horror: 'Horreur', sciFi: 'Science-Fiction', drama: 'Drame', thriller: 'Thriller', romance: 'Romance', animationAdult: 'Animation', documentary: 'Documentaires',
      family: 'Famille', animation: 'Animation', adventure: 'Aventure',
      switchProfiles: 'Changer de Profil', accountSettings: 'Param\u00e8tres', signOut: 'D\u00e9connexion', kidsProfileCheck: "Profil Enfant ?",
      kids: "ENFANTS", recentlyWatched: "Vus R\u00e9cemment",
      editorsChoice: "Choix de l'\u00c9diteur"
    },
    de: {
      whoIsWatching: 'Wer schaut gerade?',
      addProfile: 'Profil hinzuf\u00fcgen', createProfile: 'Profil erstellen',
      profileName: 'Profilname', chooseAvatar: 'Avatar w\u00e4hlen',
      saveProfile: 'Profil speichern', deleteConfirm: 'Dieses Profil l\u00f6schen?',
      navHome: 'Home', navTvShows: 'Serien', navMovies: 'Filme', navSports: 'Live-Sport',
      navNewPopular: 'Neu und Beliebt', navMyList: 'Meine Liste',
      play: 'Abspielen', moreInfo: 'Mehr Infos', playNow: 'Jetzt ansehen',
      searchPlaceholder: 'Titel, Personen, Genres',
      searchResultsFor: 'Suchergebnisse f\u00fcr',
      noResults: 'Keine Ergebnisse gefunden.',
      trendingNow: 'Angesagt', tvShows: 'Serien', action: 'Action', comedy: 'Kom\u00f6die',
      horror: 'Horror', sciFi: 'Sci-Fi', drama: 'Drama', thriller: 'Thriller', romance: 'Romanze', animationAdult: 'Animation', documentary: 'Dokus',
      family: 'Familie', animation: 'Animation', adventure: 'Abenteuer',
      switchProfiles: 'Profil wechseln', accountSettings: 'Konto', signOut: 'Abmelden', kidsProfileCheck: "Kinderprofil?",
      kids: "KINDER", recentlyWatched: "Zuletzt gesehen",
      editorsChoice: "Redaktionswahl"
    },
    it: {
      whoIsWatching: 'Chi vuole guardare Moiz?',
      addProfile: 'Aggiungi profilo', createProfile: 'Crea profilo',
      profileName: 'Nome profilo', chooseAvatar: 'Scegli un avatar',
      saveProfile: 'Salva profilo', deleteConfirm: 'Elimina questo profilo?',
      navHome: 'Home', navTvShows: 'Serie TV', navMovies: 'Film', navSports: 'Sport in Diretta',
      navNewPopular: 'Nuovi e popolari', navMyList: 'La mia lista',
      play: 'Riproduci', moreInfo: 'Altre info', playNow: 'Guarda ora',
      searchPlaceholder: 'Titoli, persone, generi',
      searchResultsFor: 'Risultati della ricerca per',
      noResults: 'Nessun risultato trovato.',
      trendingNow: 'In primo piano', tvShows: 'Serie TV', action: 'Azione', comedy: 'Commedia',
      horror: 'Horror', sciFi: 'Fantascienza', drama: 'Dramma', thriller: 'Thriller', romance: 'Romantico', animationAdult: 'Animazione', documentary: 'Documentari',
      family: 'Famiglia', animation: 'Animazione', adventure: 'Avventura',
      switchProfiles: 'Cambia profilo', accountSettings: 'Account', signOut: 'Esci da Moiz', kidsProfileCheck: "Profilo bambini?",
      kids: "BAMBINI", recentlyWatched: "Visti di recente",
      editorsChoice: "Scelta della redazione"
    },
    pt: {
      whoIsWatching: 'Quem est\u00e1 assistindo?',
      addProfile: 'Adicionar perfil', createProfile: 'Criar perfil',
      profileName: 'Nome do perfil', chooseAvatar: 'Escolha um avatar',
      saveProfile: 'Salvar perfil', deleteConfirm: 'Excluir este perfil?',
      navHome: 'In\u00edcio', navTvShows: 'S\u00e9ries', navMovies: 'Filmes', navSports: 'Esportes ao Vivo',
      navNewPopular: 'Novos e populares', navMyList: 'Minha lista',
      play: 'Assistir', moreInfo: 'Mais informa\u00e7\u00f5es', playNow: 'Assistir agora',
      searchPlaceholder: 'T\u00edtulos, pessoas, g\u00eaneros',
      searchResultsFor: 'Resultados para',
      noResults: 'Nenhum resultado encontrado.',
      trendingNow: 'Em alta', tvShows: 'Séries', action: 'A\u00e7\u00e3o', comedy: 'Com\u00e9dia',
      horror: 'Terror', sciFi: 'Fic\u00e7\u00e3o cient\u00edfica', drama: 'Drama', thriller: 'Suspense', romance: 'Romance', animationAdult: 'Anima\u00e7\u00e3o', documentary: 'Document\u00e1rios',
      family: 'Fam\u00edlia', animation: 'Anima\u00e7\u00e3o', adventure: 'Aventura',
      switchProfiles: 'Trocar perfil', accountSettings: 'Conta', signOut: 'Sair da Moiz', kidsProfileCheck: "Perfil para crian\u00e7as?",
      kids: "KIDS", recentlyWatched: "Assistidos recentemente",
      editorsChoice: "Escolha do Editor"
    },
    sv: {
      whoIsWatching: 'Vem tittar?',
      addProfile: 'L\u00e4gg till profil', createProfile: 'Skapa profil',
      profileName: 'Profilnamn', chooseAvatar: 'V\u00e4lj en avatar',
      saveProfile: 'Spara profil', deleteConfirm: 'Ta bort denna profil?',
      navHome: 'Hem', navTvShows: 'Serier', navMovies: 'Filmer', navSports: 'Live-sport',
      navNewPopular: 'Nytt och popul\u00e4rt', navMyList: 'Min lista',
      play: 'Spela upp', moreInfo: 'Mer info', playNow: 'Spela nu',
      searchPlaceholder: 'Titlar, personer, genrer',
      searchResultsFor: 'S\u00f6kresultat f\u00f6r',
      noResults: 'Inga resultat hittades.',
      trendingNow: 'Trender just nu', tvShows: 'Serier', action: 'Action', comedy: 'Komedi',
      horror: 'Skr\u00e4ck', sciFi: 'Sci-Fi', drama: 'Drama', thriller: 'Thriller', romance: 'Romantik', animationAdult: 'Animering', documentary: 'Dokument\u00e4rer',
      family: 'Familj', animation: 'Animering', adventure: '\u00c4ventyr',
      switchProfiles: 'Byt profil', accountSettings: 'Kontoinst\u00e4llningar', signOut: 'Logga ut fr\u00e5n Moiz', kidsProfileCheck: "Barnprofil?",
      kids: "BARN", recentlyWatched: "Nyligen sedda",
      editorsChoice: "Redakt\u00f6rens val"
    },
    ja: {
      whoIsWatching: '\u8996\u8074\u3059\u308b\u30e6\u30fc\u30b6\u30fc\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044',
      addProfile: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u8ffd\u52a0', createProfile: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u4f5c\u6210',
      profileName: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u540d', chooseAvatar: '\u30a2\u30d0\u30bf\u30fc\u3092\u9078\u629e',
      saveProfile: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u4fdd\u5b58', deleteConfirm: '\u3053\u306e\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3092\u524a\u9664\u3057\u307e\u3059\u304b\uff1f',
      navHome: '\u30db\u30fc\u30e0', navTvShows: 'TV\u756a\u7d44', navMovies: '\u6620\u753b', navSports: 'ライブスポーツ',
      navNewPopular: '\u6700\u65b0\u30fb\u6ce8\u76ee\u4f5c', navMyList: '\u30de\u30a4\u30ea\u30b9\u30c8',
      play: '\u518d\u751f', moreInfo: '\u8a73\u7d30\u60c5\u5831', playNow: '\u4eca\u3059\u3050\u89b6\u8074',
      searchPlaceholder: '\u30bf\u30a4\u30c8\u30eb\u3001\u4eba\u540d\u3001\u30b8\u30e3\u30f3\u30eb',
      searchResultsFor: '\u691c\u7d22\u7d50\u679c: ',
      noResults: '\u4e00\u81f4\u3059\u308b\u4f5c\u54c1\u304c\u3042\u308a\u307e\u305b\u3093\u3002',
      trendingNow: '\u4eca\u6ce8\u76ee\u306e\u4f5c\u54c1', tvShows: 'TV番組', action: '\u30a2\u30af\u30b7\u30e7\u30f3', comedy: '\u30b3\u30e1\u30c7\u30a3',
      horror: '\u30db\u30e9\u30fc', sciFi: 'SF', drama: '\u30c9\u30e9\u30de', thriller: '\u30b9\u30ea\u30e9\u30fc', romance: '\u30ed\u30de\u30f3\u30b9', animationAdult: '\u30a2\u30cb\u30e1', documentary: '\u30c9\u30ad\u30e5\u30e1\u30f3\u30bf\u30ea\u30fc',
      family: '\u30d5\u30a1\u30df\u30ea\u30fc', animation: '\u30a2\u30cb\u30e1', adventure: '\u30a2\u30c9\u30d9\u30f3\u30c1\u30e3\u30fc',
      switchProfiles: '\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u306e\u5207\u308a\u66ff\u3048', accountSettings: '\u30a2\u30ab\u30a6\u30f3\u30c8\u8a2d\u5b9a', signOut: 'Moiz\u304b\u3089\u30b5\u30a4\u30f3\u30a2\u30a6\u30c8', kidsProfileCheck: '\u30ad\u30c3\u30ba\u30d7\u30ed\u30d5\u30a3\u30fc\u30eb\u3067\u3059\u304b\uff1f',
      kids: "\u30ad\u30c3\u30ba", recentlyWatched: "\u6700\u8fd1\u898b\u305f\u4f5c\u54c1",
      editorsChoice: "\u30a8\u30c7\u30a3\u30bf\u30fc\u30ba\u30c1\u30e7\u30a4\u30b9"
    }
  };

  // ── STATE ──
  let currentLang = localStorage.getItem('moiz_lang') || 'en';
  let currentProfile = null;
  let heroMovie = null;
  let searchDebounce = null;
  let loadedMoviesMap = {};
  let currentCategoryFilter = 'all';

  // ═══════ APP MODE DETECTION & STORAGE ═══════
  const urlParams = new URLSearchParams(window.location.search);
  let appMode = urlParams.get('mode');
  if (appMode) {
    localStorage.setItem('moiz_app_mode', appMode);
  } else {
    appMode = localStorage.getItem('moiz_app_mode') || 'combined';
  }

  // ═══════ LIVE SPORTS DATA CATALOG ═══════
    const SPORTS_CHANNELS = [
    {
      id: "6943e7dc182a4a3d2bcd3c10",
      title: "Barça TV",
      category: "football",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6943e7dc182a4a3d2bcd3c10",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2026/01/topbarca-channel-v1.jpg",
      description: "Stream Barça TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "67e2fb3e548ae02169c017c4",
      title: "Pac-12 Network",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=67e2fb3e548ae02169c017c4",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/04/pac12v4-channel.jpg",
      description: "Stream Pac-12 Network live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "67194fc6034005e8aa716e3b",
      title: "Golf News TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=67194fc6034005e8aa716e3b",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/golf-news-channel-683x1024-reduced.jpg",
      description: "Stream Golf News TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bfec4c09eba5ff39e479",
      title: "FITE 24/7",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bfec4c09eba5ff39e479",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-Fite24-7-683x1024-reduced.jpg",
      description: "Stream FITE 24/7 live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b6c2bc38196c09596830",
      title: "WPT Live",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b6c2bc38196c09596830",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/wptliveavatar-683x1024-reduced.jpg",
      description: "Stream WPT Live live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675c17f073469c082cb2b03",
      title: "Foosball TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675c17f073469c082cb2b03",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-FoosballTV-683x1024-reduced.jpg",
      description: "Stream Foosball TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675c0bb7f512eb266c46f0f",
      title: "Lacrosse TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675c0bb7f512eb266c46f0f",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-LacrosseTV-683x1024-reduced.jpg",
      description: "Stream Lacrosse TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b8bb2916d97ce3c66c0f",
      title: "Perfect Game TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b8bb2916d97ce3c66c0f",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-PerfectGameTV-683x1024-reduced.jpg",
      description: "Stream Perfect Game TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b7bda139017a32428e74",
      title: "SportsGrid 2",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b7bda139017a32428e74",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/12/sportsgrid2-channel.jpg",
      description: "Stream SportsGrid 2 live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bddf08ff831167bd410d",
      title: "World Poker Tour",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bddf08ff831167bd410d",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-WPT-683x1024-reduced.jpg",
      description: "Stream World Poker Tour live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6663176e6303503e39621403",
      title: "Poker Night in America",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6663176e6303503e39621403",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-PokerNight-683x1024-reduced.jpg",
      description: "Stream Poker Night in America live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bd8b7f512eb266c46d5a",
      title: "Extreme Sports Channel",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bd8b7f512eb266c46d5a",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/04/extreme-channel.jpg",
      description: "Stream Extreme Sports Channel live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b51e33d0e31efc11febd",
      title: "Horse & Country TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b51e33d0e31efc11febd",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-H_C-683x1024-reduced.jpg",
      description: "Stream Horse & Country TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b734a3f2191ee5161c2d",
      title: "Choppertown TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b734a3f2191ee5161c2d",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-Choppertown-683x1024-reduced.jpg",
      description: "Stream Choppertown TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b8b426d7aa9a5450a849",
      title: "Hard Knocks",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b8b426d7aa9a5450a849",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-HardKnocks-683x1024-reduced.jpg",
      description: "Stream Hard Knocks live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bcdd2916d97ce3c66e5b",
      title: "Wired2Fish TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bcdd2916d97ce3c66e5b",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-Wired2Fish-683x1024-reduced.jpg",
      description: "Stream Wired2Fish TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "67211ecffdfa695967a9143d",
      title: "Racer Select",
      category: "motorsport",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=67211ecffdfa695967a9143d",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/04/racer-select-channel.jpg",
      description: "Stream Racer Select live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bbb3a139017a3242909e",
      title: "Racer International",
      category: "motorsport",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bbb3a139017a3242909e",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/04/racer-int-channel.jpg",
      description: "Stream Racer International live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "666318a8a2498f66a3603397",
      title: "NHRA TV",
      category: "motorsport",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=666318a8a2498f66a3603397",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-NHRA-683x1024-reduced.jpg",
      description: "Stream NHRA TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "68a3913636cf1d83afe35072",
      title: "eClutch Esports",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=68a3913636cf1d83afe35072",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/08/eclutch-channel.jpg",
      description: "Stream eClutch Esports live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bae1d823954d12bb5b44",
      title: "RPM Motorsport",
      category: "motorsport",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bae1d823954d12bb5b44",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-RPMmotorsport-683x1024-reduced.jpg",
      description: "Stream RPM Motorsport live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bc0089524b38dbf58292",
      title: "Motorsport1",
      category: "motorsport",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bc0089524b38dbf58292",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/mtrspt1-channel-683x1024-reduced.jpg",
      description: "Stream Motorsport1 live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "681a52869fef78f6ddd6753d",
      title: "My Padel Channel",
      category: "tennis",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=681a52869fef78f6ddd6753d",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/05/my-padel-channel.jpg",
      description: "Stream My Padel Channel live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6761eb6e560259210963313e",
      title: "MoreU Channel",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6761eb6e560259210963313e",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/12/moreu-channel.jpg",
      description: "Stream MoreU Channel live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bd20e1827c8af5d7a7c0",
      title: "Sports Illustrated TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bd20e1827c8af5d7a7c0",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/09/sports-ill-channel.jpg",
      description: "Stream Sports Illustrated TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bed4a2823e9a829eda97",
      title: "Motorvision TV",
      category: "motorsport",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bed4a2823e9a829eda97",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-MotorvisionTV-683x1024-reduced.jpg",
      description: "Stream Motorvision TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "687a783e928ee2ca866b7faa",
      title: "Tennis TV",
      category: "tennis",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=687a783e928ee2ca866b7faa",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/09/tennis-tv-channel.jpg",
      description: "Stream Tennis TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "666317fa213e560d3ddc5b56",
      title: "Tennis Channel",
      category: "tennis",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=666317fa213e560d3ddc5b56",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-TennisChannel-683x1024-reduced.jpg",
      description: "Stream Tennis Channel live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "68114951dc7bfd176ab1044f",
      title: "GINX Esports TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=68114951dc7bfd176ab1044f",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/04/ginx-channel.jpg",
      description: "Stream GINX Esports TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675be6a0485604f67e34186",
      title: "Strongman Champions League",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675be6a0485604f67e34186",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-Strongman-683x1024-reduced.jpg",
      description: "Stream Strongman Champions League live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "67acd478af7d4a4aef9c3354",
      title: "MMA Channel",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=67acd478af7d4a4aef9c3354",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/02/mma-channel.jpg",
      description: "Stream MMA Channel live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bb584629276717291b17",
      title: "MVMT TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bb584629276717291b17",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/mvmt-channel-683x1024-reduced.jpg",
      description: "Stream MVMT TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bbf37f512eb266c46c82",
      title: "Fight Network",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bbf37f512eb266c46c82",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-FightNetwork-683x1024-reduced.jpg",
      description: "Stream Fight Network live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "67ad38735451dfa36d3d3d1a",
      title: "GoPro Channel",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=67ad38735451dfa36d3d3d1a",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/02/gopro-channel.jpg",
      description: "Stream GoPro Channel live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bb562916d97ce3c66d67",
      title: "Impact Wrestling",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bb562916d97ce3c66d67",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-Impact-683x1024-reduced.jpg",
      description: "Stream Impact Wrestling live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bd5ba2823e9a829ed9d9",
      title: "PokerGO",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bd5ba2823e9a829ed9d9",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-PokerGO-683x1024-reduced.jpg",
      description: "Stream PokerGO live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b91de1827c8af5d7a544",
      title: "PowerSports TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b91de1827c8af5d7a544",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/01/powersports-channel.jpg",
      description: "Stream PowerSports TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675ba23a139017a32428faa",
      title: "Fuel TV",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675ba23a139017a32428faa",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-FuelTV-683x1024-reduced.jpg",
      description: "Stream Fuel TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675c08cd0ea16d1c73ad39d",
      title: "WPT Spain",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675c08cd0ea16d1c73ad39d",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-WPTSpain-1-683x1024-reduced.jpg",
      description: "Stream WPT Spain live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b85a7620a64769e3a926",
      title: "Cornhole TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b85a7620a64769e3a926",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-CornholeTV-683x1024-reduced.jpg",
      description: "Stream Cornhole TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b9974c09eba5ff39e005",
      title: "inTrouble TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/live-guide/e/live-guide?channel=6675b9974c09eba5ff39e005",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-Introuble-683x1024-reduced.jpg",
      description: "Stream inTrouble TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6849b955d58379ecd0a5371e",
      title: "DFB TV",
      category: "football",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6849b955d58379ecd0a5371e",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/06/dfb-channel.jpg",
      description: "Stream DFB TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bc9450bec7ad1dd144e8",
      title: "World Surf League (WSL)",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bc9450bec7ad1dd144e8",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/11/wsl-channel-v2.jpg",
      description: "Stream World Surf League (WSL) live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "66631a6b68357e70058f62ca",
      title: "SurfCinema",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/live-guide/e/live-guide?channel=66631a6b68357e70058f62ca",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2025/06/surfcin-channel.jpg",
      description: "Stream SurfCinema live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bad59db1ef77befe9837",
      title: "Trace Sport Stars",
      category: "motorsport",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bad59db1ef77befe9837",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-TraceSportStars-683x1024-reduced.jpg",
      description: "Stream Trace Sport Stars live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675bf6cb464f958050c8dcc",
      title: "Kozoom TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675bf6cb464f958050c8dcc",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-Kozoom-683x1024-reduced.jpg",
      description: "Stream Kozoom TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "66631956055826f5809baa95",
      title: "PFL (Professional Fighters League)",
      category: "action",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=66631956055826f5809baa95",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-PFL-683x1024-reduced.jpg",
      description: "Stream PFL (Professional Fighters League) live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "69c09acff33f2bb295ae7d7d",
      title: "Eurovision Sports",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=69c09acff33f2bb295ae7d7d",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2026/03/eurovision-channel.jpg",
      description: "Stream Eurovision Sports live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675b93433d0e31efc120124",
      title: "Omstars TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675b93433d0e31efc120124",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-OmstarsTV-683x1024-reduced.jpg",
      description: "Stream Omstars TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "6675c1ce0485604f67e34409",
      title: "Hunt & Fish TV",
      category: "other",
      streamUrl: "https://watch.freelivesports.tv/pages/discover/e/live-tv?channel=6675c1ce0485604f67e34409",
      logo: "https://www.freelivesports.tv/wp-content/uploads/2024/11/channels-HuntFishTV-683x1024-reduced.jpg",
      description: "Stream Hunt & Fish TV live and on-demand on Moiz Live Sports. Premium coverage powered by FreeLiveSports.tv.",
      backdrop: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  // ── DOM HELPERS ──
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

  // ── DOM REFS ──
  const profileScreen = $('#profile-screen');
  const profileGrid = $('#profile-grid');
  const addProfileBtn = $('#add-profile-btn');
  const addProfileModal = $('#add-profile-modal');
  const addProfileBackdrop = $('#add-profile-backdrop');
  const addProfileClose = $('#add-profile-close');
  const avatarPreview = $('#avatar-preview');
  const newProfileName = $('#new-profile-name');
  const avatarPicker = $('#avatar-picker');
  const saveProfileBtn = $('#save-profile-btn');
  const kidProfileCheckbox = $('#kid-profile-checkbox');
  const app = $('#app');
  const navbar = $('#navbar');
  const navbarAvatar = $('#navbar-avatar');
  const navAvatarContainer = $('#nav-avatar-container');
  const avatarDropdown = $('#avatar-dropdown');
  const switchProfilesBtn = $('#switch-profiles-btn');
  const navNotifContainer = $('#nav-notif-container');
  const notifDropdown = $('#notif-dropdown');
  const heroMyListBtn = $('#hero-mylist-btn');
  const hero = $('#hero');
  const heroTitle = $('#hero-title');
  const heroDesc = $('#hero-desc');
  const heroPlayBtn = $('#hero-play-btn');
  const heroInfoBtn = $('#hero-info-btn');
  const searchBar = $('#search-bar');
  const searchToggle = $('#search-toggle');
  const searchInput = $('#search-input');
  const searchClear = $('#search-clear');
  const searchResults = $('#search-results');
  const searchHeading = $('#search-results-heading');
  const searchGrid = $('#search-results-grid');
  const rowsContainer = $('#rows-container');
  const loadingSpinner = $('#loading-spinner');
  const infoModal = $('#info-modal');
  const infoBackdrop = $('#info-modal-backdrop');
  const infoClose = $('#info-modal-close');
  const infoPoster = $('#info-modal-poster');
  const infoTitle = $('#info-modal-title');
  const infoMeta = $('#info-modal-meta');
  const infoOverview = $('#info-modal-overview');
  const infoPlay = $('#info-modal-play');
  const infoListBtn = $('#info-modal-list');
  const playerOverlay = $('#player-overlay');
  const playerClose = $('#player-close');
  const playerTitle = $('#player-title');
  const playerLoader = $('#player-loader');
  const iframeContainer = $('#iframe-container');
  const serverPicker = $('#server-picker');
  const tvControls = $('#tv-controls');
  const tvSeasonInput = $('#tv-season');
  const tvEpisodeInput = $('#tv-episode');
  const tvGoBtn = $('#tv-go');
  const tvPrevBtn = $('#tv-prev');
  const tvNextBtn = $('#tv-next');
  const cropBtn = $('#crop-btn');
  const infoEpisodesList = $('#info-episodes-list');
  let currentTvSeason = 1;
  let currentTvEpisode = 1;
  let currentEmbedIdx = 0;
  let currentPlayingMovie = null;
  let isAutoServer = localStorage.getItem('moiz_auto_server') === 'true';
  const EMBED_SOURCES = [
    { name: 'Moiz 4K Ultra', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}` : `https://vidsrc.cc/v2/embed/movie/${id}` },
    { name: 'Moiz Pro', getUrl: (id, isTv, s, e) => isTv ? `https://vidlink.pro/tv/${id}/${s}/${e}` : `https://vidlink.pro/movie/${id}` },
    { name: 'Moiz Auto', getUrl: (id, isTv, s, e) => isTv ? `https://autoembed.to/tv/tmdb/${id}-${s}-${e}` : `https://autoembed.to/movie/tmdb/${id}` },
    { name: 'Moiz Embed', getUrl: (id, isTv, s, e) => isTv ? `https://embed.su/embed/tv/${id}/${s}/${e}` : `https://embed.su/embed/movie/${id}` },
    { name: 'Moiz Net', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.net/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.net/embed/movie?tmdb=${id}` },
    { name: 'Moiz Stream', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.to/embed/tv/${id}/${s}/${e}` : `https://vidsrc.to/embed/movie/${id}` },
    { name: 'Moiz XYZ', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.xyz/embed/tv/${id}/${s}/${e}` : `https://vidsrc.xyz/embed/movie/${id}` },
    { name: 'Moiz ME', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.me/embed/tv?tmdb=${id}&season=${s}&episode=${e}` : `https://vidsrc.me/embed/movie?tmdb=${id}` },
    { name: 'Moiz Smashy', getUrl: (id, isTv, s, e) => isTv ? `https://embed.smashystream.com/playere.php?tmdb=${id}&s=${s}&e=${e}` : `https://embed.smashystream.com/playere.php?tmdb=${id}` },
    { name: 'Moiz Multi', getUrl: (id, isTv, s, e) => isTv ? `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${s}&e=${e}` : `https://multiembed.mov/?video_id=${id}&tmdb=1` },
    { name: 'Moiz 2Embed', getUrl: (id, isTv, s, e) => isTv ? `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}` : `https://www.2embed.cc/embed/${id}` },
    { name: 'Moiz Club', getUrl: (id, isTv, s, e) => isTv ? `https://moviesapi.club/tv/${id}-${s}-${e}` : `https://moviesapi.club/movie/${id}` },
    { name: 'Moiz Super', getUrl: (id, isTv, s, e) => isTv ? `https://superembed.cc/embed/tv/${id}/${s}/${e}` : `https://superembed.cc/embed/movie/${id}` },
    { name: 'Moiz VidKing', getUrl: (id, isTv, s, e) => isTv ? `https://www.vidking.net/embed/tv/${id}/${s}/${e}` : `https://www.vidking.net/embed/movie/${id}` },
    { name: 'Moiz Videasy', getUrl: (id, isTv, s, e) => isTv ? `https://player.videasy.net/tv/${id}/${s}/${e}` : `https://player.videasy.net/movie/${id}` },
    { name: 'Moiz Binge', getUrl: (id, isTv, s, e) => isTv ? `https://vidbinge.dev/embed/tv/${id}/${s}/${e}` : `https://vidbinge.dev/embed/movie/${id}` },
    { name: 'Moiz Nonton', getUrl: (id, isTv, s, e) => isTv ? `https://nontongo.win/embed/tv/${id}/${s}/${e}` : `https://nontongo.win/embed/movie/${id}` },
    { name: 'Moiz Player', getUrl: (id, isTv, s, e) => isTv ? `https://player.smashy.stream/tv/${id}?s=${s}&e=${e}` : `https://player.smashy.stream/movie/${id}` },
    { name: 'Moiz ICU', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.icu/embed/tv/${id}/${s}/${e}` : `https://vidsrc.icu/embed/movie/${id}` },
    { name: 'Moiz RIP', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.rip/embed/tv/${id}/${s}/${e}` : `https://vidsrc.rip/embed/movie/${id}` },
    { name: 'Moiz 111', getUrl: (id, isTv, s, e) => isTv ? `https://111movies.com/tv/${id}/${s}/${e}` : `https://111movies.com/movie/${id}` },
    { name: 'Moiz FR', getUrl: (id, isTv, s, e) => isTv ? `https://frembed.pro/api/tv/${id}/${s}/${e}` : `https://frembed.pro/api/movie/${id}` },
    { name: 'Moiz VIP', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.vip/embed/tv/${id}/${s}/${e}` : `https://vidsrc.vip/embed/movie/${id}` },
    { name: 'Moiz Fast', getUrl: (id, isTv, s, e) => isTv ? `https://vidfast.pro/tv/${id}/${s}/${e}` : `https://vidfast.pro/movie/${id}` },
    { name: 'Moiz Nova', getUrl: (id, isTv, s, e) => isTv ? `https://nova.movie/embed/tv/${id}/${s}/${e}` : `https://nova.movie/embed/movie/${id}` },
    { name: 'Moiz Flix', getUrl: (id, isTv, s, e) => isTv ? `https://flicky.host/embed/tv/?id=${id}&s=${s}&e=${e}` : `https://flicky.host/embed/movie/?id=${id}` },
    { name: 'Moiz Hydra', getUrl: (id, isTv, s, e) => isTv ? `https://hydrahd.com/embed/tv/${id}/${s}/${e}` : `https://hydrahd.com/embed/movie/${id}` },
    { name: 'Moiz Wave', getUrl: (id, isTv, s, e) => isTv ? `https://wavestream.is/embed/tv/${id}/${s}/${e}` : `https://wavestream.is/embed/movie/${id}` },
    { name: 'Moiz Core', getUrl: (id, isTv, s, e) => isTv ? `https://vidsrc.core.stream/embed/tv/${id}/${s}/${e}` : `https://vidsrc.core.stream/embed/movie/${id}` },
    { name: 'Moiz Ninja', getUrl: (id, isTv, s, e) => isTv ? `https://embed.ninja/tv/${id}/${s}/${e}` : `https://embed.ninja/movie/${id}` },
  ];
  const profileLangBtn = $('#profile-lang-btn');
  const profileLangMenu = $('#profile-lang-menu');
  const profileLangLabel = $('#profile-lang-label');
  const navLangBtn = $('#nav-lang-btn');
  const navLangMenu = $('#nav-lang-menu');
  const navLangLabel = $('#nav-lang-label');

  const settingsBtn = $('#nav-settings-btn');
  const settingsModal = $('#settings-modal');
  const settingsBackdrop = $('#settings-modal-backdrop');
  const settingsClose = $('#settings-modal-close');
  const themeSelect = $('#settings-theme');
  const cursorSelect = $('#settings-cursor');
  const particlesSelect = $('#settings-particles');
  const animSpeedSelect = $('#settings-anim-speed');
  const glassSelect = $('#settings-glass');
  const serverPrefSelect = $('#settings-server-pref');
  const watermarkCheck = $('#settings-watermark');
  const clearHistoryBtn = $('#clear-history-btn');
  const customCursor = $('#custom-cursor');
  const infoTvSelection = $('#info-modal-tv-selection');
  const infoSeasonSelect = $('#info-season-select');
  const infoEpisodeSelect = $('#info-episode-select');
  const accountSettingsBtn = $('#account-settings-btn');
  const bgCanvas = $('#bg-canvas');
  let particleInterval;
  let bgCtx;
  if (bgCanvas) bgCtx = bgCanvas.getContext('2d');

  // ═══════ SETTINGS & THEMES ═══════
  function loadSettings() {
    if (serverPrefSelect) {
      serverPrefSelect.innerHTML = EMBED_SOURCES.map((src, idx) => 
        `<option value="${idx}">${src.name}</option>`
      ).join('');
    }
    const theme = localStorage.getItem('moiz_theme') || 'default';
    const cursor = localStorage.getItem('moiz_cursor') || 'neon-dot';
    const particles = localStorage.getItem('moiz_particles') || 'none';
    const animSpeed = localStorage.getItem('moiz_anim_speed') || 'normal';
    const glass = localStorage.getItem('moiz_glass') || 'med';
    const serverPref = localStorage.getItem('moiz_server_pref') || '0';
    const showWatermark = localStorage.getItem('moiz_watermark') !== 'false';
    
    if (themeSelect) themeSelect.value = theme;
    if (cursorSelect) cursorSelect.value = cursor;
    if (particlesSelect) particlesSelect.value = particles;
    if (animSpeedSelect) animSpeedSelect.value = animSpeed;
    if (glassSelect) glassSelect.value = glass;
    if (serverPrefSelect) serverPrefSelect.value = serverPref;
    if (watermarkCheck) watermarkCheck.checked = showWatermark;
    
    applySettings(theme, cursor, particles, animSpeed, glass, showWatermark);
  }

  function applySettings(theme, cursor, particles, animSpeed, glass, showWatermark) {
    document.body.classList.remove('theme-cyberpunk', 'theme-netflix-chill', 'theme-dracula', 'theme-forest', 'theme-gold', 'theme-ocean', 'theme-sunset');
    if (theme !== 'default') document.body.classList.add('theme-' + theme);

    document.body.classList.remove('anim-fast', 'anim-normal', 'anim-slow', 'anim-buttery');
    document.body.classList.add('anim-' + animSpeed);

    document.body.classList.remove('glass-low', 'glass-med', 'glass-high', 'glass-ultra');
    document.body.classList.add('glass-' + glass);

    const watermark = $('.moiz-watermark');
    if (watermark) watermark.classList.toggle('hidden', !showWatermark);
    
    // Theme defaults
    if (theme === 'netflix-chill') { particles = 'rain'; cursor = 'default'; }
    else if (theme === 'dracula') { particles = 'fireflies'; cursor = 'hollow-dot'; }
    else if (theme === 'forest') { particles = 'matrix'; cursor = 'crosshair'; }
    else if (theme === 'cyberpunk') { particles = 'stars'; cursor = 'neon-dot'; }
    else if (theme === 'gold') { particles = 'snow'; cursor = 'ring'; }
    else if (theme === 'ocean') { particles = 'rain'; cursor = 'ring'; }
    else if (theme === 'sunset') { particles = 'fireflies'; cursor = 'pulse'; }
    
    document.body.classList.toggle('custom-cursor-active', cursor !== 'default');
    if (customCursor) {
      customCursor.className = 'custom-cursor';
      if (cursor !== 'default') {
        customCursor.classList.add('cursor-' + cursor);
        customCursor.classList.remove('hidden');
      } else {
        customCursor.classList.add('hidden');
      }
    }
    
    startParticles(particles);
  }

  if (settingsBtn) settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
    settingsBackdrop.classList.remove('hidden');
  });
  
  function closeSettings() {
    settingsModal.classList.add('hidden');
    settingsBackdrop.classList.add('hidden');
  }
  if (settingsClose) settingsClose.addEventListener('click', closeSettings);
  if (settingsBackdrop) settingsBackdrop.addEventListener('click', closeSettings);
  
  [themeSelect, cursorSelect, particlesSelect, animSpeedSelect, glassSelect, serverPrefSelect].forEach(el => {
    if (el) el.addEventListener('change', () => {
      localStorage.setItem('moiz_theme', themeSelect.value);
      localStorage.setItem('moiz_cursor', cursorSelect.value);
      localStorage.setItem('moiz_particles', particlesSelect.value);
      localStorage.setItem('moiz_anim_speed', animSpeedSelect.value);
      localStorage.setItem('moiz_glass', glassSelect.value);
      localStorage.setItem('moiz_server_pref', serverPrefSelect.value);
      applySettings(themeSelect.value, cursorSelect.value, particlesSelect.value, animSpeedSelect.value, glassSelect.value, watermarkCheck.checked);
    });
  });

  if (watermarkCheck) {
    watermarkCheck.addEventListener('change', () => {
      localStorage.setItem('moiz_watermark', watermarkCheck.checked);
      applySettings(themeSelect.value, cursorSelect.value, particlesSelect.value, animSpeedSelect.value, glassSelect.value, watermarkCheck.checked);
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your watch history? This cannot be undone.')) {
        if (currentProfile) {
          currentProfile.recentlyWatched = [];
          const profiles = getProfiles();
          const pIdx = profiles.findIndex(p => p.name === currentProfile.name);
          if (pIdx !== -1) {
            profiles[pIdx].recentlyWatched = [];
            saveProfiles(profiles);
          }
          alert('Watch history cleared!');
          if (currentCategoryFilter === 'home') initDashboard();
        }
      }
    });
  }

  let lastX = 0, lastY = 0;
  document.addEventListener('mousemove', e => {
    if (customCursor && document.body.classList.contains('custom-cursor-active')) {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
      
      if (customCursor.classList.contains('cursor-fluid')) {
        const deltaX = Math.abs(e.clientX - lastX);
        const deltaY = Math.abs(e.clientY - lastY);
        if (deltaX > 2 || deltaY > 2) {
          customCursor.classList.add('moving');
          const angle = Math.atan2(e.clientY - lastY, e.clientX - lastX) * (180 / Math.PI);
          customCursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        } else {
          customCursor.classList.remove('moving');
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });
  document.addEventListener('mousedown', () => { if (customCursor) customCursor.classList.add('clicking'); });
  document.addEventListener('mouseup', () => { if (customCursor) customCursor.classList.remove('clicking'); });

  function makeDraggable(el, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (!handle) return;
    handle.onmousedown = (e) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      // Convert current position to pixels to avoid jumps
      const rect = el.getBoundingClientRect();
      el.style.top = rect.top + "px";
      el.style.left = rect.left + "px";
      el.style.transform = "none";
      el.style.margin = "0";
      el.style.position = "fixed";

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
      document.onmousemove = (e) => {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
      };
    };
  }

  const settingsHeader = $('#settings-modal-header');
  if (settingsModal && settingsHeader) makeDraggable(settingsModal, settingsHeader);

  function startParticles(type) {
    if (particleInterval) clearInterval(particleInterval);
    if (!bgCanvas || !bgCtx || type === 'none') {
      if (bgCtx) bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
      return;
    }
    
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    const w = bgCanvas.width;
    const h = bgCanvas.height;
    let particlesArray = [];
    
    if (type === 'rain') {
      for (let i = 0; i < 150; i++) particlesArray.push({ x: Math.random() * w, y: Math.random() * h, l: Math.random() * 1 + 1, xs: -4 + Math.random() * 4 + 2, ys: Math.random() * 10 + 20 });
      particleInterval = setInterval(() => {
        bgCtx.clearRect(0, 0, w, h);
        bgCtx.strokeStyle = 'rgba(174,194,224,0.5)';
        bgCtx.lineWidth = 1;
        bgCtx.lineCap = 'round';
        bgCtx.beginPath();
        for (let i = 0; i < particlesArray.length; i++) {
          let p = particlesArray[i];
          bgCtx.moveTo(p.x, p.y);
          bgCtx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
          p.x += p.xs;
          p.y += p.ys;
          if (p.x > w || p.y > h) { p.x = Math.random() * w; p.y = -20; }
        }
        bgCtx.stroke();
      }, 30);
    } else if (type === 'stars') {
      for (let i = 0; i < 100; i++) particlesArray.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5, d: Math.random() * 100 });
      let angle = 0;
      particleInterval = setInterval(() => {
        bgCtx.clearRect(0, 0, w, h);
        bgCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        bgCtx.beginPath();
        angle += 0.01;
        for (let i = 0; i < particlesArray.length; i++) {
          let p = particlesArray[i];
          bgCtx.moveTo(p.x, p.y);
          bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
          p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
          p.x += Math.sin(angle) * 2;
          if (p.x > w + 5 || p.x < -5 || p.y > h) {
            if (i % 3 > 0) { particlesArray[i] = { x: Math.random() * w, y: -10, r: p.r, d: p.d }; } 
            else { if (Math.sin(angle) > 0) particlesArray[i] = { x: -5, y: Math.random() * h, r: p.r, d: p.d }; else particlesArray[i] = { x: w + 5, y: Math.random() * h, r: p.r, d: p.d }; }
          }
        }
        bgCtx.fill();
      }, 33);
    } else if (type === 'snow') {
      for (let i = 0; i < 200; i++) particlesArray.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 3 + 1, d: Math.random() * 100 });
      let angle = 0;
      particleInterval = setInterval(() => {
        bgCtx.clearRect(0, 0, w, h);
        bgCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        bgCtx.beginPath();
        angle += 0.01;
        for (let i = 0; i < particlesArray.length; i++) {
          let p = particlesArray[i];
          bgCtx.moveTo(p.x, p.y);
          bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
          p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
          p.x += Math.sin(angle) * 1;
          if (p.x > w + 5 || p.x < -5 || p.y > h) {
            if (i % 3 > 0) particlesArray[i] = { x: Math.random() * w, y: -10, r: p.r, d: p.d };
            else if (Math.sin(angle) > 0) particlesArray[i] = { x: -5, y: Math.random() * h, r: p.r, d: p.d };
            else particlesArray[i] = { x: w + 5, y: Math.random() * h, r: p.r, d: p.d };
          }
        }
        bgCtx.fill();
      }, 30);
    } else if (type === 'matrix') {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i = 0; i < 150; i++) particlesArray.push({ x: Math.random() * w, y: Math.random() * h, s: Math.random() * 5 + 5, c: chars[Math.floor(Math.random() * chars.length)] });
      bgCtx.font = '14px monospace';
      particleInterval = setInterval(() => {
        bgCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        bgCtx.fillRect(0, 0, w, h);
        bgCtx.fillStyle = 'rgba(0, 255, 85, 0.8)';
        for (let i = 0; i < particlesArray.length; i++) {
          let p = particlesArray[i];
          bgCtx.fillText(p.c, p.x, p.y);
          p.y += p.s;
          if (Math.random() > 0.98) p.c = chars[Math.floor(Math.random() * chars.length)];
          if (p.y > h) { p.y = 0; p.x = Math.random() * w; }
        }
      }, 50);
    } else if (type === 'fireflies') {
      for (let i = 0; i < 60; i++) particlesArray.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 1, xs: Math.random() * 2 - 1, ys: Math.random() * -2 - 0.5 });
      particleInterval = setInterval(() => {
        bgCtx.clearRect(0, 0, w, h);
        bgCtx.fillStyle = 'rgba(255, 223, 0, 0.8)';
        bgCtx.shadowBlur = 15;
        bgCtx.shadowColor = 'rgba(255, 223, 0, 1)';
        bgCtx.beginPath();
        for (let i = 0; i < particlesArray.length; i++) {
          let p = particlesArray[i];
          bgCtx.moveTo(p.x, p.y);
          bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
          p.x += p.xs + (Math.random() * 0.5 - 0.25);
          p.y += p.ys;
          if (p.x < 0 || p.x > w || p.y < 0) {
            p.x = Math.random() * w;
            p.y = h + 10;
          }
        }
        bgCtx.fill();
        bgCtx.shadowBlur = 0;
      }, 40);
    }
  }
  window.addEventListener('resize', () => {
    if (bgCanvas && particlesSelect && particlesSelect.value !== 'none') {
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    }
  });

  // ═══════ i18n ═══════
  function t(key) { return (LANG[currentLang] || LANG.en)[key] || (LANG.en)[key] || key; }

  function applyLanguage() {
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    const code = currentLang.toUpperCase();
    profileLangLabel.textContent = code;
    navLangLabel.textContent = code;
    $$('.lang-selector__menu li').forEach(li => {
      li.classList.toggle('active', li.dataset.lang === currentLang);
    });
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('moiz_lang', lang);
    applyLanguage();
    $$('.row__title[data-genre-key]').forEach(el => {
      el.childNodes[0].textContent = t(el.dataset.genreKey);
    });
    profileLangMenu.classList.add('hidden');
    navLangMenu.classList.add('hidden');
  }

  function setupLangMenus() {
    [profileLangBtn, navLangBtn].forEach((btn, i) => {
      const menu = i === 0 ? profileLangMenu : navLangMenu;
      btn.addEventListener('click', e => { e.stopPropagation(); menu.classList.toggle('hidden'); });
    });
    $$('.lang-selector__menu li').forEach(li => {
      li.addEventListener('click', () => setLang(li.dataset.lang));
    });
    
    $$('.lang-selector__menu li').forEach(li => {
      li.addEventListener('click', () => setLang(li.dataset.lang));
    });

    document.addEventListener('click', () => {
      profileLangMenu.classList.add('hidden');
      navLangMenu.classList.add('hidden');
    });
  }

  // ═══════ PROFILES (localStorage) ═══════
  function getProfiles() {
    try { return JSON.parse(localStorage.getItem('moiz_profiles')) || []; }
    catch { return []; }
  }
  function saveProfiles(p) { localStorage.setItem('moiz_profiles', JSON.stringify(p)); }

  function isInMyList(movieId) {
    return currentProfile && currentProfile.myList && currentProfile.myList.some(m => m.id === movieId);
  }

  function toggleMyList(movie) {
    if (!currentProfile) return false;
    const profiles = getProfiles();
    const pIdx = profiles.findIndex(p => p.name === currentProfile.name);
    if (pIdx === -1) return false;
    if (!profiles[pIdx].myList) profiles[pIdx].myList = [];
    
    const exists = profiles[pIdx].myList.findIndex(m => m.id === movie.id);
    let added = false;
    if (exists > -1) {
      profiles[pIdx].myList.splice(exists, 1);
    } else {
      profiles[pIdx].myList.push(movie);
      added = true;
    }
    saveProfiles(profiles);
    currentProfile = profiles[pIdx];
    return added;
  }

  function addToRecentlyWatched(movie) {
    if (!currentProfile) return;
    const profiles = getProfiles();
    const pIdx = profiles.findIndex(p => p.name === currentProfile.name);
    if (pIdx === -1) return;
    if (!profiles[pIdx].recentlyWatched) profiles[pIdx].recentlyWatched = [];
    
    // Remove if already exists to move to front
    const exists = profiles[pIdx].recentlyWatched.findIndex(m => m.id === movie.id);
    if (exists > -1) {
      profiles[pIdx].recentlyWatched.splice(exists, 1);
    } else {
      // Only add notification for new watches
      const posterImg = movie.poster_path ? TMDB_IMG + 'w200' + movie.poster_path : null;
      if (typeof addNotification === 'function') {
        addNotification('Now Playing', movie.title || movie.name || 'Unknown', posterImg);
      }
    }
    
    // Add to front
    profiles[pIdx].recentlyWatched.unshift(movie);
    
    // Limit to 20 items
    if (profiles[pIdx].recentlyWatched.length > 20) {
      profiles[pIdx].recentlyWatched.pop();
    }
    
    saveProfiles(profiles);
    currentProfile = profiles[pIdx];
  }


  function ensureDefaults() {
    if (getProfiles().length === 0) {
      saveProfiles([
        { name: 'Alex', avatar: DEFAULT_AVATARS[0], myList: [], recentlyWatched: [] },
        { name: 'Jordan', avatar: DEFAULT_AVATARS[1], myList: [], recentlyWatched: [] },
        { name: 'Riley', avatar: DEFAULT_AVATARS[5], myList: [], recentlyWatched: [] },
      ]);
    }
  }

  function avatarURL(name, customUrl) {
    if (customUrl && customUrl.startsWith('http')) return customUrl;
    return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=141414&color=fff&size=128&bold=true';
  }

  function renderProfiles() {
    const profiles = getProfiles();
    profileGrid.innerHTML = profiles.map((p, i) => `
      <div class="profile-card" data-idx="${i}" tabindex="0" role="button">
        <button class="profile-card__delete" data-delidx="${i}" title="${t('deleteConfirm')}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
        </button>
        <div class="profile-card__avatar-wrap">
          <div class="profile-card__avatar"><img src="${p.avatar}" alt="${p.name}"/></div>
          ${p.isKid ? `<div class="kids-badge">${t('kids')}</div>` : ''}
        </div>
        <span class="profile-card__name">${p.name}</span>
      </div>`).join('');

    $$('.profile-card', profileGrid).forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.profile-card__delete')) return;
        const isManaging = $('.profile-screen').classList.contains('manage-mode');
        if (isManaging) return;
        selectProfile(+card.dataset.idx);
      });
    });
    $$('.profile-card__delete', profileGrid).forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (confirm(t('deleteConfirm'))) {
          const profiles = getProfiles();
          profiles.splice(+btn.dataset.delidx, 1);
          saveProfiles(profiles);
          renderProfiles();
        }
      });
    });
  }

  // ── Add Profile Modal ──
  let selectedAvatarUrl = DEFAULT_AVATARS[0];

  function openAddProfile() {
    selectedAvatarUrl = DEFAULT_AVATARS[0];
    newProfileName.value = '';
    updateAvatarPreview('');
    renderAvatarPicker();
    addProfileModal.classList.remove('hidden');
  }
  function closeAddProfile() { addProfileModal.classList.add('hidden'); }

  function updateAvatarPreview(name) {
    avatarPreview.src = avatarURL(name || 'New', selectedAvatarUrl);
  }

  function renderAvatarPicker() {
    avatarPicker.innerHTML = DEFAULT_AVATARS.map((url, i) =>
      `<div class="avatar-picker__opt ${i === 0 ? 'selected' : ''}" data-url="${url}">
        <img src="${url}" alt="Avatar ${i}"/>
      </div>`).join('');
    $$('.avatar-picker__opt', avatarPicker).forEach(opt => {
      opt.addEventListener('click', () => {
        $$('.avatar-picker__opt', avatarPicker).forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        selectedAvatarUrl = opt.dataset.url;
        updateAvatarPreview(newProfileName.value);
      });
    });
  }

  addProfileBtn.addEventListener('click', openAddProfile);
  addProfileClose.addEventListener('click', closeAddProfile);
  addProfileBackdrop.addEventListener('click', closeAddProfile);
  newProfileName.addEventListener('input', () => updateAvatarPreview(newProfileName.value));

  saveProfileBtn.addEventListener('click', () => {
    const name = newProfileName.value.trim();
    if (!name) { newProfileName.focus(); return; }
    const isKid = kidProfileCheckbox ? kidProfileCheckbox.checked : false;
    const profiles = getProfiles();
    profiles.push({ 
      name, 
      avatar: avatarURL(name, selectedAvatarUrl), 
      myList: [], 
      recentlyWatched: [],
      isKid
    });
    saveProfiles(profiles);
    closeAddProfile();
    renderProfiles();
  });

  // ── Select Profile ──
  function selectProfile(idx) {
    const profiles = getProfiles();
    currentProfile = profiles[idx];
    
    // Reset manage mode if it was active
    if (profileScreen) {
      profileScreen.classList.remove('manage-mode');
      const manageBtn = $('#manage-profiles-btn');
      if (manageBtn) manageBtn.textContent = 'Manage Profiles';
    }

    // Smooth exit animation
    profileScreen.style.opacity = '0';
    profileScreen.style.transform = 'scale(1.01)';
    profileScreen.style.transition = 'opacity .4s ease, transform .4s ease';
    setTimeout(() => {
      profileScreen.classList.add('hidden');
      profileScreen.style.transform = '';
      app.classList.remove('hidden');
      if (navbarAvatar) navbarAvatar.style.backgroundImage = 'url(' + currentProfile.avatar + ')';
      initDashboard();
    }, 380);
  }

  // ═══════ NAVBAR DROPDOWNS & CATEGORY FILTERING ═══════
  function setupNavbar() {
    // Avatar dropdown toggle
    if (navbarAvatar) {
      navbarAvatar.addEventListener('click', e => {
        e.stopPropagation();
        if (notifDropdown) notifDropdown.classList.add('hidden');
        if (avatarDropdown) avatarDropdown.classList.toggle('hidden');
      });
    }

    if (accountSettingsBtn) {
      accountSettingsBtn.addEventListener('click', () => {
        if (settingsModal) settingsModal.classList.remove('hidden');
        if (settingsBackdrop) settingsBackdrop.classList.remove('hidden');
        if (avatarDropdown) avatarDropdown.classList.add('hidden');
      });
    }
    
    // Notification dropdown toggle
    if (navNotifContainer) {
      navNotifContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        if (avatarDropdown) avatarDropdown.classList.add('hidden');
        if (notifDropdown) notifDropdown.classList.toggle('hidden');
      });
    }
    // Close dropdowns on outside click
    document.addEventListener('click', function() {
      if (avatarDropdown) avatarDropdown.classList.add('hidden');
      if (notifDropdown) notifDropdown.classList.add('hidden');
    });
    // Switch Profiles button
    if (switchProfilesBtn) {
      switchProfilesBtn.addEventListener('click', function() {
        app.classList.add('hidden');
        profileScreen.classList.remove('hidden');
        profileScreen.style.opacity = '1';
        renderProfiles();
      });
    }
    const manageProfilesBtn = $('#manage-profiles-btn');
    if (manageProfilesBtn) {
      manageProfilesBtn.addEventListener('click', function() {
        const profileScreen = $('.profile-screen');
        if (profileScreen) {
          const isManaging = profileScreen.classList.toggle('manage-mode');
          manageProfilesBtn.textContent = isManaging ? 'Done' : 'Manage Profiles';
        }
      });
    }

    // Nav category links (Home, TV Shows, Movies, My List, Live Sports)
    $$('.navbar__links a').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        $$('.navbar__links a').forEach(function(el) { el.classList.remove('active'); });
        link.classList.add('active');
        var key = link.dataset.i18n;
        
        // Hide/Show sports screen appropriately
        const sportsScreen = $('#sports-screen');
        if (key === 'navSports' || link.id === 'nav-sports-btn' || link.getAttribute('id') === 'nav-sports-btn') {
          currentCategoryFilter = 'sports';
          // Smooth transition
          hero.style.opacity = '0';
          rowsContainer.style.opacity = '0';
          setTimeout(() => {
            if (sportsScreen) sportsScreen.classList.remove('hidden');
            const reelsScreen = $('#reels-screen');
            const musicScreen = $('#music-screen');
            if (reelsScreen) reelsScreen.classList.add('hidden');
            if (musicScreen) musicScreen.classList.add('hidden');
            if (reelsTimer) clearInterval(reelsTimer);
            hero.classList.add('hidden');
            rowsContainer.classList.add('hidden');
            searchResults.classList.add('hidden');
            hero.style.opacity = '';
            rowsContainer.style.opacity = '';
            initSportsScreen();
          }, 150);
          clearSearch();
        } else {
          if (sportsScreen) sportsScreen.classList.add('hidden');
          const reelsScreen = $('#reels-screen');
          const musicScreen = $('#music-screen');
          if (reelsScreen) reelsScreen.classList.add('hidden');
          if (musicScreen) musicScreen.classList.add('hidden');
          if (sportsHeroInterval) clearInterval(sportsHeroInterval);
          if (reelsTimer) clearInterval(reelsTimer);
          
          if (key === 'navTvShows') currentCategoryFilter = 'tv';
          else if (key === 'navMovies') currentCategoryFilter = 'movie';
          else if (key === 'navMyList') currentCategoryFilter = 'list';
          else currentCategoryFilter = 'home';
          clearSearch();
          
          if (currentCategoryFilter === 'list') {
            renderMyList();
          } else {
            initDashboard();
          }
        }
      });
    });
  }

  function renderMyList() {
    showLoading(true);
    hero.classList.add('hidden');
    rowsContainer.classList.add('hidden');
    searchResults.classList.remove('hidden');
    searchHeading.textContent = t('navMyList');
    
    const movies = (currentProfile && currentProfile.myList) ? currentProfile.myList : [];
    if (!movies.length) {
      searchGrid.innerHTML = '<p style="color:#999;grid-column:1/-1;margin-top:20px;">Your list is empty. Add movies and TV shows to see them here.</p>';
    } else {
      searchGrid.innerHTML = movies.map(m => {
        loadedMoviesMap[m.id] = m;
        const poster = m.poster_path ? posterURL(m.poster_path, 'w342') : 'https://via.placeholder.com/342x513/1a1a1a/555?text=No+Image';
        const year = (m.release_date || m.first_air_date || '').slice(0, 4);
        return '<div class="search-card" data-id="' + m.id + '">' +
          '<img class="search-card__img" src="' + poster + '" alt="' + (m.title || m.name || '') + '" loading="lazy"/>' +
          '<div class="search-card__play"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="6,3 20,12 6,21"/></svg></div>' +
          '<div class="search-card__body"><div class="search-card__title">' + (m.title || m.name || '') + '</div>' +
          '<div class="search-card__year">' + year + '</div></div></div>';
      }).join('');
    }
    showLoading(false);
  }

  // GLOBAL EVENT DELEGATION FOR ALL CARDS
  document.addEventListener('click', function(e) {
    // Add to List from Card
    var addBtn = e.target.closest('.card__add-btn');
    if (addBtn) {
      e.preventDefault();
      e.stopPropagation();
      var id = +addBtn.dataset.listId;
      var movie = loadedMoviesMap[id];
      if (movie) {
        var added = toggleMyList(movie);
        addBtn.textContent = added ? '-' : '+';
        if (currentCategoryFilter === 'list') renderMyList();
      }
      return;
    }

    var card = e.target.closest('.card');
    if (card && !e.target.closest('.row__arrow')) {
      var id = +card.dataset.id;
      var movie = loadedMoviesMap[id];
      if (!movie) return;
      if (e.target.closest('.card__play-icon')) {
        openPlayer(movie);
      } else {
        openInfoModal(movie);
      }
      return;
    }
    var searchCard = e.target.closest('.search-card');
    if (searchCard) {
      var sid = +searchCard.dataset.id;
      var sm = loadedMoviesMap[sid];
      if (!sm) return;
      if (e.target.closest('.search-card__play')) {
        openPlayer(sm);
      } else {
        openInfoModal(sm);
      }
      return;
    }
  });

  // ═══════ TMDB API ═══════
  function tmdbFetch(path, extra) {
    const sep = path.includes('?') ? '&' : '?';
    const langParam = currentLang === 'es' ? 'es-ES' : currentLang === 'fr' ? 'fr-FR' : 'en-US';
    return fetch(TMDB_BASE + path + sep + 'api_key=' + TMDB_KEY + '&language=' + langParam + (extra || ''))
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  function posterURL(path, size) {
    if (!path) return 'https://via.placeholder.com/400x225/1a1a1a/555?text=No+Image';
    return TMDB_IMG + (size || 'w500') + path;
  }
  function backdropURL(path) {
    if (!path) return 'https://via.placeholder.com/1280x720/1a1a1a/555?text=No+Image';
    return TMDB_IMG + 'original' + path;
  }

  // ═══════ DASHBOARD ═══════
  async function initDashboard() {
    setupNavbarScroll();
    showLoading(true);

    // Filter Navbar link elements depending on App Mode
    const navHomeLi = $('#nav-home-li');
    const navTvLi = $('#nav-tv-li');
    const navMoviesLi = $('#nav-movies-li');
    const navMylistLi = $('#nav-mylist-li');
    const navSportsLi = $('#nav-sports-li');

    if (appMode === 'movies') {
      if (navSportsLi) navSportsLi.classList.add('hidden');
    } else if (appMode === 'sports') {
      if (navHomeLi) navHomeLi.classList.add('hidden');
      if (navTvLi) navTvLi.classList.add('hidden');
      if (navMoviesLi) navMoviesLi.classList.add('hidden');
      if (navMylistLi) navMylistLi.classList.add('hidden');
      if (currentCategoryFilter !== 'sports') {
        currentCategoryFilter = 'sports';
      }
    }

    const sportsScreen = $('#sports-screen');

    // Handle Live Sports Mode routing redirect
    if (appMode === 'sports' || currentCategoryFilter === 'sports') {
      currentCategoryFilter = 'sports';
      hero.classList.add('hidden');
      rowsContainer.classList.add('hidden');
      searchResults.classList.add('hidden');
      if (sportsScreen) sportsScreen.classList.remove('hidden');

      // Sync active navbar element
      $$('.navbar__links a').forEach(el => {
        el.classList.remove('active');
        if (el.dataset.i18n === 'navSports' || el.id === 'nav-sports-btn') el.classList.add('active');
      });

      initSportsScreen();
      showLoading(false);
      return;
    }

    // Standard movie container routing
    if (sportsScreen) sportsScreen.classList.add('hidden');
    const reelsScreenEl = $('#reels-screen');
    const musicScreenEl = $('#music-screen');
    if (reelsScreenEl) reelsScreenEl.classList.add('hidden');
    if (musicScreenEl) musicScreenEl.classList.add('hidden');
    hero.classList.remove('hidden');
    rowsContainer.classList.remove('hidden');
    searchResults.classList.add('hidden');
    loadedMoviesMap = {};
    
    const isKid = currentProfile && currentProfile.isKid;

    try {
      let rowsToFetch = isKid ? KIDS_GENRE_ROWS.map(g => ({ ...g })) : GENRE_ROWS.map(g => ({ ...g }));
      
      if (currentCategoryFilter === 'tv') {
        rowsToFetch = rowsToFetch.map(g => ({ ...g, url: g.url.replace('/movie', '/tv') }));
        rowsToFetch[0].url = '/trending/tv/week';
      } else if (currentCategoryFilter === 'movie') {
        rowsToFetch = rowsToFetch.map(g => ({ ...g, url: g.url.replace('/tv', '/movie') }));
        rowsToFetch[0].url = '/trending/movie/week';
      }

      const [results, editorsChoiceData] = await Promise.all([
        Promise.all(
          rowsToFetch.map(g => tmdbFetch(g.url, (g.params || '')).then(d => ({ key: g.key, movies: d.results || [] })))
        ),
        tmdbFetch('/movie/367551').catch(() => null)
      ]);
      
      if (editorsChoiceData && editorsChoiceData.id) {
        const trendingIdx = results.findIndex(r => r.key === 'trendingNow');
        if (trendingIdx >= 0) {
          results.splice(trendingIdx + 1, 0, { key: 'editorsChoice', movies: [editorsChoiceData] });
        }
      }

      if ((currentCategoryFilter === 'home' || currentCategoryFilter === 'all') && currentProfile && currentProfile.recentlyWatched) {
        const validMovies = currentProfile.recentlyWatched.filter(m => m && m.id);
        if (validMovies.length > 0) {
          results.unshift({ key: 'recentlyWatched', movies: validMovies.slice(0, 10) });
        }
      }

      const trending = results.find(r => r.key === 'trendingNow');
      if (trending && trending.movies.length) {
        heroMovie = trending.movies[Math.floor(Math.random() * Math.min(5, trending.movies.length))];
        loadedMoviesMap[heroMovie.id] = heroMovie;
        renderHero(heroMovie);
      }
      renderRows(results);
    } catch (err) {
      console.error('TMDB fetch failed:', err);
      rowsContainer.innerHTML = '<p style="padding:100px 48px;color:#999;font-size:1.1rem;">Could not load movies. Please check your TMDB API key in app.js and try again.</p>';
    }
    showLoading(false);
  }

  function renderHero(movie) {
    hero.style.backgroundImage = 'url(' + backdropURL(movie.backdrop_path) + ')';
    heroTitle.textContent = movie.title || movie.name || '';
    heroDesc.textContent = movie.overview || '';
    heroPlayBtn.onclick = () => openPlayer(movie);
    heroInfoBtn.onclick = () => openInfoModal(movie);
    const heroMyListBtn = $('#hero-mylist-btn');
    if (heroMyListBtn) {
      const mylistIcon = heroMyListBtn.querySelector('.mylist-icon');
      if (mylistIcon) mylistIcon.textContent = isInMyList(movie.id) ? '-' : '+';
      heroMyListBtn.onclick = () => {
        const added = toggleMyList(movie);
        if (mylistIcon) mylistIcon.textContent = added ? '-' : '+';
        if (window.moizToast) {
          window.moizToast(added ? 'Added to My List' : 'Removed from My List', added ? 'success' : 'info', 2000);
        }
      };
    }
  }

  function renderRows(rows) {
    rowsContainer.innerHTML = '';
    rows.forEach(({ key, movies }) => {
      if (!movies.length) return;
      const isTrending = (key === 'trendingNow');
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML =
        '<h3 class="row__title" data-genre-key="' + key + '">' + t(key) + '</h3>' +
        '<div class="row__track-wrapper">' +
        '<button class="row__arrow row__arrow--left" aria-label="Scroll left">\u2039</button>' +
        '<div class="row__track">' + movies.map((m, idx) => { loadedMoviesMap[m.id] = m; return cardHTML(m, isTrending ? idx + 1 : 0); }).join('') + '</div>' +
        '<button class="row__arrow row__arrow--right" aria-label="Scroll right">\u203A</button>' +
        '</div>';
      rowsContainer.appendChild(row);

      const track = $('.row__track', row);
      const scrollAmount = Math.min(track.clientWidth * 0.75, 800);
      $('.row__arrow--left', row).addEventListener('click', () => { track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
      $('.row__arrow--right', row).addEventListener('click', () => { track.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
    });
  }

  function cardHTML(m, rank) {
    const img = m.backdrop_path ? posterURL(m.backdrop_path, 'w780') : posterURL(m.poster_path, 'w500');
    const year = (m.release_date || m.first_air_date || '').slice(0, 4);
    const rating = m.vote_average ? Math.round(m.vote_average * 10) + '%' : '';
    const ratingClass = m.vote_average >= 7 ? 'rating-high' : m.vote_average >= 5 ? 'rating-med' : 'rating-low';
    const listBtnLabel = isInMyList(m.id) ? '-' : '+';
    const rankHtml = (rank && rank <= 10) ? '<div class="card__rank">' + rank + '</div>' : '';
    return '<div class="card" data-id="' + m.id + '" tabindex="0" role="button" aria-label="' + (m.title || m.name || '') + '">' + rankHtml +
      '<img class="card__img" src="' + img + '" alt="' + (m.title || m.name || '') + '" loading="lazy" onerror="this.src=\'https://via.placeholder.com/780x440/1a1a1a/555?text=No+Image\'"/>' +
      '<div class="card__play-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="6,3 20,12 6,21"/></svg></div>' +
      '<div class="card__info"><div class="card__info-title">' + (m.title || m.name || '') + '</div>' +
      '<div class="card__info-meta"><span class="' + ratingClass + '">' + rating + (rating && year ? ' \u00b7 ' : '') + year + '</span>' + 
      '<div class="card__add-btn" data-list-id="' + m.id + '">' + listBtnLabel + '</div></div></div></div>';
  }

  // ═══════ SEARCH ═══════
  function setupSearch() {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) searchInput.focus();
      else clearSearch();
    });
    searchClear.addEventListener('click', clearSearch);
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim();
      searchClear.classList.toggle('hidden', !q);
      clearTimeout(searchDebounce);
      if (!q) { clearSearch(); return; }
      searchDebounce = setTimeout(() => performSearch(q), 300);
    });
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') clearSearch();
    });
  }

  async function performSearch(query) {
    showLoading(true);
    try {
      const data = await tmdbFetch('/search/multi?query=' + encodeURIComponent(query));
      let movies = data.results.filter(m => m.media_type === 'movie' || m.media_type === 'tv') || [];
      
      // KIDS MODE FILTER: Only family friendly, no horror/thriller/crime
      if (currentProfile && currentProfile.isKid) {
        movies = movies.filter(m => {
          if (m.adult) return false;
          if (m.genre_ids && (m.genre_ids.includes(27) || m.genre_ids.includes(53) || m.genre_ids.includes(80))) return false;
          return true;
        });
      }
      
      movies.forEach(m => { loadedMoviesMap[m.id] = m; });
      hero.classList.add('hidden');
      rowsContainer.classList.add('hidden');
      searchResults.classList.remove('hidden');
      searchHeading.textContent = t('searchResultsFor') + ' "' + query + '"';
      if (!movies.length) {
        searchGrid.innerHTML = '<p style="color:#999;grid-column:1/-1">' + t('noResults') + '</p>';
      } else {
        searchGrid.innerHTML = movies.map(m => {
          const poster = m.poster_path ? posterURL(m.poster_path, 'w342') : 'https://via.placeholder.com/342x513/1a1a1a/555?text=No+Image';
          const year = (m.release_date || '').slice(0, 4);
          return '<div class="search-card" data-id="' + m.id + '">' +
            '<img class="search-card__img" src="' + poster + '" alt="' + (m.title || '') + '" loading="lazy"/>' +
            '<div class="search-card__play"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><polygon points="6,3 20,12 6,21"/></svg></div>' +
            '<div class="search-card__body"><div class="search-card__title">' + (m.title || '') + '</div>' +
            '<div class="search-card__year">' + year + '</div></div></div>';
        }).join('');
      }
    } catch (err) {
      console.error('Search failed:', err);
      searchGrid.innerHTML = '<p style="color:#999;grid-column:1/-1">Search failed. Check API key.</p>';
    }
    showLoading(false);
  }

  function clearSearch() {
    searchInput.value = '';
    searchClear.classList.add('hidden');
    searchResults.classList.add('hidden');
    hero.classList.remove('hidden');
    rowsContainer.classList.remove('hidden');
  }

  // ═══════ NAVBAR SCROLL ═══════
  function setupNavbarScroll() {
    let ticking = false;
    const backToTop = $('#back-to-top');
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { 
          navbar.classList.toggle('navbar--scrolled', window.scrollY > 50); 
          if (backToTop) backToTop.classList.toggle('hidden', window.scrollY < 400);
          ticking = false; 
        });
        ticking = true;
      }
    }, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ═══════ INFO MODAL ═══════
  let currentInfoMovie = null;
  let currentTvDetails = null;

  async function openInfoModal(movie) {
    currentInfoMovie = movie;
    currentTvSeason = 1;
    currentTvEpisode = 1;
    const isTv = movie.media_type === 'tv' || movie.first_air_date;
    
    const bg = movie.backdrop_path ? backdropURL(movie.backdrop_path) : posterURL(movie.poster_path, 'w780');
    infoPoster.style.backgroundImage = 'url(' + bg + ')';
    infoTitle.textContent = movie.title || movie.name || '';
    const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
    const rating = movie.vote_average ? Math.round(movie.vote_average * 10) + '% Match' : '';
    infoMeta.textContent = [rating, year].filter(Boolean).join('  \u00b7  ');
    infoOverview.textContent = movie.overview || '';
    
    if (infoTvSelection) {
      if (isTv) {
        infoTvSelection.classList.remove('hidden');
        fetchTVDetails(movie.id);
      } else {
        infoTvSelection.classList.add('hidden');
      }
    }

    if (infoListBtn) {
      const isAdded = isInMyList(movie.id);
      $('.mylist-icon', infoListBtn).textContent = isAdded ? '-' : '+';
    }

    infoModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (siteFooter) siteFooter.classList.add('hidden');
  }

  async function fetchTVDetails(id) {
    try {
      const data = await tmdbFetch(`/tv/${id}`);
      currentTvDetails = data;
      renderSeasonSelect(data.seasons || []);
    } catch (err) {
      console.error('Failed to fetch TV details:', err);
    }
  }

  function renderSeasonSelect(seasons) {
    if (!infoSeasonSelect) return;
    // Filter out specials (season 0)
    const filtered = seasons.filter(s => s.season_number > 0);
    infoSeasonSelect.innerHTML = filtered.map(s => `<option value="${s.season_number}">${s.name || 'Season ' + s.season_number}</option>`).join('');
    
    if (filtered.length > 0) {
      renderEpisodeSelect(filtered[0].season_number);
    }
  }

  async function renderEpisodeSelect(seasonNum) {
    if (!infoEpisodesList || !currentInfoMovie) return;
    const episodesContainer = $('#episodes-container');
    if (!episodesContainer) return;
    infoEpisodesList.classList.remove('hidden');
    episodesContainer.innerHTML = '<div class="spinner-ring" style="margin:20px auto"></div>';
    try {
      const data = await tmdbFetch(`/tv/${currentInfoMovie.id}/season/${seasonNum}`);
      const episodes = data.episodes || [];
      episodesContainer.innerHTML = episodes.map(e => {
        const thumb = e.still_path ? posterURL(e.still_path, 'w300') : backdropURL(currentInfoMovie.backdrop_path);
        return `
          <div class="episode-card" data-season="${seasonNum}" data-episode="${e.episode_number}">
            <div class="episode-card__number">${e.episode_number}</div>
            <div class="episode-card__thumb" style="background-image: url(${thumb})"></div>
            <div class="episode-card__info">
              <div class="episode-card__title">${e.name}</div>
              <div class="episode-card__overview">${e.overview || 'No description available.'}</div>
            </div>
          </div>
        `;
      }).join('');
      
      $$('.episode-card', episodesContainer).forEach(card => {
        card.addEventListener('click', () => {
          currentTvSeason = +card.dataset.season;
          currentTvEpisode = +card.dataset.episode;
          if (tvSeasonInput) tvSeasonInput.value = currentTvSeason;
          if (tvEpisodeInput) tvEpisodeInput.value = currentTvEpisode;
          const movieToPlay = currentInfoMovie; // Capture before closing clears it
          closeInfoModal();
          openPlayer(movieToPlay);
        });
      });
    } catch (err) {
      console.error('Failed to fetch episodes:', err);
      infoEpisodesList.innerHTML = '<p style="color:#999;text-align:center">Failed to load episodes.</p>';
    }
  }

  if (infoSeasonSelect) {
    infoSeasonSelect.addEventListener('change', () => {
      renderEpisodeSelect(infoSeasonSelect.value);
    });
  }

  function closeInfoModal() {
    // Smooth close animation
    const content = $('.info-modal__content');
    if (content) {
      content.style.transform = 'scale(0.97)';
      content.style.opacity = '0';
    }
    setTimeout(() => {
      infoModal.classList.add('hidden');
      if (content) {
        content.style.transform = '';
        content.style.opacity = '';
      }
      document.body.style.overflow = '';
      currentInfoMovie = null;
      currentTvDetails = null;
      updateFooterVisibility();
    }, 200);
  }

  infoClose.addEventListener('click', closeInfoModal);
  infoBackdrop.addEventListener('click', closeInfoModal);
  infoPlay.addEventListener('click', () => {
    if (currentInfoMovie) { 
      const movieToPlay = currentInfoMovie;
      if (movieToPlay.media_type === 'tv' || movieToPlay.first_air_date) {
        currentTvSeason = parseInt(infoSeasonSelect.value) || 1;
        // Default to episode 1 if not explicitly set by clicking a card
        if (!currentTvEpisode) currentTvEpisode = 1;
        if (tvSeasonInput) tvSeasonInput.value = currentTvSeason;
        if (tvEpisodeInput) tvEpisodeInput.value = currentTvEpisode;
      }
      closeInfoModal(); 
      openPlayer(movieToPlay); 
    }
  });

  if (infoListBtn) {
    infoListBtn.addEventListener('click', () => {
      if (currentInfoMovie) {
        const added = toggleMyList(currentInfoMovie);
        $('.mylist-icon', infoListBtn).textContent = added ? '-' : '+';
        if (currentCategoryFilter === 'list') renderMyList();
      }
    });
  }

  // ═══════ MULTI-SOURCE VIDEO PLAYER ═══════
  function renderServerPicker() {
    if (!serverPicker) return;
    serverPicker.innerHTML = EMBED_SOURCES.map((src, idx) => 
      `<button class="server-btn ${idx === currentEmbedIdx ? 'active' : ''}" data-idx="${idx}">${src.name}</button>`
    ).join('');

    $$('.server-btn', serverPicker).forEach(btn => {
      btn.addEventListener('click', () => {
        currentEmbedIdx = +btn.dataset.idx;
        if (!isAutoServer) {
          localStorage.setItem('moiz_last_server', currentEmbedIdx);
        }
        loadVideoSource();
        renderServerPicker();
      });
    });
  }

  // ═══════ LIVE SPORTS SCREEN RENDER ENGINE ═══════
  let currentSportsCategory = 'all';
  let sportsHeroChannel = SPORTS_CHANNELS[0];
  let sportsHeroInterval = null;

  function initSportsScreen() {
    const sportsHero = $('#sports-hero');
    const sportsHeroTitle = $('#sports-hero-title');
    const sportsHeroDesc = $('#sports-hero-desc');
    const sportsHeroPlayBtn = $('#sports-hero-play-btn');

    // Pick a random featured channel for the hero
    const featuredCategories = ['football', 'motorsport', 'action'];
    const featured = SPORTS_CHANNELS.filter(c => featuredCategories.includes(c.category));
    sportsHeroChannel = featured[Math.floor(Math.random() * featured.length)] || SPORTS_CHANNELS[0];

    if (sportsHero && sportsHeroChannel) {
      sportsHero.style.backgroundImage = `url(${sportsHeroChannel.backdrop})`;
      if (sportsHeroTitle) sportsHeroTitle.textContent = sportsHeroChannel.title;
      if (sportsHeroDesc) sportsHeroDesc.textContent = sportsHeroChannel.description;
      if (sportsHeroPlayBtn) {
        sportsHeroPlayBtn.onclick = () => playSportsChannel(sportsHeroChannel);
      }
    }

    // Auto-rotate hero every 8 seconds
    if (sportsHeroInterval) clearInterval(sportsHeroInterval);
    sportsHeroInterval = setInterval(() => {
      const nextChan = featured[Math.floor(Math.random() * featured.length)] || SPORTS_CHANNELS[0];
      if (nextChan.id === sportsHeroChannel.id) return;
      sportsHeroChannel = nextChan;
      
      if (sportsHero) {
        sportsHero.style.opacity = '0.7';
        setTimeout(() => {
          sportsHero.style.backgroundImage = `url(${sportsHeroChannel.backdrop})`;
          if (sportsHeroTitle) sportsHeroTitle.textContent = sportsHeroChannel.title;
          if (sportsHeroDesc) sportsHeroDesc.textContent = sportsHeroChannel.description;
          if (sportsHeroPlayBtn) sportsHeroPlayBtn.onclick = () => playSportsChannel(sportsHeroChannel);
          sportsHero.style.opacity = '1';
        }, 400);
      }
    }, 8000);

    renderSportsRows();
    bindSportsCategoryEvents();
  }

  function renderSportsRows() {
    const container = $('#sports-rows-container');
    if (!container) return;

    // Categorize
    const filtered = currentSportsCategory === 'all'
      ? SPORTS_CHANNELS
      : SPORTS_CHANNELS.filter(c => c.category === currentSportsCategory);

    // Group by category for "All" view
    const categoryNames = { football: '⚽ Soccer', motorsport: '🏎️ Motorsport', action: '🔥 Extreme & Combat Sports', tennis: '🎾 Tennis & Racquet', other: '📺 More Sports & Entertainment' };
    
    let html = '';
    
    if (currentSportsCategory === 'all') {
      // Show grouped rows
      const groups = {};
      filtered.forEach(chan => {
        if (!groups[chan.category]) groups[chan.category] = [];
        groups[chan.category].push(chan);
      });
      
      Object.entries(groups).forEach(([cat, channels]) => {
        html += `
          <div class="row sports-row" style="animation-delay:${Object.keys(groups).indexOf(cat) * 0.08}s">
            <h3 class="row__title">${categoryNames[cat] || cat} <span class="sports-count">${channels.length} channels</span></h3>
            <div class="sports-grid">
              ${channels.map(chan => renderSportsCard(chan)).join('')}
            </div>
          </div>
        `;
      });
    } else {
      html = `
        <div class="row sports-row">
          <h3 class="row__title">${categoryNames[currentSportsCategory] || 'Live Channels'} <span class="sports-count">${filtered.length} channels</span></h3>
          <div class="sports-grid">
      `;

      if (filtered.length === 0) {
        html += `<p style="color:var(--text-muted);padding:20px 0;grid-column:1/-1;">No active streams for this category.</p>`;
      } else {
        html += filtered.map(chan => renderSportsCard(chan)).join('');
      }

      html += `</div></div>`;
    }

    container.innerHTML = html;

    // Bind card clicks with ripple effect
    $$('.sports-card', container).forEach(card => {
      card.addEventListener('click', (e) => {
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'sports-card__ripple';
        const rect = card.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        
        const id = card.dataset.chanId;
        const chan = SPORTS_CHANNELS.find(c => c.id === id);
        if (chan) playSportsChannel(chan);
      });
    });
  }

  function renderSportsCard(chan) {
    return `
      <div class="sports-card" data-chan-id="${chan.id}">
        <div class="sports-card__thumbnail-wrap">
          <img class="sports-card__thumbnail" src="${chan.logo}" alt="${chan.title}" loading="lazy" onerror="this.src='${chan.backdrop}'" />
          <div class="sports-card__overlay">
            <div class="sports-card__play-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="6,3 20,12 6,21"/></svg>
            </div>
          </div>
          <div class="sports-card__live-badge">
            <span class="sports-card__live-dot"></span>
            LIVE
          </div>
        </div>
        <div class="sports-card__body">
          <h4 class="sports-card__title">${chan.title}</h4>
          <span class="sports-card__category">${chan.category}</span>
        </div>
      </div>
    `;
  }

  function bindSportsCategoryEvents() {
    $$('.sports-category-btn').forEach(btn => {
      btn.onclick = () => {
        $$('.sports-category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSportsCategory = btn.dataset.sport;
        renderSportsRows();
      };
    });
  }

  function playSportsChannel(chan) {
    const sportsMedia = {
      id: chan.id,
      title: chan.title,
      isSports: true,
      streamUrl: chan.streamUrl
    };
    openPlayer(sportsMedia);
  }

  function loadVideoSource() {
    if (playerLoader) playerLoader.classList.remove('hidden');
    if (iframeContainer) iframeContainer.innerHTML = '';

    // Handle Live Sports streams - embed the channel page directly in iframe
    if (currentPlayingMovie && currentPlayingMovie.isSports) {
      var iframe = document.createElement('iframe');
      iframe.id = 'main-video-iframe';
      iframe.className = 'player-overlay__video';
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('webkitallowfullscreen', 'true');
      iframe.setAttribute('mozallowfullscreen', 'true');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write; screen-wake-lock; fullscreen');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      iframe.style.opacity = '0';
      iframe.style.transition = 'opacity .6s cubic-bezier(.16,1,.3,1), transform .4s ease';
      iframe.style.transform = 'scale(.98)';

      iframe.addEventListener('load', function() {
        if (playerLoader) playerLoader.classList.add('hidden');
        iframe.style.opacity = '1';
        iframe.style.transform = 'scale(1)';
      });

      // Fallback timeout
      setTimeout(function() {
        if (playerLoader) playerLoader.classList.add('hidden');
        iframe.style.opacity = '1';
        iframe.style.transform = 'scale(1)';
      }, 3000);

      iframe.src = currentPlayingMovie.streamUrl;
      if (iframeContainer) iframeContainer.appendChild(iframe);
      return;
    }

    // Standard Iframe Movie Servers
    var src = EMBED_SOURCES[currentEmbedIdx];
    var iframe = document.createElement('iframe');
    iframe.id = 'main-video-iframe';
    iframe.className = 'player-overlay__video';
    iframe.setAttribute('allowfullscreen','true');
    iframe.setAttribute('webkitallowfullscreen','true');
    iframe.setAttribute('mozallowfullscreen','true');
    iframe.setAttribute('allow','autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write; screen-wake-lock; fullscreen');
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('scrolling','no');
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity .5s cubic-bezier(.16,1,.3,1), transform .4s ease';
    iframe.style.transform = 'scale(.98)';
    
    // Faster load detection
    iframe.addEventListener('load', function() {
      if (playerLoader) playerLoader.classList.add('hidden');
      iframe.style.opacity = '1';
      iframe.style.transform = 'scale(1)';
    });
    // Fallback timeout in case load event doesn't fire
    setTimeout(function(){ 
      if(playerLoader) playerLoader.classList.add('hidden'); 
      iframe.style.opacity='1'; 
      iframe.style.transform='scale(1)'; 
    }, 2500);
    
    const isTv = currentPlayingMovie.media_type === 'tv' || currentPlayingMovie.first_air_date;
    iframe.src = src.getUrl(currentPlayingMovie.id, isTv, currentTvSeason, currentTvEpisode);
    
    if (iframeContainer) iframeContainer.appendChild(iframe);
  }

  if (tvGoBtn) {
    tvGoBtn.addEventListener('click', () => {
      currentTvSeason = parseInt(tvSeasonInput.value) || 1;
      currentTvEpisode = parseInt(tvEpisodeInput.value) || 1;
      loadVideoSource();
    });
  }

  if (tvPrevBtn) {
    tvPrevBtn.addEventListener('click', () => {
      if (currentTvEpisode > 1) {
        currentTvEpisode--;
        tvEpisodeInput.value = currentTvEpisode;
        loadVideoSource();
      }
    });
  }
  if (tvNextBtn) {
    tvNextBtn.addEventListener('click', () => {
      currentTvEpisode++;
      tvEpisodeInput.value = currentTvEpisode;
      loadVideoSource();
    });
  }

  if (cropBtn) {
    cropBtn.addEventListener('click', () => {
      const iframe = $('#main-video-iframe');
      if (iframe) {
        iframe.classList.toggle('cropped');
        cropBtn.style.color = iframe.classList.contains('cropped') ? 'var(--accent-bright)' : 'white';
      }
    });
  }

  function openPlayer(movie) {
    currentPlayingMovie = movie;
    let prefServer = parseInt(localStorage.getItem('moiz_server_pref'));
    if (isNaN(prefServer) || prefServer < 0 || prefServer >= EMBED_SOURCES.length) prefServer = 0;
    
    if (isAutoServer) {
      currentEmbedIdx = prefServer; 
    } else {
      const lastServerVal = localStorage.getItem('moiz_last_server');
      const lastServer = lastServerVal !== null ? parseInt(lastServerVal) : NaN;
      currentEmbedIdx = (!isNaN(lastServer) && lastServer >= 0 && lastServer < EMBED_SOURCES.length) ? lastServer : prefServer;
    }
    // Keep current season/episode if they were set by info modal, else default to 1
    if (!currentTvSeason) currentTvSeason = 1;
    if (!currentTvEpisode) currentTvEpisode = 1;
    if (tvSeasonInput) tvSeasonInput.value = currentTvSeason;
    if (tvEpisodeInput) tvEpisodeInput.value = currentTvEpisode;
    
    const isTv = (movie.media_type === 'tv' || movie.first_air_date) && !movie.isSports;
    if (tvControls) {
      if (isTv) tvControls.classList.remove('hidden');
      else tvControls.classList.add('hidden');
    }
    
    // Hide Server picker options for Live Sports (as we use dedicated sports engine)
    const serverToggle = $('#server-toggle-btn');
    if (serverToggle) {
      if (movie.isSports) serverToggle.classList.add('hidden');
      else serverToggle.classList.remove('hidden');
    }
    
    playerTitle.textContent = movie.title || movie.name || '';
    addToRecentlyWatched(movie);
    renderServerPicker();
    loadVideoSource();
    playerOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Automatically go borderless fullscreen when playing a movie
    try {
      if (playerOverlay.requestFullscreen) {
        playerOverlay.requestFullscreen();
      } else if (playerOverlay.webkitRequestFullscreen) { /* Safari */
        playerOverlay.webkitRequestFullscreen();
      } else if (playerOverlay.msRequestFullscreen) { /* IE11 */
        playerOverlay.msRequestFullscreen();
      }
    } catch (err) {
      console.log('Fullscreen request failed:', err);
    }
  }

  function closePlayer() {
    // Smooth close animation
    playerOverlay.style.opacity = '0';
    playerOverlay.style.transition = 'opacity .25s ease';
    
    setTimeout(() => {
      if (iframeContainer) iframeContainer.innerHTML = '';
      currentPlayingMovie = null;
      playerOverlay.classList.add('hidden');
      playerOverlay.style.opacity = '';
      playerOverlay.style.transition = '';
      document.body.style.overflow = '';
      
      // Exit fullscreen when closing the player
      try {
        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      } catch (err) {}
    }, 220);
  }

  const playerBackBtn = $('#player-back-btn');
  if (playerBackBtn) {
    playerBackBtn.addEventListener('click', closePlayer);
  }
  if (playerClose) {
    playerClose.addEventListener('click', closePlayer);
  }

  // Auto-hide the player header to make it truly borderless
  let idleTimeout;
  function resetPlayerIdle() {
    playerOverlay.classList.remove('idle');
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      playerOverlay.classList.add('idle');
    }, 3000);
  }
  playerOverlay.addEventListener('mousemove', resetPlayerIdle);
  playerOverlay.addEventListener('touchstart', resetPlayerIdle, { passive: true });
  playerOverlay.addEventListener('click', (e) => {
    // Toggle header visibility on click (for touch devices)
    if (e.target === iframeContainer || e.target.closest('.player-overlay__iframe-container')) {
      if (playerOverlay.classList.contains('idle')) {
        resetPlayerIdle();
      }
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!playerOverlay.classList.contains('hidden')) closePlayer();
      else if (!infoModal.classList.contains('hidden')) closeInfoModal();
      else if (!addProfileModal.classList.contains('hidden')) closeAddProfile();
    }
  });

  // ═══════ LOADING ═══════
  function showLoading(show) { 
    if (!loadingSpinner) return;
    if (show) {
      loadingSpinner.classList.remove('hidden');
      loadingSpinner.style.opacity = '0';
      requestAnimationFrame(() => { loadingSpinner.style.opacity = '1'; });
    } else {
      loadingSpinner.style.opacity = '0';
      setTimeout(() => { loadingSpinner.classList.add('hidden'); loadingSpinner.style.opacity = ''; }, 200);
    }
  }

  // ═══════ BOOT ═══════
  const splashScreen = $('#splash-screen');
  // Smooth splash screen dismissal
  setTimeout(() => {
    if (splashScreen) splashScreen.classList.add('hidden');
  }, 800);
  
  ensureDefaults();
  loadSettings();
  setupLangMenus();
  setupNavbar();
  const serverToggleBtn = $('#server-toggle-btn');
  const serverDrawer = $('#server-drawer');
  const serverDrawerHandle = $('#server-drawer-handle');
  const autoServerBtn = $('#auto-server-btn');
  const autoServerStatus = $('#auto-server-status');

  function updateAutoServerUI() {
    if (!autoServerBtn || !autoServerStatus) return;
    autoServerBtn.classList.toggle('active', isAutoServer);
    autoServerStatus.textContent = isAutoServer ? 'ON' : 'OFF';
  }

  if (autoServerBtn) {
    autoServerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isAutoServer = !isAutoServer;
      localStorage.setItem('moiz_auto_server', isAutoServer);
      updateAutoServerUI();
      if (isAutoServer) {
        currentEmbedIdx = 0;
        loadVideoSource();
        renderServerPicker();
      }
    });
  }
  updateAutoServerUI();

  if (serverToggleBtn) {
    serverToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      serverDrawer.classList.toggle('hidden');
    });
  }
  if (serverDrawerHandle) {
    serverDrawerHandle.addEventListener('click', () => {
      serverDrawer.classList.add('hidden');
    });
  }
  document.addEventListener('click', (e) => {
    if (serverDrawer && !serverDrawer.classList.contains('hidden') && !e.target.closest('#server-drawer')) {
      serverDrawer.classList.add('hidden');
    }
  });

  setupSearch();
  applyLanguage();
  renderProfiles();

  // ═══════ TOAST NOTIFICATION SYSTEM ═══════
  const toastContainer = $('#toast-container');
  
  function showToast(message, type = 'info', duration = 3000) {
    if (!toastContainer) return;
    const icons = { success: '&#10003;', info: 'ℹ', error: '&#10007;', warning: '&#9888;' };
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span class="toast__icon">${icons[type] || icons.info}</span><span class="toast__message">${message}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('toast--exit');
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }

  // Replace alert() calls with toasts globally
  window.moizToast = showToast;

  // ═══════ NOTIFICATION SYSTEM ═══════
  const notifList = $('#notif-list');
  const notifEmpty = $('#notif-empty');
  const notifBadge = $('#notif-badge');
  const notifClearBtn = $('#notif-clear-btn');

  function getNotifications() {
    try { return JSON.parse(localStorage.getItem('moiz_notifications') || '[]'); }
    catch { return []; }
  }
  function saveNotifications(n) { localStorage.setItem('moiz_notifications', JSON.stringify(n)); }

  function addNotification(title, body, img) {
    const notifs = getNotifications();
    notifs.unshift({ id: Date.now(), title, body, img, time: new Date().toISOString(), read: false });
    if (notifs.length > 20) notifs.pop();
    saveNotifications(notifs);
    renderNotifications();
  }

  function renderNotifications() {
    const notifs = getNotifications();
    const unread = notifs.filter(n => !n.read).length;
    
    if (notifBadge) {
      notifBadge.classList.toggle('hidden', unread === 0);
      notifBadge.textContent = unread > 9 ? '9+' : unread;
    }
    
    if (!notifList || !notifEmpty) return;
    
    if (notifs.length === 0) {
      notifList.classList.add('hidden');
      notifEmpty.classList.remove('hidden');
    } else {
      notifList.classList.remove('hidden');
      notifEmpty.classList.add('hidden');
      notifList.innerHTML = notifs.slice(0, 8).map(n => {
        const timeAgo = getTimeAgo(n.time);
        const imgSrc = n.img || 'https://image.tmdb.org/t/p/w200/wwemzKWzjKYJFfCeiB57q3r4Bcm.png';
        return `<div class="notif-item ${n.read ? '' : 'notif-item--unread'}" data-nid="${n.id}">
          <img src="${imgSrc}" alt="" onerror="this.src='https://via.placeholder.com/80x45/141414/e50914?text=Moiz'" />
          <div class="notif-item__content">
            <strong>${n.title}</strong>
            <span>${n.body}</span>
            <span class="notif-item__time">${timeAgo}</span>
          </div>
        </div>`;
      }).join('');
    }
  }

  function getTimeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    const days = Math.floor(hrs / 24);
    return days + 'd ago';
  }

  if (notifClearBtn) {
    notifClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveNotifications([]);
      renderNotifications();
      showToast('Notifications cleared', 'info', 2000);
    });
  }

  // Mark notifications as read when dropdown opens
  if (navNotifContainer) {
    const origNotifClick = navNotifContainer.onclick;
    navNotifContainer.addEventListener('click', () => {
      const notifs = getNotifications();
      notifs.forEach(n => n.read = true);
      saveNotifications(notifs);
      setTimeout(renderNotifications, 300);
    });
  }

  // Generate notifications based on activity
  function generateWelcomeNotifications() {
    const notifs = getNotifications();
    if (notifs.length === 0) {
      addNotification('Welcome to Moiz SRC! 🎬', 'Start streaming movies, TV shows, and live sports.', null);
      addNotification('New: Live Sports 🏈', '40+ live sports channels now available. Check it out!', null);
      addNotification('Tip: Keyboard Shortcuts', 'Press / to search, H for home, ? for all shortcuts.', null);
    }
  }

  renderNotifications();
  setTimeout(generateWelcomeNotifications, 1500);

  // ═══════ REELS MODE — Full-Screen Movie Discovery ═══════
  let reelsMovies = [];
  let reelsIndex = 0;
  let reelsTimer = null;
  let reelsTrailerKey = null;
  const REEL_DURATION = 12000; // 12 seconds per reel

  async function initReels() {
    const reelsScreen = $('#reels-screen');
    if (!reelsScreen) return;
    
    showLoading(true);
    try {
      // Fetch multiple pages for variety
      const [page1, page2] = await Promise.all([
        tmdbFetch('/trending/movie/week'),
        tmdbFetch('/movie/popular', '&page=2')
      ]);
      reelsMovies = [...(page1.results || []), ...(page2.results || [])]
        .filter(m => m.backdrop_path && m.overview)
        .sort(() => Math.random() - 0.5)
        .slice(0, 20);
      
      if (reelsMovies.length > 0) {
        reelsIndex = 0;
        await showReel(reelsIndex);
        startReelTimer();
      }
    } catch (err) {
      console.error('Failed to load reels:', err);
      const wrap = $('#reels-video-wrap');
      if (wrap) wrap.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">Failed to load. Check your connection.</p>';
    }
    showLoading(false);
  }

  async function showReel(idx) {
    if (!reelsMovies.length) return;
    const movie = reelsMovies[idx];
    loadedMoviesMap[movie.id] = movie;
    
    const wrap = $('#reels-video-wrap');
    const title = $('#reels-title');
    const desc = $('#reels-desc');
    const meta = $('#reels-meta');
    const counter = $('#reels-counter');
    const progressBar = $('#reels-progress-bar');
    
    // Try to get a YouTube trailer
    let trailerHtml = '';
    try {
      const videos = await tmdbFetch(`/movie/${movie.id}/videos`);
      const trailer = (videos.results || []).find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
      if (trailer) {
        reelsTrailerKey = trailer.key;
        trailerHtml = `<iframe src="https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3" allow="autoplay; encrypted-media" allowfullscreen frameborder="0" style="width:100%;height:100%;position:absolute;inset:0;object-fit:cover"></iframe>`;
      }
    } catch (e) { /* fallback to image */ }
    
    if (wrap) {
      if (trailerHtml) {
        wrap.innerHTML = `<div style="position:relative;width:100%;height:100%;background:#000">${trailerHtml}<img src="${backdropURL(movie.backdrop_path)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s" onerror="this.remove()"/></div>`;
      } else {
        wrap.innerHTML = `<img src="${backdropURL(movie.backdrop_path)}" alt="${movie.title || ''}" style="width:100%;height:100%;object-fit:cover;animation:reelZoom ${REEL_DURATION}ms linear forwards"/>`;
      }
    }
    if (title) title.textContent = movie.title || movie.name || '';
    if (desc) desc.textContent = movie.overview || '';
    if (meta) {
      const year = (movie.release_date || '').slice(0, 4);
      const rating = movie.vote_average ? Math.round(movie.vote_average * 10) + '% Match' : '';
      const genres = movie.genre_ids ? movie.genre_ids.slice(0, 2).map(id => getGenreName(id)).filter(Boolean).join(', ') : '';
      meta.textContent = [rating, year, genres].filter(Boolean).join(' · ');
    }
    if (counter) counter.textContent = `${idx + 1} / ${reelsMovies.length}`;
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      requestAnimationFrame(() => {
        progressBar.style.transition = `width ${REEL_DURATION}ms linear`;
        progressBar.style.width = '100%';
      });
    }
    
    // Bind action buttons
    const playBtn = $('#reels-play-btn');
    const infoBtn = $('#reels-info-btn');
    const listBtn = $('#reels-list-btn');
    if (playBtn) playBtn.onclick = () => { 
      clearInterval(reelsTimer);
      const reelsScreen = $('#reels-screen');
      if (reelsScreen) reelsScreen.classList.add('hidden');
      openPlayer(movie); 
    };
    if (infoBtn) infoBtn.onclick = () => { openInfoModal(movie); };
    if (listBtn) listBtn.onclick = () => {
      const added = toggleMyList(movie);
      showToast(added ? 'Added to My List' : 'Removed from My List', added ? 'success' : 'info', 2000);
    };
  }

  function getGenreName(id) {
    const map = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',53:'Thriller',10752:'War',37:'Western'};
    return map[id] || '';
  }

  function startReelTimer() {
    clearInterval(reelsTimer);
    reelsTimer = setInterval(() => {
      reelsIndex = (reelsIndex + 1) % reelsMovies.length;
      showReel(reelsIndex);
    }, REEL_DURATION);
  }

  function nextReel() {
    reelsIndex = (reelsIndex + 1) % reelsMovies.length;
    showReel(reelsIndex);
    startReelTimer();
  }

  function prevReel() {
    reelsIndex = (reelsIndex - 1 + reelsMovies.length) % reelsMovies.length;
    showReel(reelsIndex);
    startReelTimer();
  }

  // Reels navigation
  const reelsNextBtn = $('#reels-next-btn');
  const reelsNextNav = $('#reels-next-nav');
  const reelsPrevNav = $('#reels-prev-nav');
  if (reelsNextBtn) reelsNextBtn.addEventListener('click', nextReel);
  if (reelsNextNav) reelsNextNav.addEventListener('click', nextReel);
  if (reelsPrevNav) reelsPrevNav.addEventListener('click', prevReel);

  // Swipe + wheel support for reels
  let reelsTouchStartY = 0;
  let reelsWheelCooldown = false;
  const reelsContainer = $('#reels-container');
  if (reelsContainer) {
    reelsContainer.addEventListener('touchstart', (e) => { reelsTouchStartY = e.touches[0].clientY; }, { passive: true });
    reelsContainer.addEventListener('touchend', (e) => {
      const diff = reelsTouchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextReel();
        else prevReel();
      }
    });
    reelsContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (reelsWheelCooldown) return;
      reelsWheelCooldown = true;
      setTimeout(() => { reelsWheelCooldown = false; }, 800);
      if (e.deltaY > 0) nextReel();
      else prevReel();
    }, { passive: false });
  }

  // ═══════ MUSIC PLAYER ═══════
  let musicPlaylist = [];
  let musicCurrentIdx = -1;
  let musicIsPlaying = false;
  let musicShuffle = false;
  let musicRepeat = false;
  const musicAudio = $('#music-audio');

  function initMusic() {
    const fileInput = $('#music-file-input');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
          if (file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|ogg|flac|m4a|aac|wma)$/i)) {
            const url = URL.createObjectURL(file);
            musicPlaylist.push({
              name: file.name.replace(/\.[^/.]+$/, ''),
              url: url,
              duration: 0,
              isLocal: true
            });
          }
        });
        renderMusicPlaylist();
        if (musicCurrentIdx === -1 && musicPlaylist.length > 0) {
          loadMusicTrack(0);
        }
        showToast(`Added ${files.length} track${files.length > 1 ? 's' : ''}`, 'success', 2000);
        fileInput.value = '';
      });
    }

    // URL input handler
    const urlInput = $('#music-url-input');
    const urlAddBtn = $('#music-url-add-btn');
    if (urlAddBtn && urlInput) {
      const addFromUrl = () => {
        const url = urlInput.value.trim();
        if (!url) return;
        
        // Check if it's a search query (no http/dots) - search JioSaavn
        if (!url.startsWith('http') && !url.includes('.')) {
          searchMusicLibrary(url);
          urlInput.value = '';
          return;
        }
        
        // Direct URL
        let name = url.split('/').pop().split('?')[0] || 'Stream';
        name = decodeURIComponent(name).replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        if (name.length > 50) name = name.slice(0, 50) + '...';
        
        musicPlaylist.push({ name, url, duration: 0, isLocal: false });
        renderMusicPlaylist();
        if (musicCurrentIdx === -1) loadMusicTrack(musicPlaylist.length - 1);
        showToast('Track added from URL', 'success', 2000);
        urlInput.value = '';
      };
      urlAddBtn.addEventListener('click', addFromUrl);
      urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addFromUrl(); });
    }

    // Play/Pause
    const playBtn = $('#music-play-btn');
    if (playBtn) playBtn.addEventListener('click', toggleMusicPlay);

    // Next/Prev
    const nextBtn = $('#music-next-btn');
    const prevBtn = $('#music-prev-btn');
    if (nextBtn) nextBtn.addEventListener('click', musicNext);
    if (prevBtn) prevBtn.addEventListener('click', musicPrev);

    // Shuffle/Repeat
    const shuffleBtn = $('#music-shuffle-btn');
    const repeatBtn = $('#music-repeat-btn');
    if (shuffleBtn) shuffleBtn.addEventListener('click', () => {
      musicShuffle = !musicShuffle;
      shuffleBtn.classList.toggle('active', musicShuffle);
    });
    if (repeatBtn) repeatBtn.addEventListener('click', () => {
      musicRepeat = !musicRepeat;
      repeatBtn.classList.toggle('active', musicRepeat);
    });

    // Progress slider
    const progressSlider = $('#music-progress');
    if (progressSlider) {
      progressSlider.addEventListener('input', () => {
        if (musicAudio && musicAudio.duration) {
          musicAudio.currentTime = (progressSlider.value / 100) * musicAudio.duration;
        }
      });
    }

    // Volume slider
    const volumeSlider = $('#music-volume');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', () => {
        if (musicAudio) musicAudio.volume = volumeSlider.value / 100;
      });
    }

    // Audio events
    if (musicAudio) {
      musicAudio.addEventListener('timeupdate', updateMusicProgress);
      musicAudio.addEventListener('ended', () => {
        if (musicRepeat) {
          musicAudio.currentTime = 0;
          musicAudio.play();
        } else {
          musicNext();
        }
      });
      musicAudio.addEventListener('loadedmetadata', () => {
        const dur = $('#music-duration');
        if (dur) dur.textContent = formatTime(musicAudio.duration);
        if (musicPlaylist[musicCurrentIdx]) {
          musicPlaylist[musicCurrentIdx].duration = musicAudio.duration;
          renderMusicPlaylist();
        }
      });
    }
  }

  function loadMusicTrack(idx) {
    if (idx < 0 || idx >= musicPlaylist.length) return;
    musicCurrentIdx = idx;
    const track = musicPlaylist[idx];
    
    if (musicAudio) {
      musicAudio.src = track.url;
      musicAudio.load();
      
      // Handle load errors
      musicAudio.onerror = () => {
        showToast('Failed to load track. Try another.', 'error', 3000);
        const titleEl = $('#music-title');
        if (titleEl) titleEl.textContent = 'Error loading track';
      };
    }
    
    const titleEl = $('#music-title');
    const artistEl = $('#music-artist');
    const artwork = $('#music-artwork');
    
    if (titleEl) titleEl.textContent = track.name;
    if (artistEl) artistEl.textContent = track.artist || (track.isLocal ? 'Local file' : 'Stream') + ' · Track ' + (idx + 1);
    if (artwork) {
      if (track.image) {
        artwork.innerHTML = `<img src="${track.image}" alt="${track.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit"/>`;
      } else {
        artwork.innerHTML = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-bright)" stroke-width="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
      }
    }
    
    renderMusicPlaylist();
    
    if (musicIsPlaying) {
      musicAudio.play().catch(() => {});
    }
  }

  function toggleMusicPlay() {
    if (!musicAudio || musicCurrentIdx === -1) {
      if (musicPlaylist.length > 0) {
        loadMusicTrack(0);
        musicIsPlaying = true;
        musicAudio.play().catch(() => {});
        updatePlayButton();
      }
      return;
    }
    
    if (musicIsPlaying) {
      musicAudio.pause();
      musicIsPlaying = false;
    } else {
      musicAudio.play().then(() => {
        musicIsPlaying = true;
        updatePlayButton();
      }).catch(() => {
        showToast('Playback failed. Try another track.', 'error', 2000);
      });
      musicIsPlaying = true;
    }
    updatePlayButton();
  }

  function updatePlayButton() {
    const icon = $('#music-play-icon');
    const artwork = $('#music-artwork');
    if (icon) {
      icon.innerHTML = musicIsPlaying 
        ? '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'
        : '<polygon points="5,3 19,12 5,21"/>';
    }
    if (artwork) artwork.classList.toggle('playing', musicIsPlaying);
  }

  function musicNext() {
    if (musicPlaylist.length === 0) return;
    let next;
    if (musicShuffle) {
      next = Math.floor(Math.random() * musicPlaylist.length);
    } else {
      next = (musicCurrentIdx + 1) % musicPlaylist.length;
    }
    loadMusicTrack(next);
    if (musicIsPlaying) musicAudio.play();
  }

  function musicPrev() {
    if (musicPlaylist.length === 0) return;
    if (musicAudio && musicAudio.currentTime > 3) {
      musicAudio.currentTime = 0;
      return;
    }
    const prev = (musicCurrentIdx - 1 + musicPlaylist.length) % musicPlaylist.length;
    loadMusicTrack(prev);
    if (musicIsPlaying) musicAudio.play();
  }

  function updateMusicProgress() {
    if (!musicAudio || !musicAudio.duration) return;
    const pct = (musicAudio.currentTime / musicAudio.duration) * 100;
    const slider = $('#music-progress');
    const timeEl = $('#music-current-time');
    if (slider) slider.value = pct;
    if (timeEl) timeEl.textContent = formatTime(musicAudio.currentTime);
  }

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function renderMusicPlaylist() {
    const list = $('#music-playlist-list');
    const countEl = $('#music-track-count');
    if (!list) return;
    
    if (countEl) countEl.textContent = `(${musicPlaylist.length} track${musicPlaylist.length !== 1 ? 's' : ''})`;
    
    if (musicPlaylist.length === 0) {
      list.innerHTML = `<div class="music-playlist__empty"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity=".3"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg><p>Your playlist is empty. Add some tracks to get started.</p></div>`;
      return;
    }
    
    list.innerHTML = musicPlaylist.map((track, idx) => `
      <div class="music-track ${idx === musicCurrentIdx ? 'active' : ''}" data-idx="${idx}">
        <div class="music-track__num">${idx === musicCurrentIdx && musicIsPlaying ? '♫' : idx + 1}</div>
        <div class="music-track__info">
          <div class="music-track__name">${track.name}</div>
          <div class="music-track__duration">${track.duration ? formatTime(track.duration) : '--:--'}</div>
        </div>
        <button class="music-track__remove" data-remove="${idx}" title="Remove">&times;</button>
      </div>
    `).join('');
    
    // Bind clicks
    $$('.music-track', list).forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.music-track__remove')) return;
        const idx = +el.dataset.idx;
        loadMusicTrack(idx);
        musicIsPlaying = true;
        musicAudio.play();
        updatePlayButton();
      });
    });
    
    $$('.music-track__remove', list).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = +btn.dataset.remove;
        URL.revokeObjectURL(musicPlaylist[idx].url);
        musicPlaylist.splice(idx, 1);
        if (musicCurrentIdx === idx) {
          musicAudio.pause();
          musicIsPlaying = false;
          musicCurrentIdx = -1;
          updatePlayButton();
          const titleEl = $('#music-title');
          if (titleEl) titleEl.textContent = 'No track loaded';
        } else if (musicCurrentIdx > idx) {
          musicCurrentIdx--;
        }
        renderMusicPlaylist();
      });
    });
  }

  initMusic();

  // ═══════ MUSIC LIBRARY SEARCH (Deezer Previews + Direct URLs) ═══════
  let musicSearchResults = [];

  async function searchMusicLibrary(query) {
    if (!query || query.length < 2) return;
    showToast('Searching...', 'info', 1500);
    
    let data = null;
    try {
      const res = await fetch('https://api.deezer.com/search?q=' + encodeURIComponent(query) + '&limit=25');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length) {
          data = json.data.map(track => ({
            song_name: track.title || 'Unknown',
            song_artist: track.artist ? track.artist.name : 'Unknown',
            album_name: track.album ? track.album.title : '',
            song_image: track.album ? track.album.cover_medium : '',
            song_duration: String(track.duration || 0),
            download_url: track.preview
          }));
        }
      }
    } catch (err) {}
    
    if (!data || !data.length) {
      showToast('No results found.', 'error', 2000);
      return;
    }
    
    musicSearchResults = data;
    renderMusicSearchResults(data, query);
  }

  function renderMusicSearchResults(results, query) {
    const list = $('#music-playlist-list');
    if (!list) return;
    
    let searchHtml = `<div class="music-search-results" id="music-search-results">
      <div class="music-search-results__header">
        <h4>🎵 "${query}" — ${results.length} tracks found</h4>
        <button class="music-search-results__close" id="music-search-close">&times;</button>
      </div>
      <p style="font-size:.7rem;color:var(--text-muted);margin-bottom:12px;padding:0 4px">Previews via Deezer. For full songs, add local files or paste direct MP3 URLs.</p>`;
    
    searchHtml += results.map((song, idx) => {
      const duration = song.song_duration && song.song_duration !== '0' ? formatTime(parseInt(song.song_duration)) : '';
      return `<div class="music-search-item" data-search-idx="${idx}">
        ${song.song_image ? '<img class="music-search-item__img" src="' + song.song_image + '" alt="" />' : ''}
        <div class="music-search-item__info">
          <div class="music-search-item__name">${song.song_name}</div>
          <div class="music-search-item__artist">${song.song_artist} ${song.album_name ? '· ' + song.album_name : ''} ${duration ? '· ' + duration : ''}</div>
        </div>
        <button class="music-search-item__add" data-search-idx="${idx}">+</button>
      </div>`;
    }).join('');
    
    searchHtml += '</div>';
    
    const existing = $('#music-search-results');
    if (existing) existing.remove();
    list.insertAdjacentHTML('beforebegin', searchHtml);
    
    const closeBtn = $('#music-search-close');
    if (closeBtn) closeBtn.addEventListener('click', () => { const el = $('#music-search-results'); if (el) el.remove(); });
    
    $$('.music-search-item__add').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); addSongFromSearch(parseInt(btn.dataset.searchIdx)); });
    });
    
    $$('.music-search-item').forEach(item => {
      item.addEventListener('click', () => {
        addSongFromSearch(parseInt(item.dataset.searchIdx));
        musicIsPlaying = true;
        loadMusicTrack(musicPlaylist.length - 1);
        if (musicAudio) musicAudio.play().catch(() => {});
        updatePlayButton();
      });
    });
  }

  function addSongFromSearch(idx) {
    const song = musicSearchResults[idx];
    if (!song || !song.download_url) { showToast('No stream available', 'error', 2000); return; }
    
    musicPlaylist.push({
      name: song.song_name,
      artist: song.song_artist,
      album: song.album_name,
      url: song.download_url,
      image: song.song_image,
      duration: parseInt(song.song_duration) || 0,
      isLocal: false
    });
    renderMusicPlaylist();
    showToast('Added: ' + song.song_name, 'success', 1500);
    if (musicCurrentIdx === -1) loadMusicTrack(0);
  }

  // ═══════ NAV ROUTING FOR REELS & MUSIC ═══════
  function hideAllScreens() {
    const screens = ['#sports-screen', '#reels-screen', '#music-screen'];
    screens.forEach(s => { const el = $(s); if (el) el.classList.add('hidden'); });
    if (sportsHeroInterval) clearInterval(sportsHeroInterval);
    if (reelsTimer) clearInterval(reelsTimer);
  }

  // Add reels/music to the nav click handler
  const reelsNavBtn = $('#nav-reels-btn');
  const musicNavBtn = $('#nav-music-btn');

  if (reelsNavBtn) {
    reelsNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      $$('.navbar__links a').forEach(el => el.classList.remove('active'));
      reelsNavBtn.classList.add('active');
      hideAllScreens();
      hero.classList.add('hidden');
      rowsContainer.classList.add('hidden');
      searchResults.classList.add('hidden');
      const reelsScreen = $('#reels-screen');
      if (reelsScreen) reelsScreen.classList.remove('hidden');
      initReels();
    });
  }

  if (musicNavBtn) {
    musicNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      $$('.navbar__links a').forEach(el => el.classList.remove('active'));
      musicNavBtn.classList.add('active');
      hideAllScreens();
      hero.classList.add('hidden');
      rowsContainer.classList.add('hidden');
      searchResults.classList.add('hidden');
      const musicScreen = $('#music-screen');
      if (musicScreen) musicScreen.classList.remove('hidden');
    });
  }

  // Add CSS animation for reels zoom
  const reelStyle = document.createElement('style');
  reelStyle.textContent = '@keyframes reelZoom{from{transform:scale(1)}to{transform:scale(1.15)}}';
  document.head.appendChild(reelStyle);

  // ═══════ FOOTER VISIBILITY ═══════
  const siteFooter = $('#site-footer');
  function updateFooterVisibility() {
    if (!siteFooter) return;
    const appVisible = app && !app.classList.contains('hidden');
    const playerHidden = playerOverlay && playerOverlay.classList.contains('hidden');
    if (appVisible && playerHidden) {
      siteFooter.classList.remove('hidden');
    } else {
      siteFooter.classList.add('hidden');
    }
  }
  // Check footer on state change
  const footerObserver = new MutationObserver(updateFooterVisibility);
  if (app) footerObserver.observe(app, { attributes: true, attributeFilter: ['class'] });
  if (playerOverlay) footerObserver.observe(playerOverlay, { attributes: true, attributeFilter: ['class'] });

  // ═══════ KEYBOARD SHORTCUTS ═══════
  const kbdHint = $('#kbd-hint');
  let kbdHintTimeout;
  
  function flashKbdHint() {
    if (!kbdHint) return;
    kbdHint.classList.add('visible');
    clearTimeout(kbdHintTimeout);
    kbdHintTimeout = setTimeout(() => kbdHint.classList.remove('visible'), 4000);
  }
  
  // Show hint briefly on first load
  setTimeout(flashKbdHint, 3000);

  document.addEventListener('keydown', e => {
    // Ignore if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      return;
    }
    
    // "/" to focus search
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      if (!searchBar.classList.contains('open')) {
        searchBar.classList.add('open');
      }
      searchInput.focus();
    }
    
    // "h" for Home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
      const homeLink = document.querySelector('.navbar__links a[data-i18n="navHome"]');
      if (homeLink) homeLink.click();
    }
    
    // "?" to show keyboard hints
    if (e.key === '?' && e.shiftKey) {
      flashKbdHint();
    }
  });

  // ═══════ CONTINUE WATCHING PROGRESS ═══════
  function getWatchProgress(movieId) {
    try {
      const data = JSON.parse(localStorage.getItem('moiz_watch_progress') || '{}');
      return data[movieId] || 0;
    } catch { return 0; }
  }

  function setWatchProgress(movieId, percent) {
    try {
      const data = JSON.parse(localStorage.getItem('moiz_watch_progress') || '{}');
      data[movieId] = Math.min(100, Math.max(0, percent));
      localStorage.setItem('moiz_watch_progress', JSON.stringify(data));
    } catch {}
  }

  // Simulate progress when opening player (random 10-90% for demo)
  const origOpenPlayer = openPlayer;
  // We override addToRecentlyWatched to also set progress
  const origAddToRecentlyWatched = addToRecentlyWatched;

  // Patch: add progress bar to recently watched cards after render
  const origRenderRows = renderRows;
  
  // Override renderRows to add progress bars
  function renderRowsWithProgress(rows) {
    origRenderRows(rows);
    // Add progress bars to recently watched row
    const recentRow = document.querySelector('.row');
    if (!recentRow) return;
    // Add progress bars to all cards that have watch progress
    setTimeout(() => {
      $$('.card').forEach(card => {
        const id = +card.dataset.id;
        const progress = getWatchProgress(id);
        if (progress > 0) {
          // Only add if not already there
          if (!card.querySelector('.card__progress')) {
            const bar = document.createElement('div');
            bar.className = 'card__progress';
            bar.innerHTML = `<div class="card__progress-bar" style="width:${progress}%"></div>`;
            card.appendChild(bar);
          }
        }
      });
    }, 100);
  }

  // When player opens, simulate setting random progress for demo
  const origOpenPlayerFn = openPlayer;
  // We can't easily override since it's hoisted, so we set progress on play
  document.addEventListener('click', e => {
    const playIcon = e.target.closest('.card__play-icon') || e.target.closest('.search-card__play');
    if (playIcon) {
      const card = playIcon.closest('.card') || playIcon.closest('.search-card');
      if (card) {
        const id = +card.dataset.id;
        // Simulate watching progress (random between 15-85%)
        const existing = getWatchProgress(id);
        if (!existing) {
          setWatchProgress(id, Math.floor(Math.random() * 70) + 15);
        }
      }
    }
  }, true);

  // ═══════ TOP 10 ROW ENHANCEMENT ═══════
  // Override renderRows to add top-10 class to trending row
  const origRenderRowsFn = renderRows;
  const _origRowsContainer = rowsContainer;
  
  // Apply top-10 styling after rows render
  const rowsObserver = new MutationObserver(() => {
    if (!_origRowsContainer) return;
    const rows = _origRowsContainer.querySelectorAll('.row');
    rows.forEach(row => {
      const title = row.querySelector('.row__title');
      if (title && title.dataset.genreKey === 'trendingNow') {
        row.classList.add('row--top10');
      }
    });
    // Also add progress bars
    $$('.card', _origRowsContainer).forEach(card => {
      const id = +card.dataset.id;
      const progress = getWatchProgress(id);
      if (progress > 0 && !card.querySelector('.card__progress')) {
        const bar = document.createElement('div');
        bar.className = 'card__progress';
        bar.innerHTML = `<div class="card__progress-bar" style="width:${progress}%"></div>`;
        card.appendChild(bar);
      }
    });
  });
  if (_origRowsContainer) {
    rowsObserver.observe(_origRowsContainer, { childList: true });
  }

  // ═══════ REPLACE alert() WITH TOASTS ═══════
  // Patch: Override the clear history handler to use toast
  if (clearHistoryBtn) {
    // Remove existing listener and re-add with toast
    clearHistoryBtn.replaceWith(clearHistoryBtn.cloneNode(true));
    const newClearBtn = $('#clear-history-btn');
    if (newClearBtn) {
      newClearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your watch history? This cannot be undone.')) {
          if (currentProfile) {
            currentProfile.recentlyWatched = [];
            const profiles = getProfiles();
            const pIdx = profiles.findIndex(p => p.name === currentProfile.name);
            if (pIdx !== -1) {
              profiles[pIdx].recentlyWatched = [];
              saveProfiles(profiles);
            }
            showToast('Watch history cleared successfully!', 'success');
            if (currentCategoryFilter === 'home') initDashboard();
          }
        }
      });
    }
  }

  // Show toast when adding/removing from My List
  const origToggleMyList = toggleMyList;
  // Patch card add-btn click to show toast 
  document.addEventListener('click', e => {
    const addBtn = e.target.closest('.card__add-btn');
    if (addBtn) {
      setTimeout(() => {
        const isNowInList = addBtn.textContent.trim() === '-';
        if (isNowInList) {
          showToast('Added to My List', 'success', 2000);
        } else {
          showToast('Removed from My List', 'info', 2000);
        }
      }, 50);
    }
  });

  // Toast when toggling list from info modal
  if (infoListBtn) {
    infoListBtn.addEventListener('click', () => {
      setTimeout(() => {
        const icon = infoListBtn.querySelector('.mylist-icon');
        if (icon && icon.textContent.trim() === '-') {
          showToast('Added to My List', 'success', 2000);
        } else {
          showToast('Removed from My List', 'info', 2000);
        }
      }, 50);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // MASSIVE UPGRADE v4.0 — New Features
  // ═══════════════════════════════════════════════════════════════

  // ═══════ FLOATING MINI MUSIC PLAYER ═══════
  (function initMiniPlayer() {
    const miniPlayer = $('#mini-music-player');
    const miniTitle = $('#mini-player-title');
    const miniArtist = $('#mini-player-artist');
    const miniPlayBtn = $('#mini-player-play');
    const miniPlayIcon = $('#mini-player-play-icon');
    const miniPrevBtn = $('#mini-player-prev');
    const miniNextBtn = $('#mini-player-next');
    const miniCloseBtn = $('#mini-player-close');
    const miniProgressBar = $('#mini-player-progress-bar');
    let miniPlayerDismissed = false;

    function updateMiniPlayer() {
      if (!miniPlayer || miniPlayerDismissed) return;
      const musicScreenEl = $('#music-screen');
      const isMusicVisible = musicScreenEl && !musicScreenEl.classList.contains('hidden');
      
      // Show mini player when music is playing and user is NOT on music tab
      if (musicIsPlaying && !isMusicVisible && musicCurrentIdx >= 0 && musicPlaylist.length > 0) {
        miniPlayer.classList.add('visible');
        const track = musicPlaylist[musicCurrentIdx];
        if (miniTitle) miniTitle.textContent = track ? track.name : 'Unknown';
        if (miniArtist) miniArtist.textContent = track && track.isLocal === false ? 'Streaming' : 'Local file';
        // Update play icon
        if (miniPlayIcon) {
          miniPlayIcon.innerHTML = musicIsPlaying 
            ? '<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>'
            : '<polygon points="5,3 19,12 5,21"/>';
        }
      } else {
        miniPlayer.classList.remove('visible');
      }
    }

    // Update progress bar on mini player
    if (musicAudio) {
      musicAudio.addEventListener('timeupdate', () => {
        if (miniProgressBar && musicAudio.duration) {
          const pct = (musicAudio.currentTime / musicAudio.duration) * 100;
          miniProgressBar.style.width = pct + '%';
        }
        updateMiniPlayer();
      });
      musicAudio.addEventListener('play', () => { musicIsPlaying = true; updateMiniPlayer(); });
      musicAudio.addEventListener('pause', () => { musicIsPlaying = false; updateMiniPlayer(); });
    }

    // Mini player controls
    if (miniPlayBtn) miniPlayBtn.addEventListener('click', toggleMusicPlay);
    if (miniPrevBtn) miniPrevBtn.addEventListener('click', musicPrev);
    if (miniNextBtn) miniNextBtn.addEventListener('click', musicNext);
    if (miniCloseBtn) miniCloseBtn.addEventListener('click', () => {
      miniPlayerDismissed = true;
      miniPlayer.classList.remove('visible');
    });

    // Re-show mini player when navigating away from music
    const observer = new MutationObserver(() => {
      miniPlayerDismissed = false;
      updateMiniPlayer();
    });
    const musicScreenObs = $('#music-screen');
    if (musicScreenObs) {
      observer.observe(musicScreenObs, { attributes: true, attributeFilter: ['class'] });
    }

    // Also update when nav links are clicked
    $$('.navbar__links a').forEach(link => {
      link.addEventListener('click', () => setTimeout(updateMiniPlayer, 100));
    });
  })();

  // ═══════ KEYBOARD SHORTCUTS FOR MUSIC ═══════
  (function initMusicKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      // Don't trigger if player overlay is open (conflicts with video controls)
      const playerOverlay = $('#player-overlay');
      if (playerOverlay && !playerOverlay.classList.contains('hidden')) return;

      switch (e.key) {
        case ' ':
          // Space = play/pause music (only if music has tracks)
          if (musicPlaylist.length > 0) {
            e.preventDefault();
            toggleMusicPlay();
          }
          break;
        case 'ArrowRight':
          // Seek forward 10s
          if (musicAudio && musicIsPlaying) {
            e.preventDefault();
            musicAudio.currentTime = Math.min(musicAudio.currentTime + 10, musicAudio.duration || 0);
          }
          break;
        case 'ArrowLeft':
          // Seek backward 10s
          if (musicAudio && musicIsPlaying) {
            e.preventDefault();
            musicAudio.currentTime = Math.max(musicAudio.currentTime - 10, 0);
          }
          break;
        case 'n':
        case 'N':
          // Next track
          if (musicPlaylist.length > 0) {
            e.preventDefault();
            musicNext();
            showToast('Next track', 'info', 1500);
          }
          break;
        case 'p':
        case 'P':
          // Previous track
          if (musicPlaylist.length > 0) {
            e.preventDefault();
            musicPrev();
            showToast('Previous track', 'info', 1500);
          }
          break;
      }
    });
  })();

  // ═══════ DOUBLE-CLICK ON REEL TO ADD TO MY LIST ═══════
  (function initReelsDoubleTap() {
    const reelsContainer = $('#reels-container');
    if (!reelsContainer) return;
    let lastTap = 0;

    reelsContainer.addEventListener('dblclick', (e) => {
      // Don't trigger on buttons
      if (e.target.closest('.reels-action-btn') || e.target.closest('.reels-nav__btn')) return;
      
      const movie = reelsMovies[reelsIndex];
      if (!movie) return;

      // Add to list
      const added = toggleMyList(movie);
      
      // Show heart animation
      const heart = document.createElement('div');
      heart.className = 'reels-heart-anim';
      heart.textContent = added ? '♥' : '♡';
      reelsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 900);

      showToast(added ? 'Added to My List' : 'Removed from My List', added ? 'success' : 'info', 2000);
    });
  })();

  // ═══════ REELS AUTO-ADVANCEMENT WHEN TRAILER ENDS ═══════
  (function initReelsAutoAdvance() {
    // Listen for YouTube iframe messages (postMessage API)
    window.addEventListener('message', (e) => {
      try {
        // YouTube sends state changes via postMessage
        if (typeof e.data === 'string') {
          const data = JSON.parse(e.data);
          // YouTube player state: 0 = ended
          if (data.event === 'onStateChange' && data.info === 0) {
            const reelsScreen = $('#reels-screen');
            if (reelsScreen && !reelsScreen.classList.contains('hidden')) {
              showToast('Auto-playing next reel...', 'info', 1500);
              setTimeout(() => {
                if (typeof nextReel === 'function') nextReel();
              }, 1500);
            }
          }
        }
      } catch (err) { /* ignore non-JSON messages */ }
    });
  })();

  // ═══════ MUSIC PLAYER REMEMBERS LAST PLAYLIST (localStorage) ═══════
  (function initMusicPersistence() {
    const MUSIC_STORAGE_KEY = 'moiz_music_playlist';

    function saveMusicState() {
      try {
        // Only save URL-based tracks (can't persist blob URLs)
        const persistable = musicPlaylist.filter(t => !t.url.startsWith('blob:'));
        const state = {
          tracks: persistable,
          currentIdx: musicCurrentIdx,
          volume: musicAudio ? musicAudio.volume : 0.8
        };
        localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(state));
      } catch (err) { /* quota exceeded or other error */ }
    }

    function loadMusicState() {
      try {
        const raw = localStorage.getItem(MUSIC_STORAGE_KEY);
        if (!raw) return;
        const state = JSON.parse(raw);
        if (state.tracks && state.tracks.length > 0) {
          // Only load if playlist is currently empty
          if (musicPlaylist.length === 0) {
            musicPlaylist.push(...state.tracks);
            renderMusicPlaylist();
            if (state.currentIdx >= 0 && state.currentIdx < musicPlaylist.length) {
              loadMusicTrack(state.currentIdx);
            }
            if (musicAudio && state.volume !== undefined) {
              musicAudio.volume = state.volume;
              const volSlider = $('#music-volume');
              if (volSlider) volSlider.value = state.volume * 100;
            }
            showToast('Restored your last playlist', 'info', 2000);
          }
        }
      } catch (err) { /* corrupted data */ }
    }

    // Save on changes
    if (musicAudio) {
      musicAudio.addEventListener('loadedmetadata', saveMusicState);
      musicAudio.addEventListener('volumechange', saveMusicState);
    }

    // Auto-save when playlist changes (hook into the audio events)
    if (musicAudio) {
      musicAudio.addEventListener('play', saveMusicState);
      musicAudio.addEventListener('ended', saveMusicState);
    }

    // Load saved state after a short delay (let the music player init first)
    setTimeout(loadMusicState, 1500);
  })();

  // ═══════ QUICK-PLAY CONTEXT MENU (Right-Click on Cards) ═══════
  (function initContextMenu() {
    let activeMenu = null;

    function removeMenu() {
      if (activeMenu) {
        activeMenu.remove();
        activeMenu = null;
      }
    }

    document.addEventListener('click', removeMenu);
    document.addEventListener('scroll', removeMenu, true);

    document.addEventListener('contextmenu', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;

      e.preventDefault();
      removeMenu();

      const movieId = parseInt(card.dataset.id);
      const movie = loadedMoviesMap[movieId];
      if (!movie) return;

      const menu = document.createElement('div');
      menu.className = 'card-context-menu';
      menu.innerHTML = `
        <div class="card-context-menu__item" data-action="play">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
          Quick Play
        </div>
        <div class="card-context-menu__item" data-action="info">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          More Info
        </div>
        <div class="card-context-menu__divider"></div>
        <div class="card-context-menu__item" data-action="list">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          ${isInMyList(movieId) ? 'Remove from My List' : 'Add to My List'}
        </div>
      `;

      // Position menu
      const x = Math.min(e.clientX, window.innerWidth - 200);
      const y = Math.min(e.clientY, window.innerHeight - 150);
      menu.style.left = x + 'px';
      menu.style.top = y + 'px';

      document.body.appendChild(menu);
      activeMenu = menu;

      // Handle clicks
      menu.addEventListener('click', (ev) => {
        const item = ev.target.closest('.card-context-menu__item');
        if (!item) return;
        const action = item.dataset.action;

        if (action === 'play') {
          openPlayer(movie);
          showToast('Quick playing: ' + (movie.title || movie.name), 'success', 2000);
        } else if (action === 'info') {
          openInfoModal(movie);
        } else if (action === 'list') {
          const added = toggleMyList(movie);
          showToast(added ? 'Added to My List' : 'Removed from My List', added ? 'success' : 'info', 2000);
        }
        removeMenu();
      });
    });
  })();

  // ═══════ CINEMA MODE ═══════
  (function initCinemaMode() {
    const cinemaBtn = $('#cinema-mode-btn');
    const cinemaOverlay = $('#cinema-mode-overlay');
    let cinemaActive = false;

    function toggleCinema() {
      cinemaActive = !cinemaActive;
      document.body.classList.toggle('cinema-mode', cinemaActive);
      if (cinemaOverlay) cinemaOverlay.classList.toggle('active', cinemaActive);
      if (cinemaBtn) cinemaBtn.classList.toggle('active', cinemaActive);
      showToast(cinemaActive ? 'Cinema Mode ON — lights dimmed' : 'Cinema Mode OFF', 'info', 2000);
    }

    if (cinemaBtn) cinemaBtn.addEventListener('click', toggleCinema);
    if (cinemaOverlay) cinemaOverlay.addEventListener('click', () => {
      if (cinemaActive) toggleCinema();
    });

    // Turn off cinema mode when player closes
    const playerClose = $('#player-close');
    const playerBack = $('#player-back-btn');
    function offCinema() {
      if (cinemaActive) {
        cinemaActive = false;
        document.body.classList.remove('cinema-mode');
        if (cinemaOverlay) cinemaOverlay.classList.remove('active');
        if (cinemaBtn) cinemaBtn.classList.remove('active');
      }
    }
    if (playerClose) playerClose.addEventListener('click', offCinema);
    if (playerBack) playerBack.addEventListener('click', offCinema);
  })();

  // ═══════ MOBILE HAMBURGER MENU ═══════
  (function initMobileMenu() {
    const menuBtn = $('#mobile-menu-btn');
    const overlay = $('#mobile-nav-overlay');
    if (!menuBtn || !overlay) return;

    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      overlay.classList.toggle('open');
    });

    // Handle mobile nav clicks
    overlay.querySelectorAll('[data-mobile-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const nav = link.dataset.mobileNav;
        
        // Remove active from all
        overlay.querySelectorAll('a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');

        // Close menu
        menuBtn.classList.remove('open');
        overlay.classList.remove('open');

        // Trigger the corresponding nav action
        const navMap = {
          home: '#nav-home-li a',
          tv: '#nav-tv-li a',
          movies: '#nav-movies-li a',
          mylist: '#nav-mylist-li a',
          reels: '#nav-reels-btn',
          music: '#nav-music-btn',
          sports: '#nav-sports-btn'
        };

        const target = $(navMap[nav]);
        if (target) target.click();
      });
    });
  })();

  // ═══════ SKELETON LOADING PLACEHOLDERS ═══════
  (function initSkeletonLoading() {
    const rowsContainer = $('#rows-container');
    if (!rowsContainer) return;

    function showSkeletons() {
      // Only show if rows container is empty
      if (rowsContainer.children.length > 0) return;
      
      let skeletonHTML = '';
      for (let i = 0; i < 3; i++) {
        skeletonHTML += '<div class="skeleton-row__title"></div><div class="skeleton-row">';
        for (let j = 0; j < 7; j++) {
          skeletonHTML += '<div class="skeleton-card"></div>';
        }
        skeletonHTML += '</div>';
      }
      rowsContainer.innerHTML = skeletonHTML;
    }

    // Show skeletons initially
    showSkeletons();

    // Remove skeletons when real content loads
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.classList && node.classList.contains('row')) {
            // Real content arrived, remove skeletons
            rowsContainer.querySelectorAll('.skeleton-card, .skeleton-row, .skeleton-row__title').forEach(el => el.remove());
            obs.disconnect();
            return;
          }
        }
      }
    });
    obs.observe(rowsContainer, { childList: true });
  })();

  // ═══════ NOW PLAYING EQUALIZER IN MUSIC TRACK LIST ═══════
  // Adds equalizer animation to active track via MutationObserver
  (function initNowPlayingEqualizer() {
    const playlistList = document.getElementById('music-playlist-list');
    if (!playlistList) return;
    
    const eqObserver = new MutationObserver(() => {
      const activeTrack = playlistList.querySelector('.music-track.active .music-track__num');
      if (activeTrack && musicIsPlaying && !activeTrack.querySelector('.now-playing-eq')) {
        activeTrack.innerHTML = `<span class="now-playing-eq">
          <span class="now-playing-eq__bar"></span>
          <span class="now-playing-eq__bar"></span>
          <span class="now-playing-eq__bar"></span>
          <span class="now-playing-eq__bar"></span>
          <span class="now-playing-eq__bar"></span>
        </span>`;
      }
    });
    eqObserver.observe(playlistList, { childList: true, subtree: true });
  })();

})();
