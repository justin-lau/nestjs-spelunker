import {
  SpelunkedEdge,
  SpelunkedNode,
  SpelunkedTree,
} from './spelunker.interface';

export class GraphingModule {
  static graph(tree: SpelunkedTree[]): SpelunkedNode {
    const nodeMap = tree.reduce(
      (map, module) =>
        map.set(module.name, {
          dependencies: new Set(),
          dependents: new Set(),
          module,
        }),
      new Map<string, SpelunkedNode>(),
    );

    nodeMap.forEach((node) => this.findDependencies(node, nodeMap));

    return this.findRoot(nodeMap);
  }

  static getEdges(root: SpelunkedNode): SpelunkedEdge[] {
    return [...this.getEdgesRecursively(root).values()];
  }

  private static findDependencies(
    node: SpelunkedNode,
    nodeMap: Map<string, SpelunkedNode>,
  ): SpelunkedNode[] {
    return node.module.imports.map((m) => {
      const dependency = nodeMap.get(m);
      if (!dependency) throw new Error(`Unable to find ${m}!`);

      node.dependencies.add(dependency);
      dependency.dependents.add(node);

      return dependency;
    });
  }

  /**
   * Find the root node, which is assumed to be the first node on which no other
   * nodes depend. If no such node exists, arbitrarily chose the first one as the
   * root.
   */
  private static findRoot(nodeMap: Map<string, SpelunkedNode>): SpelunkedNode {
    const nodes = [...nodeMap.values()];
    const root = nodes.find((n) => n.dependents.size === 0) ?? nodes[0];

    if (!root) throw new Error('Unable to find root node');

    return root;
  }

  private static getEdgesRecursively(
    root: SpelunkedNode,
    visitedNodes: Set<SpelunkedNode> = new Set(),
  ): Set<SpelunkedEdge> {
    // short-circuit cycles
    if (visitedNodes.has(root)) return new Set();

    visitedNodes.add(root);

    return [...root.dependencies.values()].reduce((set, n) => {
      set.add({ from: root, to: n });
      this.getEdgesRecursively(n, visitedNodes).forEach((e) => set.add(e));

      return set;
    }, new Set<SpelunkedEdge>());
  }
}
