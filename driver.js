import Tree from './Tree.js';
import randomIntArray from './randomIntArray.js';

import prettyPrint from './prettyPrint.js';
import printElementOrders from './printElementOrders.js';

const arr = randomIntArray(0, 100, 7);
const tree = new Tree(arr);

console.log(`balanced: ${tree.isBalanced()}`);
prettyPrint(tree.root);
printElementOrders(tree);

// Unbalance tree
tree.insert(101);
tree.insert(102);
tree.insert(103);

console.log(`balanced: ${tree.isBalanced()}`);
prettyPrint(tree.root);
console.log();

console.log('rebalancing tree...');
tree.rebalance();
console.log(`balanced: ${tree.isBalanced()}`);
prettyPrint(tree.root);

printElementOrders(tree);
