import colors from "vuetify/es5/util/colors";
import imageminMozjpeg from "imagemin-mozjpeg";
import ImageminPlugin from "imagemin-webpack-plugin";
const isDev = process.env.NODE_ENV !== "production";

export default {
  ...(!isDev && {
    modern: "client",
  }),

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Motorama",
    title: "Motorama",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  rootDir: __dirname,

  serverMiddleware: [],

  router: {
    prefetchLinks: false,
    trailingSlash: false,
  },

  loading: { color: "#ddd" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/global-styles.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/lodash.js",
    "~/plugins/vuelidate",
    "~/plugins/truncate_text",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    // https://www.npmjs.com/package/@nuxtjs/svg
    "@nuxtjs/svg",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // "nuxt-webfontloader",
    [
      "nuxt-vuex-localstorage",
      {
        ...(isDev && {
          mode: "debug",
        }),
        localStorage: ["cart"],
      },
    ],
  ],

  // npm i nuxt-webfontloader
  // https://www.npmjs.com/package/nuxt-webfontloader
  /*
  webfontloader: {
    events: false,
    google: {
      families: ["Roboto:100,300,400,500,700,900&display=swap"],
    },
    timeout: 5000,
  },
  */

  // Axios module configuration
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: isDev ? "/" : "https://motorama.herokuapp.com/",
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // Render configuration
  render: {
    /*
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles.map(
          (f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`
        ),
    },
    compressor: false,
    etag: false,
    static: {
      etag: false,
    },
    */
    resourceHints: false,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Так как используем cssNano, отключаем дефолтный механизм оптимизации стилей.
    optimizeCss: false,

    // Здесь мы задаем то, что во время development хотим видеть красивые имена файлов,
    // а в production build раскидываем файлы по папкам и в качестве имени используем contenthash.
    filenames: {
      app: ({ isDev }) => (isDev ? "[name].js" : "js/[contenthash].js"),
      chunk: ({ isDev }) => (isDev ? "[name].js" : "js/[contenthash].js"),
      css: ({ isDev }) => (isDev ? "[name].css" : "css/[contenthash].css"),
      img: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "img/[contenthash:7].[ext]",
      font: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "fonts/[contenthash:7].[ext]",
      video: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "videos/[contenthash:7].[ext]",
    },

    // Отключаем для Development всю минификацию html, чтобы ускорить процесс разработки.
    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      },
    }),

    // Разбиваем на независимые чанки всё приложение.
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },

    // Отключаем минификацию js для development.
    optimization: {
      minimize: !isDev,
    },

    // Для development мы включаем inline styles,
    // а в production разбиваем их на чанки для каждого компонента и создаем отдельные файлы.
    ...(!isDev && {
      extractCSS: {
        // Чтобы во время сборки,
        // webpack не выдавал ложные предупреждения о найденных конфликтах и дубликатах,
        // это своеобразное решение бага #4885.
        ignoreOrder: true,
      },
    }),

    // По умолчанию Babel старается трансплитирировать весь код проекта,
    // но иногда он не делает это с некоторыми зависимостями и их нужно задать явно.
    transpile: ["nuxt-vuex-localstorage"],

    // Nuxt из коробки имеет встроенный Postcss для которого здесь мы задаём конфиг.
    // Здесь мы можем подключать полезные плагины для Postcss,
    // задавать их порядок исполнения. В данном случае мы отключаем для development все плагины,
    // а в production весь css будет минифицирован и к нему будут присвоены vendor префиксы для 99.5% браузеров.
    // Так же мы можем прописать плагины, которые будут использоваться сразу в двух средах.
    postcss: {
      plugins: {
        ...(!isDev && {
          cssnano: {
            preset: [
              "advanced",
              {
                autoprefixer: false,
                cssDeclarationSorter: false,
                zindex: false,
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }),
      },
      ...(!isDev && {
        preset: {
          browsers: "cover 99.5%",
          autoprefixer: true,
        },
      }),

      order: "cssnanoLast",
    },

    // Здесь мы можем изменять webpack конфиг, напрямую перехватывать нужные loaders или test.
    // По умолчанию Webpack '/\\.(png|jpe?g|gif|svg|webp)$/i' ищет все картинки и svg файлы и
    // обрабатывает их через встроенный url-loader file-loader для того чтобы мы могли в
    // компонентах импортировать эти файлы. Но он никаких их не сжимает и
    // его возможности по работе с svg сильно ограничены. Поэтому мы изменим это поведение.
    extend(config, ctx) {
      // Создадим константы в которых будем хранить новые загрузчики и плагины Webpack.
      const imageMinPlugin = new ImageminPlugin({
        pngquant: {
          quality: "5-30",
          speed: 7,
          strip: true,
        },
        jpegtran: {
          progressive: true,
        },
        gifsicle: {
          interlaced: true,
        },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true,
          }),
        ],
      });
      // Добавляем плагин для сжатия только в production.
      if (!ctx.isDev) config.plugins.push(imageMinPlugin);
    },
  },
};
