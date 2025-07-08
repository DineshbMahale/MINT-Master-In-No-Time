import type { Topic, StudyPlan, SkillLevel } from './types';

export const ALL_TOPICS: Topic[] = [
  // Data Structures
  {
    id: 'ds-arrays',
    title: 'Arrays',
    category: 'Data Structures',
    content: 'An array is a collection of items stored at contiguous memory locations. It is the simplest data structure where each element can be accessed randomly by using its index number.',
    codeSnippet: {
      language: 'javascript',
      code: `const cars = ["Saab", "Volvo", "BMW"];\nconsole.log(cars[0]); // Outputs "Saab"`,
    },
  },
  {
    id: 'ds-linked-list',
    title: 'Linked Lists',
    category: 'Data Structures',
    content: 'A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers.',
  },
  {
    id: 'ds-trees',
    title: 'Trees',
    category: 'Data Structures',
    content: 'A tree is a hierarchical data structure that consists of nodes connected by edges. A binary tree is a tree data structure in which each node has at most two children.',
    codeSnippet: {
      language: 'python',
      code: `class Node:\n    def __init__(self, key):\n        self.left = None\n        self.right = None\n        self.val = key`,
    }
  },
  {
    id: 'ds-graphs',
    title: 'Graphs',
    category: 'Data Structures',
    content: 'A graph is a non-linear data structure consisting of nodes and edges. The nodes are sometimes also referred to as vertices and the edges are lines or arcs that connect any two nodes in the graph.',
  },
  // Algorithms
  {
    id: 'algo-bfs',
    title: 'Breadth-First Search (BFS)',
    category: 'Algorithms',
    content: 'BFS is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.',
  },
  {
    id: 'algo-dfs',
    title: 'Depth-First Search (DFS)',
    category: 'Algorithms',
    content: 'DFS is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node and explores as far as possible along each branch before backtracking.',
  },
  {
    id: 'algo-sorting',
    title: 'Sorting Algorithms',
    category: 'Algorithms',
    content: 'A sorting algorithm is an algorithm that puts elements of a list in a certain order. The most-used orders are numerical order and lexicographical order. E.g., Bubble Sort, Merge Sort, Quick Sort.',
  },
  {
    id: 'algo-dynamic-programming',
    title: 'Dynamic Programming',
    category: 'Algorithms',
    content: 'Dynamic Programming is mainly an optimization over plain recursion. Wherever we see a recursive solution that has repeated calls for same inputs, we can optimize it using Dynamic Programming.',
  },
  // Web Dev
  {
    id: 'web-rest-api',
    title: 'REST APIs',
    category: 'Web Dev',
    content: 'REST is an architectural style for providing standards between computer systems on the web, making it easier for systems to communicate with each other. RESTful systems often use HTTP methods like GET, POST, PUT, DELETE.',
  },
  // System Design
  {
    id: 'sd-caching',
    title: 'Caching',
    category: 'System Design',
    content: 'Caching is a technique that stores a copy of a given resource and serves it back when requested. A cache can significantly improve performance and reduce latency.',
  },
];

export const STUDY_PLANS: Record<SkillLevel, StudyPlan> = {
  Beginner: ALL_TOPICS.filter(t => ['Arrays', 'Linked Lists', 'REST APIs'].includes(t.title)),
  Intermediate: ALL_TOPICS.filter(t => ['Trees', 'Graphs', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Sorting Algorithms'].includes(t.title)),
  Advanced: ALL_TOPICS.filter(t => ['Dynamic Programming', 'Caching'].includes(t.title)),
};
