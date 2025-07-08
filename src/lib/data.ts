import type { Topic, StudyPlan, SkillLevel } from './types';

export const ALL_TOPICS: Topic[] = [
  // Data Structures
  {
    id: 'ds-arrays',
    title: 'Arrays',
    category: 'Data Structures',
    content: 'An array is a collection of items stored at contiguous memory locations. It is the simplest data structure where each element can be accessed randomly by using its index number. Key characteristics include fixed size (in some languages) and O(1) time complexity for access. However, insertion and deletion are O(n) as elements may need to be shifted.',
    codeSnippet: {
      language: 'javascript',
      code: `// Arrays in JavaScript are dynamic
const numbers = [10, 20, 30, 40, 50];

// Access (O(1))
console.log(numbers[2]); // Outputs 30

// Insertion (O(n) - can be O(1) at the end)
numbers.push(60); // [10, 20, 30, 40, 50, 60]
numbers.splice(2, 0, 25); // [10, 20, 25, 30, 40, 50, 60]

// Deletion (O(n))
numbers.pop(); // [10, 20, 25, 30, 40, 50]
numbers.splice(1, 1); // [10, 25, 30, 40, 50]`,
    },
  },
  {
    id: 'ds-linked-list',
    title: 'Linked Lists',
    category: 'Data Structures',
    content: 'A linked list is a linear data structure where elements are not stored contiguously. Each element (node) contains data and a pointer to the next node. Types include Singly, Doubly, and Circular Linked Lists. They offer O(1) insertion/deletion at the ends but O(n) access and search time.',
    codeSnippet: {
      language: 'javascript',
      code: `class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  // ... methods to add, remove, find nodes
}`
    }
  },
  {
    id: 'ds-trees',
    title: 'Trees',
    category: 'Data Structures',
    content: 'A tree is a hierarchical data structure of nodes connected by edges. A Binary Search Tree (BST) is a common type where the left child is less than the parent, and the right child is greater. This property allows for O(log n) average time for search, insert, and delete. Traversal methods include In-order, Pre-order, and Post-order.',
    codeSnippet: {
      language: 'python',
      code: `class TreeNode:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

# In-order traversal of a BST visits nodes in ascending order.
def inorder_traversal(root):
    if root:
        inorder_traversal(root.left)
        print(root.val)
        inorder_traversal(root.right)`,
    }
  },
  {
    id: 'ds-graphs',
    title: 'Graphs',
    category: 'Data Structures',
    content: 'A graph is a set of vertices (nodes) and edges that connect them. They can be directed or undirected. Common representations are Adjacency Matrix (good for dense graphs) and Adjacency List (good for sparse graphs). Graphs are fundamental in modeling networks, from social networks to GPS navigation.',
  },
  // Algorithms
  {
    id: 'algo-bfs',
    title: 'Breadth-First Search (BFS)',
    category: 'Algorithms',
    content: 'BFS is a graph traversal algorithm that explores neighbor nodes first before moving to the next level. It uses a queue data structure. It is optimal for finding the shortest path in an unweighted graph. Time and space complexity are O(V+E), where V is vertices and E is edges.',
  },
  {
    id: 'algo-dfs',
    title: 'Depth-First Search (DFS)',
    category: 'Algorithms',
    content: 'DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (or recursion). It is used in topological sorting, cycle detection, and solving puzzles like mazes. Time and space complexity are O(V+E).',
  },
  {
    id: 'algo-sorting',
    title: 'Sorting Algorithms',
    category: 'Algorithms',
    content: 'Sorting algorithms arrange elements in a specific order. Key examples: \n- **Merge Sort**: A divide-and-conquer algorithm. Stable, with a guaranteed O(n log n) time complexity, but requires O(n) extra space. \n- **Quick Sort**: Also divide-and-conquer. O(n log n) average time, but O(n^2) in the worst case. In-place, using O(log n) space for recursion.',
  },
  {
    id: 'algo-dynamic-programming',
    title: 'Dynamic Programming',
    category: 'Algorithms',
    content: 'DP is a method for solving complex problems by breaking them down into simpler subproblems. It is applicable when subproblems overlap. Two main approaches: \n- **Memoization (Top-Down)**: Solve recursively, but store results of subproblems to avoid re-computation. \n- **Tabulation (Bottom-Up)**: Solve iteratively from the smallest subproblem up to the main problem.',
  },
  // Web Dev
  {
    id: 'web-rest-api',
    title: 'REST APIs',
    category: 'Web Dev',
    content: 'REST (Representational State Transfer) is an architectural style for web services. It uses standard HTTP methods: \n- **GET**: Retrieve data (idempotent). \n- **POST**: Create new data. \n- **PUT**: Update/replace data (idempotent). \n- **DELETE**: Remove data (idempotent). \nCommon status codes include 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), and 500 (Internal Server Error).',
  },
  // System Design
  {
    id: 'sd-caching',
    title: 'Caching',
    category: 'System Design',
    content: 'Caching stores copies of data to serve future requests faster. It is critical for system performance. Key concepts include: \n- **Cache Eviction Policies**: How to decide which items to remove when the cache is full (e.g., LRU - Least Recently Used, LFU - Least Frequently Used, FIFO - First-In-First-Out). \n- **Cache Placement**: Caches can exist at multiple levels: client browser, CDN, load balancer, or database.',
  },
];

export const STUDY_PLANS: Record<SkillLevel, StudyPlan> = {
  Beginner: ALL_TOPICS.filter(t => ['Arrays', 'Linked Lists', 'REST APIs'].includes(t.title)),
  Intermediate: ALL_TOPICS.filter(t => ['Trees', 'Graphs', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Sorting Algorithms'].includes(t.title)),
  Advanced: ALL_TOPICS.filter(t => ['Dynamic Programming', 'Caching'].includes(t.title)),
};
