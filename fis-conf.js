/**
 * Created by adoug on 2017/11/20.
 */

/* 配置环境变量 */
fis
.set('project.name', 'Max')
.set('project.files', ['/modules/**', '/components/**', '/views/**', '/images/**', '/meta/**', '/mock/**', 'map.json'])
.set('project.ignore', ['/dist/**'])
.set('project.fileType.text', 'map, vue')

/* 配置产出路径 */
const config = {
  publicPrefix: '/public',
  viewPrefix: '/views',
  localDeployMock: 'D:/JavaScript/Max/dist',
  remoteReceiver: 'http://45.78.23.100:8999/receiver',
  remoteDeploy: '/var/www/adoug.info'
}

// 支持commonJs
fis.hook('commonjs', {
  extList: [
    '.js', '.vue'
  ],
  paths: {
    // vue: '/node_modules/vue/dist/vue.common.js'
  },
  umd2commonjs: true
})

// 禁用components，启用node_modules
fis.unhook('components')
fis.hook('node_modules')

fis.match('/node_modules/**', {
  isMod: true,
  release: '$0'
})

/* 配置map.json */
fis.match('/map.json', {
  release: '/map.json'
})

/* 配置meta文件 */
fis.match('/meta/(**)', {
  release: '$1'
})

/* 配置mock */
fis.match('/mock/**', {
  release: '$0'
})

/* 配置html：/views/ */
fis.match('/views/(**).html', {
  release: '/$1.html',
  useMap: true
})

/* 配置js */
fis.match('({/modules,/components}/**).{js,vue}', {
  isMod: true,
  rExt: 'js',
  release: '/$1$2.js'
})
.match('/components/**.vue', {
  parser: [
    fis.plugin('vue-component', {
      runtimeOnly: true,
      extractCSS: false
    })
  ]
})
.match('{/modules,/components}/**.{js,vue:js}', {
  parser: [fis.plugin('babel-6.x')]
})
.match('/views/(*.js)', {
  isMod: false,
  parser: [fis.plugin('babel-6.x')],
  release: '/viewJs/$1'
})
.match('/views/(libs/**.js)', {
  isMod: false,
  parser: false,
  release: '/viewJs/$1'
})

/* 配置scss */

//.html:css针对首屏的critical css
fis.match('{/modules/style/**.scss,/components/**.vue:scss,/views/*.html:css}', {
  rExt: 'css',
  parser: [
    fis.plugin('node-sass')
  ],
  postprocessor: fis.plugin('autoprefixer')
})
.match('/modules/style/**', {
  release: '$0'
})

/* 配置图片 */
fis.match('/images/**.{jpg,png,svg,webp}', {
  release: '$0'
})

/* 打包 */
fis.match('::package', {
  postpackager: fis.plugin('loader', {
    resourceType: 'mod',
    useInlineMap: true
  })
})

/*fis.match('::package', {
  useSourceMap : true,

  packager: fis.plugin('deps-pack', {
    
  })
})*/

/**
 * rd-mock环境：api由mock提供，http://fis.baidu.com/fis3/docs/node-mock.html
 * rd环境：api非mock，直接部署到本地后端项目
 * prod环境：在rd的基础上压缩
 * prod-ol环境：在prod的基础上部署上线
 **/

const mediaLocal = ['rd-mock', 'prod']

mediaLocal.forEach(media => {
  fis.media(media)
  .match('**', {
    deploy: [
      fis.plugin('local-deliver', {
        to: config.localDeployMock
      })
    ]
  })
})

const mediaProd = ['prod', 'prod-ol']

mediaProd.forEach(media => {
  fis.media(media)
.match('{{/components,/images,/modules,/pkgs}/**,/views/**.js}', {
  useHash: true
})
.match('/images/**.webp', {
  useHash: false
})
.match('**.{js,vue:js}', {
  optimizer: fis.plugin('uglify-js', {
    sourceMap: {
      url: 'inline'
    }
  })
})
.match('**.{scss,css,vue:scss}', {
  optimizer: fis.plugin('clean-css', {
    'keepBreaks': true
  })
})
.match('/views/**.html', {
  optimizer : fis.plugin('minifier', {
    removeComments: false
  })
})
})

fis.media('prod-ol')
.match('/views/(**).html', {
  release: '/$1.html'
})
.match('/mock/**', {
  release: false
})
.match('**', {
  deploy: [
    fis.plugin('http-push', {
      receiver: config.remoteReceiver,
      to: config.remoteDeploy + config.publicPrefix
    })
  ]
})
.match('/views/**.html', {
  deploy: [
    fis.plugin('http-push', {
      receiver: config.remoteReceiver,
      to: config.remoteDeploy + config.viewPrefix
    })
  ]
})
