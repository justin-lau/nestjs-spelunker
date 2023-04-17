import { DebuggedTree, SpelunkedTree } from '../../src';

export const exploreOutput: SpelunkedTree[] = [
  {
    id: '001',
    name: 'AppModule',
    isGlobal: false,
    imports: ['AnimalsModule', 'OgmaCoreModule'],
    providers: {},
    controllers: [],
    exports: [],
  },
  {
    id: '002',
    name: 'AnimalsModule',
    isGlobal: false,
    imports: ['CatsModule', 'DogsModule', 'HamstersModule', 'OgmaCoreModule'],
    providers: {
      AnimalsService: {
        method: 'value',
      },
    },
    controllers: ['AnimalsController'],
    exports: ['DogsModule'],
  },
  {
    id: '003',
    name: 'CatsModule',
    isGlobal: false,
    imports: ['OgmaCoreModule'],
    providers: {
      CatsService: {
        method: 'standard',
      },
    },
    controllers: ['CatsController'],
    exports: [],
  },
  {
    id: '004',
    name: 'DogsModule',
    isGlobal: false,
    imports: ['OgmaCoreModule'],
    providers: {
      someString: {
        method: 'value',
      },
      DogsService: {
        method: 'factory',
        injections: ['someString'],
      },
    },
    controllers: ['DogsController'],
    exports: ['DogsService'],
  },
  {
    id: '005',
    name: 'HamstersModule',
    isGlobal: false,
    imports: ['OgmaCoreModule'],
    providers: {
      HamstersService: {
        method: 'standard',
      },
    },
    controllers: ['HamstersController'],
    exports: [],
  },
];

export const debugOutput: DebuggedTree[] = [
  {
    name: 'AppModule',
    imports: ['AnimalsModule', 'OgmaCoreModule'],
    providers: [],
    controllers: [],
    exports: [],
  },
  {
    name: 'AnimalsModule',
    imports: ['CatsModule', 'DogsModule', 'HamstersModule'],
    providers: [
      {
        name: 'AnimalsService',
        dependencies: [],
        type: 'value',
      },
    ],
    controllers: [
      {
        name: 'AnimalsController',
        dependencies: ['AnimalsService'],
      },
    ],
    exports: [
      {
        name: 'DogsModule',
        type: 'module',
      },
    ],
  },
  {
    name: 'CatsModule',
    imports: [],
    providers: [
      {
        name: 'CatsService',
        dependencies: [],
        type: 'class',
      },
    ],
    controllers: [
      {
        name: 'CatsController',
        dependencies: ['CatsService'],
      },
    ],
    exports: [],
  },
  {
    name: 'DogsModule',
    imports: [],
    providers: [
      {
        name: 'someString',
        dependencies: [],
        type: 'value',
      },
      {
        name: 'DogsService',
        dependencies: ['someString'],
        type: 'factory',
      },
    ],
    controllers: [
      {
        name: 'DogsController',
        dependencies: ['DogsService'],
      },
    ],
    exports: [
      {
        name: 'DogsService',
        type: 'provider',
      },
    ],
  },
  {
    name: 'HamstersModule',
    imports: [],
    providers: [
      {
        name: 'HamstersService',
        dependencies: [],
        type: 'class',
      },
    ],
    controllers: [
      {
        name: 'HamstersController',
        dependencies: ['HamstersService'],
      },
    ],
    exports: [],
  },
  {
    name: 'OgmaCoreModule',
    imports: [],
    providers: [
      {
        name: 'OGMA_OPTIONS',
        dependencies: [],
        type: 'value',
      },
      {
        name: 'OGMA_INTERCEPTOR_OPTIONS',
        dependencies: ['OGMA_OPTIONS'],
        type: 'factory',
      },
      {
        name: 'OGMA_SERVICE_OPTIONS',
        dependencies: ['OGMA_OPTIONS'],
        type: 'factory',
      },
      {
        name: 'OGMA_TRACE_METHOD_OPTION',
        dependencies: ['OGMA_SERVICE_OPTIONS'],
        type: 'factory',
      },
      {
        name: 'OGMA_INSTANCE',
        dependencies: ['OGMA_SERVICE_OPTIONS'],
        type: 'factory',
      },
      {
        name: 'HttpInterceptorService',
        dependencies: ['OGMA_INTERCEPTOR_OPTIONS', 'Reflector'],
        type: 'factory',
      },
      {
        name: 'WebsocketInterceptorService',
        dependencies: ['OGMA_INTERCEPTOR_OPTIONS', 'Reflector'],
        type: 'factory',
      },
      {
        name: 'GqlInterceptorService',
        dependencies: ['OGMA_INTERCEPTOR_OPTIONS', 'Reflector'],
        type: 'factory',
      },
      {
        name: 'RpcInterceptorService',
        dependencies: ['OGMA_INTERCEPTOR_OPTIONS', 'Reflector'],
        type: 'factory',
      },
      {
        name: 'OgmaService',
        dependencies: [
          'OGMA_INSTANCE',
          'OGMA_CONTEXT',
          'Object',
          'OGMA_TRACE_METHOD_OPTION',
        ],
        type: 'class',
      },
      {
        name: 'DelegatorService',
        dependencies: [
          'HttpInterceptorService',
          'WebsocketInterceptorService',
          'RpcInterceptorService',
          'GqlInterceptorService',
        ],
        type: 'class',
      },
    ],
    controllers: [],
    exports: [
      {
        name: 'OGMA_INSTANCE',
        type: 'provider',
      },
      {
        name: 'OGMA_INTERCEPTOR_OPTIONS',
        type: 'provider',
      },
      {
        name: 'OgmaService',
        type: 'provider',
      },
      {
        name: 'DelegatorService',
        type: 'provider',
      },
      {
        name: 'HttpInterceptorService',
        type: 'provider',
      },
      {
        name: 'GqlInterceptorService',
        type: 'provider',
      },
      {
        name: 'RpcInterceptorService',
        type: 'provider',
      },
      {
        name: 'WebsocketInterceptorService',
        type: 'provider',
      },
    ],
  },
];

export const graphEdgesOutput = [
  'AppModule-->AnimalsModule',
  'AnimalsModule-->CatsModule',
  'CatsModule-->OgmaCoreModule',
  'AnimalsModule-->DogsModule',
  'DogsModule-->OgmaCoreModule',
  'AnimalsModule-->HamstersModule',
  'HamstersModule-->OgmaCoreModule',
  'AnimalsModule-->OgmaCoreModule',
  'AppModule-->OgmaCoreModule',
];

export const cyclicGraphEdgesOutput = [
  'AppModule-->AnimalsModule',
  'AnimalsModule-->CatsModule',
  'CatsModule-->OgmaCoreModule',
  'OgmaCoreModule-->AppModule',
  'AnimalsModule-->DogsModule',
  'DogsModule-->OgmaCoreModule',
  'AnimalsModule-->HamstersModule',
  'HamstersModule-->OgmaCoreModule',
  'AnimalsModule-->OgmaCoreModule',
  'AppModule-->OgmaCoreModule',
];
