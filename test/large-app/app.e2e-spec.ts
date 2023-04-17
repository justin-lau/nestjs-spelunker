import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { dequal } from 'dequal';
import { suite } from 'uvu';
import { equal, is } from 'uvu/assert';

import { SpelunkerModule } from '../../src/';
import { ExplorationModule } from '../../src/exploration.module';
import {
  cyclicGraphEdgesOutput,
  debugOutput,
  exploreOutput,
  graphEdgesOutput,
  outputNameToIdMap,
} from '../fixtures/output';
import { AppModule } from './app.module';

export const SpelunkerSuite = suite<{
  app: INestApplication;
}>('SpelunkerSuite');

SpelunkerSuite.before(async (context) => {
  // mock getId()
  ExplorationModule.getId = (module: any) =>
    outputNameToIdMap.get(module.metatype.name) as string;

  context.app = await NestFactory.create(AppModule, { logger: false });
});
SpelunkerSuite.after(async ({ app }) => app.close());

SpelunkerSuite('Should allow the spelunkerModule to explore', ({ app }) => {
  const output = SpelunkerModule.explore(app);

  exploreOutput.forEach((expected) => {
    is(
      output
        .filter((o) => o.name === expected.name)
        .some((output) => dequal(output, expected)),
      true,
    );
  });
});

SpelunkerSuite('Should allow the SpelunkerModule to debug', async () => {
  const output = await SpelunkerModule.debug(AppModule);
  equal(output, debugOutput);
});

SpelunkerSuite('Should allow the SpelunkerModule to graph', ({ app }) => {
  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  equal(
    edges.map((e) => `${e.from.module.name}-->${e.to.module.name}`),
    graphEdgesOutput,
  );
});

SpelunkerSuite(
  'Should handle a module circular dependency when finding graph edges',
  ({ app }) => {
    const tree = SpelunkerModule.explore(app);
    tree
      .slice(-1)[0]
      .imports.push(outputNameToIdMap.get('AppModule') as string);
    const root = SpelunkerModule.graph(tree);
    const edges = SpelunkerModule.findGraphEdges(root);
    equal(
      edges.map((e) => `${e.from.module.name}-->${e.to.module.name}`),
      cyclicGraphEdgesOutput,
    );
  },
);
