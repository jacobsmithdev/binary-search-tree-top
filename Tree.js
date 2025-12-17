import Node from './Node.js';

export default class Tree {
    constructor(arr) {
        if (!arr) this.root = null;
        this.root = this.buildTree(arr);
    }

    buildTree(array) {
        // Remove all duplicates in an array (taken from stack overflow)
        // https://stackoverflow.com/a/9229821
        array = [...new Set(array)];

        array.sort((a, b) => a - b);

        return this.#buildTreeRecursive(array, 0, array.length - 1);
    }

    // Expects a sorted array as input
    #buildTreeRecursive(array, start, end) {
        if (start > end) return null;

        const middle = Math.floor((start + end) / 2);
        const root = new Node(array[middle]);

        root.left = this.#buildTreeRecursive(array, start, middle - 1);
        root.right = this.#buildTreeRecursive(array, middle + 1, end);

        return root;
    }

    insert(value) {
        return this.#insertRecursive(this.root, value);
    }

    #insertRecursive(root, value) {
        // If value already in tree, return
        if (root.data === value) return;

        // Determine which of the node's subtrees we want to work with
        const valueDirection = value < root.data ? 'left' : 'right';

        if (root[valueDirection]) {
            // If subtree exists, recurse into it
            this.#insertRecursive(value, root[valueDirection]);
        } else {
            // If no subtree exists, add new node to that point
            root[valueDirection] = new Node(value);
        }
    }

    deleteItem(value) {
        this.root = this.#deleteItemRecursive(this.root, value);
    }

    // Taken and modified from:
    // https://www.geeksforgeeks.org/dsa/deletion-in-binary-search-tree/
    #deleteItemRecursive(root, value) {
        if (root === null) return root;

        if (value < root.data) {
            // If value is smaller then current node, recurse into left subtree
            root.left = this.#deleteItemRecursive(root.left, value);
        } else if (value > root.data) {
            // If value is larger then current node, recurse into right subtree
            root.right = this.#deleteItemRecursive(root.right, value);
        } else {
            // Node with 0 or 1 child:
            if (root.left === null) return root.right;
            if (root.right === null) return root.left;
            // NOTE: The above works for nodes with no children because returning
            // either left/right of a node with 0 children just means returning null

            // Node with 2 children:
            const nextLargestNode = this.#getNextLargestNode(root); // AKA 'inorder successor'
            root.data = nextLargestNode.data;

            // Delete old node containing nextLargestNode's data
            root.right = this.#deleteItemRecursive(
                root.right,
                nextLargestNode.data
            );
        }
        return root;
    }

    #getNextLargestNode(node) {
        if (!node.right) return null;

        // Find the 'leftmost' or smallest value in node's right subtree
        let nextLargestNode = node.right;
        while (nextLargestNode.left) {
            nextLargestNode = nextLargestNode.left;
        }

        return nextLargestNode;
    }

    find(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) return current;
            // Move to left/right subtree based on whether value is lesser/greater than current.data
            current = value < current.data ? current.left : current.right;
        }

        // If value cannot be found, return null
        return null;
    }

    levelOrderForEach(callback) {
        const queue = [];

        // Check if tree is empty
        if (this.root === null) return;

        queue.push(this.root);

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrderForEach(callback, node = this.root) {
        if (node.left) this.inOrderForEach(callback, node.left);
        callback(node);
        if (node.right) this.inOrderForEach(callback, node.right);
    }
}
